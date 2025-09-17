// src/components/AuthForm.tsx
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const { toast } = useToast();
  const { language } = useLanguage();

  const L = language === "en"
    ? {
        login: "Sign in",
        signup: "Create account",
        titleLogin: "Sign in",
        titleSignup: "Create your account",
        fullName: "Full name",
        email: "Email",
        password: "Password",
        placeholderName: "Your full name",
        placeholderEmail: "you@example.com",
        placeholderPassword: "••••••••",
        switchToSignup: "Create an account",
        switchToLogin: "Already registered?",
        okLoginTitle: "Signed in!",
        okLoginDesc: "Welcome to your QVT Box space",
        okSignupTitle: "Account created!",
        okSignupDesc: "Check your email to confirm your account",
        btnLoading: "Please wait…",
        forgot: "Forgot password?",
        resetSent: "Reset link sent",
        resetNeedEmail: "Enter your email to receive a reset link",
        error: "Error",
      }
    : {
        login: "Se connecter",
        signup: "Créer un compte",
        titleLogin: "Connexion",
        titleSignup: "Créer votre compte",
        fullName: "Nom complet",
        email: "Email",
        password: "Mot de passe",
        placeholderName: "Votre nom complet",
        placeholderEmail: "vous@exemple.com",
        placeholderPassword: "••••••••",
        switchToSignup: "Créer un compte",
        switchToLogin: "Déjà inscrit ?",
        okLoginTitle: "Connexion réussie !",
        okLoginDesc: "Bienvenue dans votre espace QVT Box",
        okSignupTitle: "Inscription réussie !",
        okSignupDesc: "Vérifiez vos emails pour confirmer votre compte",
        btnLoading: "Patientez…",
        forgot: "Mot de passe oublié ?",
        resetSent: "Lien de réinitialisation envoyé",
        resetNeedEmail: "Renseignez votre email pour recevoir un lien",
        error: "Erreur",
      };

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const canSubmit =
    email.trim().length > 3 &&
    password.trim().length >= 6 &&
    (isLogin || fullName.trim().length >= 2);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        toast({ title: L.okLoginTitle, description: L.okLoginDesc });
        onSuccess?.();
      } else {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: origin ? `${origin}/` : undefined,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;

        toast({ title: L.okSignupTitle, description: L.okSignupDesc });
        onSuccess?.();
      }
    } catch (err: any) {
      toast({ title: L.error, description: err?.message ?? String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email.trim()) {
      toast({ title: L.error, description: L.resetNeedEmail, variant: "destructive" });
      return;
    }
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: origin ? `${origin}/auth/reset` : undefined,
      });
      if (error) throw error;
      toast({ title: L.resetSent });
    } catch (err: any) {
      toast({ title: L.error, description: err?.message ?? String(err), variant: "destructive" });
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {isLogin ? L.titleLogin : L.titleSignup}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4" noValidate>
          {!isLogin && (
            <div>
              <Label htmlFor="fullName" className="text-gray-800">
                {L.fullName}
              </Label>
              <Input
                id="fullName"
                type="text"
                name="name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={L.placeholderName}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-gray-800">
              {L.email}
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={L.placeholderEmail}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-800">
              {L.password}
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                name="current-password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={L.placeholderPassword}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute inset-y-0 right-2 inline-flex items-center justify-center px-1 text-gray-600 hover:text-black"
                aria-label={showPwd ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full bg-black text-white hover:bg-black/90"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {L.btnLoading}
              </span>
            ) : isLogin ? (
              L.login
            ) : (
              L.signup
            )}
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleResetPassword}
            className="text-sm text-gray-700 hover:text-black underline underline-offset-2"
            type="button"
          >
            {L.forgot}
          </button>

          <button
            onClick={() => setIsLogin((v) => !v)}
            className="text-sm font-medium text-primary hover:text-primary/90"
            type="button"
          >
            {isLogin ? L.switchToSignup : L.switchToLogin}
          </button>
        </div>
      </div>
    </div>
  );
}
