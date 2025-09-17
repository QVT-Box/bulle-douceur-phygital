// src/components/AlertDashboard.tsx
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Alert {
  id: string;
  user_id?: string;
  risk_level: "red" | "amber" | "yellow" | "green" | string;
  primary_axis: string;
  status?: string;
  user_consent: boolean;
  created_at: string;
  notes?: string;
}

interface RiskScore {
  id: string;
  user_id?: string;
  overall_score: number; // 0..100
  top_risk_axis: string;
  trend_direction?: "up" | "down" | "flat" | string;
  created_at: string;
}

const AlertDashboard = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const tr = (key: string, fr: string, en: string) => {
    const s = t(key);
    return s !== key ? s : language === "fr" ? fr : en;
  };

  const axisLabels = useMemo<Record<string, string>>(
    () =>
      language === "fr"
        ? {
            charge_rythme: "Charge de travail",
            penibilite_ergonomie: "Pénibilité & Ergonomie",
            climat_reconnaissance: "Climat & Reconnaissance",
            deconnexion_tension: "Déconnexion",
            humeur_energie: "Humeur & Énergie",
          }
        : {
            charge_rythme: "Workload",
            penibilite_ergonomie: "Strain & Ergonomics",
            climat_reconnaissance: "Climate & Recognition",
            deconnexion_tension: "Disconnect",
            humeur_energie: "Mood & Energy",
          },
    [language]
  );

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        if (!user) return;
        setLoading(true);
        setFetchErr(null);
        const [alertsRes, scoreRes] = await Promise.all([
          supabase
            .from("alerts")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(10),
          supabase
            .from("risk_scores")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

        if (!alive) return;

        if (alertsRes.error) throw alertsRes.error;
        if (scoreRes.error) throw scoreRes.error;

        setAlerts(alertsRes.data || []);
        setRiskScore(scoreRes.data ?? null);
      } catch (e: any) {
        console.error(e);
        setFetchErr(tr("alerts.fetch.err", "Erreur de chargement", "Loading error"));
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [user, language]); // re-rend les libellés si la langue change

  async function updateAlertConsent(alertId: string, consent: boolean) {
    // Optimistic UI
    const prev = alerts;
    setAlerts((list) => list.map((a) => (a.id === alertId ? { ...a, user_consent: consent } : a)));
    const { error } = await supabase.from("alerts").update({ user_consent: consent }).eq("id", alertId);

    if (error) {
      // rollback
      setAlerts(prev);
      toast.error(tr("alerts.update.err", "Erreur lors de la mise à jour", "Update error"));
      return;
    }

    toast.success(
      consent
        ? tr("alerts.update.ok.grant", "Consentement accordé", "Consent granted")
        : tr("alerts.update.ok.remove", "Consentement retiré", "Consent removed")
    );
  }

  function getScoreBucket(score: number) {
    // 0..100 — plus haut = plus de risque (d’après ton code)
    if (score <= 39)
      return {
        cls: "bg-green-600 text-white",
        label: tr("score.good", "Bien", "Good"),
      };
    if (score <= 59)
      return {
        cls: "bg-amber-500 text-black",
        label: tr("score.warn", "Attention", "Caution"),
      };
    return {
      cls: "bg-red-600 text-white",
      label: tr("score.risk", "Risque", "Risk"),
    };
  }

  function trendIcon(trend?: string) {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-red-600" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-green-600" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  }

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(language === "fr" ? "fr-FR" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  if (!user) {
    return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {tr("alerts.needlogin.title", "Connexion requise", "Sign-in required")}
          </CardTitle>
          <CardDescription>
            {tr(
              "alerts.needlogin.desc",
              "Connectez-vous pour voir vos scores et alertes.",
              "Sign in to view your scores and alerts."
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <Card key={i} className="border-gray-200">
            <CardHeader>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="mt-2 h-4 w-64 bg-gray-100 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-24 w-full bg-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {fetchErr && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 text-sm">
          {fetchErr}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Score global */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <AlertTriangle className="w-5 h-5 text-gray-900" />
              {tr("score.title", "Score de bien-être", "Well-being score")}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {tr("score.subtitle", "Votre évaluation globale actuelle", "Your current overall evaluation")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {riskScore ? (
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className={`flex items-center justify-center rounded-full w-16 h-16 text-2xl font-bold shadow ${getScoreBucket(riskScore.overall_score).cls}`}
                    aria-label={tr("score.value", "Score de bien-être", "Well-being score")}
                  >
                    {Math.round(riskScore.overall_score)}
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {getScoreBucket(riskScore.overall_score).label}
                  </p>
                  {riskScore.top_risk_axis && (
                    <p className="text-xs text-gray-600 mt-1">
                      {tr("score.axis", "Axe principal", "Main axis")}:{" "}
                      {axisLabels[riskScore.top_risk_axis] || riskScore.top_risk_axis}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  {trendIcon(riskScore.trend_direction)}
                  <p className="text-xs text-gray-600 mt-1">
                    {tr("score.trend", "Tendance", "Trend")}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                {tr("score.empty", "Aucune évaluation récente", "No recent evaluation")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Alertes actives */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {tr("alerts.title", "Alertes & Suivi", "Alerts & Follow-up")}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {tr("alerts.subtitle", "Notifications personnalisées", "Personalized notifications")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => {
                  const isHigh = alert.risk_level === "red";
                  return (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        isHigh
                          ? "border-red-200 bg-red-50"
                          : "border-amber-200 bg-amber-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={isHigh ? "destructive" : "secondary"}>
                          {isHigh
                            ? tr("alerts.badge.high", "Risque élevé", "High risk")
                            : tr("alerts.badge.warn", "Attention", "Warning")}
                        </Badge>
                        <span className="text-xs text-gray-600">
                          {fmtDate(alert.created_at)}
                        </span>
                      </div>

                      <p className="text-sm font-medium mb-2 text-gray-900">
                        {axisLabels[alert.primary_axis] || alert.primary_axis}
                      </p>

                      {!alert.user_consent ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-black text-white hover:bg-black/90"
                            onClick={() => updateAlertConsent(alert.id, true)}
                          >
                            {tr("alerts.help", "Demander de l'aide", "Request help")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 text-gray-900 hover:bg-gray-50"
                            onClick={() => updateAlertConsent(alert.id, false)}
                          >
                            {tr("alerts.noThanks", "Non merci", "No thanks")}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">
                            {tr("alerts.following", "Suivi en cours", "Follow-up in progress")}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">
                {tr("alerts.empty", "Aucune alerte active", "No active alerts")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ressources recommandées */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">
            {tr("resources.title", "Ressources recommandées", "Recommended resources")}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {tr(
              "resources.subtitle",
              "Basées sur votre profil et vos évaluations",
              "Based on your profile and evaluations"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium mb-2 text-gray-900">
                {language === "fr"
                  ? "Guide ANACT — Gestion de la charge"
                  : "ANACT Guide — Workload management"}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {language === "fr"
                  ? "Méthodes pour évaluer et réguler la charge de travail"
                  : "Methods to assess and regulate workload"}
              </p>
              <Badge variant="outline">{language === "fr" ? "Guide" : "Guide"}</Badge>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium mb-2 text-gray-900">Box QVT Focus & Reset</h4>
              <p className="text-sm text-gray-600 mb-2">
                {language === "fr"
                  ? "Produits pour récupération et gestion du stress"
                  : "Products for recovery and stress management"}
              </p>
              <Badge variant="outline">{language === "fr" ? "Produit" : "Product"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertDashboard;
