// src/components/auth/ResetRequestForm.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Loader2,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResetRequestFormProps {
  onSuccess?: () => void;
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const ResetRequestForm = ({ onSuccess }: ResetRequestFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldownCount, setCooldownCount] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const cooldownIntervalRef = useRef<number | null>(null);

  const emailNormalized = useMemo(() => email.trim().toLowerCase(), [email]);
  const emailValid = EMAIL_RE.test(emailNormalized);

  const startCooldown = () => {
    setCooldownCount(60);
    if (cooldownIntervalRef.current) window.clearInterval(cooldownIntervalRef.current);
    cooldownIntervalRef.current = window.setInterval(() => {
      setCooldownCount((count) => {
        if (count <= 1) {
          if (cooldownIntervalRef.current)
            window.clearInterval(cooldownIntervalRef.current);
          cooldownIntervalRef.current = null;
          return 0;
        }
        return count - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current)
        window.clearInterval(cooldownIntervalRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || cooldownCount > 0) return;

    if (!emailValid) {
      toast({
        title: "Email invalide",
        description: "Veuillez saisir une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        emailNormalized,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        toast({
          title: "Erreur",
          description:
            error.message || "Impossible d'envoyer l'email. Réessayez.",
          variant: "destructive",
        });
        return;
      }

      setEmailSent(true);
      startCooldown();
      toast({
        title: "Email envoyé !",
        description:
          "Lien de réinitialisation envoyé — vérifiez votre boîte (et les spams).",
      });
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Erreur réseau",
        description: "Problème de connexion. Vérifiez votre internet.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Envoi en cours…
        </>
      );
    }

    if (cooldownCount > 0) {
      return (
        <>
          <Clock className="w-4 h-4" />
          Renvoyer dans {cooldownCount}s
        </>
      );
    }

    if (emailSent) {
      return (
        <>
          <Mail className="w-4 h-4" />
          Renvoyer l'email
        </>
      );
    }

    return (
      <>
        <Mail className="w-4 h-4" />
        Envoyer le lien de réinitialisation
      </>
    );
  };

  const isButtonDisabled = loading || cooldownCount > 0 || !emailValid;

  return (
    <div className="max-w-md mx-auto">
      <Card className="card-professional">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-kalam">
            {emailSent ? "Email envoyé !" : "Mot de passe oublié ?"}
          </CardTitle>
          <CardDescription>
            {emailSent
              ? "Vérifiez votre boîte email (et les spams)"
              : "Saisissez votre email pour recevoir un lien de réinitialisation"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {emailSent && (
            <div className="mb-6 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Email envoyé à {emailNormalized}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    Cliquez sur le lien pour créer votre nouveau mot de passe.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="text-center"
                aria-label="Adresse email"
                autoComplete="email"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-primary"
              disabled={isButtonDisabled}
            >
              {getButtonContent()}
            </Button>
          </form>

          {emailSent && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-accent-foreground">
                  <strong>Rien reçu ?</strong> Vérifiez vos spams ou essayez
                  avec une autre adresse email.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetRequestForm;
