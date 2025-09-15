import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthForm from "./AuthForm";
import { useLanguage } from "@/hooks/useLanguage";

// Icônes pro (remplacent les émojis)
import { User, Users, Handshake, Settings, Package, MonitorSmartphone, Dot } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRoleQVT = "salarié" | "manager" | "rh" | "admin";
type UserJourneyQVT = "physique_only" | "saas_box";

// Variants statiques (purge-safe) quand sélectionné
const ROLE_SELECTED_CLASS: Record<UserRoleQVT, string> = {
  salarié: "border-primary bg-primary/5",
  manager: "border-secondary bg-secondary/5",
  rh: "border-accent bg-accent/5",
  admin: "border-muted bg-muted/5",
};

const JOURNEY_SELECTED_CLASS: Record<UserJourneyQVT, string> = {
  physique_only: "border-primary bg-primary/5",
  saas_box: "border-secondary bg-secondary/5",
};

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRoleQVT | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<UserJourneyQVT | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage(); // on réutilise ton hook qui expose t()

  const roles: Array<{
    id: UserRoleQVT;
    title: string;
    description: string;
    icon: JSX.Element;
  }> = [
    {
      id: "salarié",
      title: t("onboarding.role.employee.title") ?? "Salarié",
      description: t("onboarding.role.employee.desc") ?? "Je souhaite prendre soin de mon bien-être au quotidien",
      icon: <User className="w-7 h-7 text-primary" aria-hidden="true" />,
    },
    {
      id: "manager",
      title: t("onboarding.role.manager.title") ?? "Manager",
      description: t("onboarding.role.manager.desc") ?? "Je veux accompagner le bien-être de mon équipe",
      icon: <Users className="w-7 h-7 text-secondary" aria-hidden="true" />,
    },
    {
      id: "rh",
      title: t("onboarding.role.rh.title") ?? "RH",
      description: t("onboarding.role.rh.desc") ?? "Je pilote la stratégie QVT de l'entreprise",
      icon: <Handshake className="w-7 h-7 text-accent-foreground" aria-hidden="true" />,
    },
    {
      id: "admin",
      title: t("onboarding.role.admin.title") ?? "Admin",
      description: t("onboarding.role.admin.desc") ?? "Je gère la plateforme et les utilisateurs",
      icon: <Settings className="w-7 h-7 text-foreground" aria-hidden="true" />,
    },
  ];

  const journeys: Array<{
    id: UserJourneyQVT;
    title: string;
    description: string;
    icon: JSX.Element;
    benefits: string[];
  }> = [
    {
      id: "physique_only",
      title: t("onboarding.journey.box_only.title") ?? "Box Physique Only",
      description:
        t("onboarding.journey.box_only.desc") ??
        "Je préfère recevoir uniquement des box physiques avec des produits sélectionnés",
      icon: <Package className="w-7 h-7 text-primary" aria-hidden="true" />,
      benefits: [
        t("onboarding.journey.box_only.b1") ?? "Box mensuelles personnalisées",
        t("onboarding.journey.box_only.b2") ?? "Produits artisanaux français",
        t("onboarding.journey.box_only.b3") ?? "Rituels bien-être",
      ],
    },
    {
      id: "saas_box",
      title: t("onboarding.journey.saas_box.title") ?? "SaaS + Box",
      description:
        t("onboarding.journey.saas_box.desc") ??
        "Je veux l'expérience complète : suivi digital + box physiques",
      icon: <MonitorSmartphone className="w-7 h-7 text-secondary" aria-hidden="true" />,
      benefits: [
        t("onboarding.journey.saas_box.b1") ?? "Dashboard personnel",
        t("onboarding.journey.saas_box.b2") ?? "Analyse IA des humeurs",
        t("onboarding.journey.saas_box.b3") ?? "Box adaptées aux tendances",
        t("onboarding.journey.saas_box.b4") ?? "Insights équipe",
      ],
    },
  ];

  const handleRoleSelect = (role: UserRoleQVT) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleJourneySelect = (journey: UserJourneyQVT) => {
    setSelectedJourney(journey);
    setStep(3);
  };

  const handleCompleteOnboarding = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && selectedRole && selectedJourney) {
        const { error } = await supabase
          .from("profiles")
          .update({
            user_role: selectedRole as any,
            user_journey: selectedJourney as any,
            onboarding_completed: true,
          })
          .eq("id", user.id);

        if (error) throw error;

        toast({
          title: t("onboarding.toast.welcomeTitle") ?? "Bienvenue dans votre bulle !",
          description: t("onboarding.toast.welcomeDesc") ?? "Votre parcours personnalisé est maintenant configuré.",
        });

        onClose();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast({
        title: t("onboarding.toast.errorTitle") ?? "Erreur",
        description:
          t("onboarding.toast.errorDesc") ?? "Impossible de finaliser votre inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    handleCompleteOnboarding();
  };

  if (showAuth) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-inter">
              {t("onboarding.auth.title") ?? "Créer votre compte"}
            </DialogTitle>
          </DialogHeader>
          <AuthForm onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-inter text-primary">
            {t("onboarding.title") ?? "Créons votre bulle personnalisée"}
          </DialogTitle>
        </DialogHeader>

        {/* Étape 1 : Choix du rôle */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-foreground/70">
                {t("onboarding.rolePrompt") ?? "Dites-nous qui vous êtes pour personnaliser votre expérience"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role) => {
                const selected = selectedRole === role.id;
                return (
                  <Card
                    key={role.id}
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-bubble border-2 ${
                      selected ? ROLE_SELECTED_CLASS[role.id] : "border-border hover:border-primary/30"
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                    role="button"
                    aria-pressed={selected}
                    aria-label={role.title}
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleRoleSelect(role.id)}
                  >
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center">{role.icon}</div>
                      <h3 className="text-xl font-inter font-semibold">{role.title}</h3>
                      <p className="text-sm text-foreground/70">{role.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Étape 2 : Choix du parcours */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-foreground/70 mb-2">
                {t("onboarding.journeyPrompt") ?? "Parfait ! Maintenant, choisissez votre parcours bien-être"}
              </p>
              <p className="text-sm text-foreground/50">
                {t("onboarding.youAre") ?? "Vous êtes"}{" "}
                <span className="text-primary font-medium">
                  {roles.find((r) => r.id === selectedRole)?.title}
                </span>
              </p>
            </div>

            <div className="grid gap-6">
              {journeys.map((journey) => {
                const selected = selectedJourney === journey.id;
                return (
                  <Card
                    key={journey.id}
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-bubble border-2 ${
                      selected ? JOURNEY_SELECTED_CLASS[journey.id] : "border-border hover:border-secondary/30"
                    }`}
                    onClick={() => handleJourneySelect(journey.id)}
                    role="button"
                    aria-pressed={selected}
                    aria-label={journey.title}
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleJourneySelect(journey.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">{journey.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-inter font-semibold mb-2">{journey.title}</h3>
                        <p className="text-foreground/70 mb-3">{journey.description}</p>
                        <div className="space-y-1">
                          {journey.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-foreground/60">
                              <Dot className="w-5 h-5 text-secondary -ml-1" aria-hidden="true" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setStep(1)} variant="outline" className="btn-soft">
                ← {t("common.back") ?? "Retour"}
              </Button>
            </div>
          </div>
        )}

        {/* Étape 3 : Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-inter font-semibold mb-4">
                {t("onboarding.almostReady") ?? "Votre bulle est presque prête !"}
              </h3>
              <p className="text-foreground/70">
                {t("onboarding.recap") ?? "Récapitulatif de votre configuration personnalisée"}
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{t("onboarding.role") ?? "Rôle"} :</span>
                <span className="text-primary font-semibold">
                  {roles.find((r) => r.id === selectedRole)?.title}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{t("onboarding.journey") ?? "Parcours"} :</span>
                <span className="text-secondary font-semibold">
                  {journeys.find((j) => j.id === selectedJourney)?.title}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setStep(2)} variant="outline" className="btn-soft">
                ← {t("common.edit") ?? "Modifier"}
              </Button>
              <Button onClick={() => setShowAuth(true)} className="btn-bubble">
                {t("onboarding.finish") ?? "Finaliser"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
