// src/components/auth/MagicLinkForm.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MagicLinkFormProps {
  onSuccess?: () => void;
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const MagicLinkForm = ({ onSuccess }: MagicLinkFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [armingCount, setArmingCount] = useState(0);
  const [cooldownCount, setCooldownCount] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  // refs pour pouvoir nettoyer les timers à l’unmount
  const armingIntervalRef = useRef<number | null>(null);
  const cooldownIntervalRef = useRef<number | null>(null);

  const emailNormalized = useMemo(() => email.trim().toLowerCase(), [email]);
  const emailValid = EMAIL_RE.test(emailNormalized);

  const startArming = () => {
    setArmingCount(8);
    if (armingIntervalRef.current) window.clearInterval(armingIntervalRef.current);
    armingIntervalRef.current = window.setInterval(() => {
      setArmingCount((count) => {
        if (count <= 1) {
          if (armingIntervalRef.current) window.clearInterval(armingIntervalRef.current);
          armingIntervalRef.current = null;
          return 0;
        }
        return count - 1;
      });
    }, 1000);
  };

  const startCooldown = () => {
    setCooldownCount(60);
    if (cooldownIntervalRef.current) window.clearInterval(cooldownIntervalRef.current);
    cooldownIntervalRef.current = window.setInterval(() => {
      setCooldownCount((count) => {
        if (count <= 1) {
          if (cooldownIntervalRef.current) window.clearInterval(cooldownIntervalRef.current);
          cooldownIntervalRef.current = null;
          return 0;
        }
        return count - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    // cleanup à l’unmount
    return () => {
      if (armingIntervalRef.current) window.clearInterval(armingIntervalRef.current);
      if (cooldownIntervalRef.current) window.clearInterval(cooldownIntervalRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || armingCount > 0 || cooldownCount > 0) return;

    if (!emailValid) {
      toast({
        title: "Email invalide",
        description: "Veuillez saisir une adresse email professionnelle valide.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    startArming();

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: emailNormalized,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          // shouldCreateUser: true, // (par défaut true) active si tu veux forcer la création
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("too many")) {
          toast({
            title: "Limite atteinte",
            description: "Trop de demandes rapprochées. Réessayez dans une minute.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur",
            description: error.message || "Impossible d'envoyer l'email. Réessayez.",
            variant: "destructive",
          });
        }
        return;
      }

      setEmailSent(true);
      startCooldown();
      toast({
        title: "Lien envoyé !",
        description: "Ouvrez l'email depuis cet appareil pour vous connecter.",
      });
      onSuccess?.();
    } catch (err: any) {
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
    if (armingCount > 0) {
      return (
        <>
          <Clock className="w-4 h-4 animate-spin" />
          Activation… {armingCount}s
        </>
      );
    }

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
          Renvoyer le lien
        </>
      );
    }

    return (
      <>
        <Mail className="w-4 h-4" />
        Recevoir le lien magique
      </>
    );
  };

  const isButtonDisabled = armingCount > 0 || loading || cooldownCount > 0 || !emailValid;

  return (
    <div className="max-w-md mx-auto">
      <Card className="card-professional">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-kalam">
            {emailSent ? "Email envoyé !" : "Connexion par lien magique"}
          </CardTitle>
          <CardDescription>
            {emailSent ? "Vérifiez votre boîte email (et les spams)" : "Pas de mot de passe, juste votre email"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {emailSent && (
            <div className="mb-6 p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-secondary">Lien envoyé à {emailNormalized}</p>
                  <p className="text-xs text-foreground/60 mt-1">
                    Cliquez sur le lien depuis cet appareil pour vous connecter automatiquement.
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

            <Button type="submit" className="w-full btn-primary" disabled={isButtonDisabled}>
              {getButtonContent()}
            </Button>
          </form>

          {emailSent && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-accent-foreground">
                  <strong>Problème ?</strong> Vérifiez vos spams ou essayez avec une autre adresse email.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MagicLinkForm;
