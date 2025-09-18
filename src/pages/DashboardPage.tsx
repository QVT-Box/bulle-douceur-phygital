// src/pages/DashboardPage.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProfessionalDashboard from "@/components/ProfessionalDashboard";
import AuthGuard from "@/components/AuthGuard";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Mail, Info, BarChart3, Gift, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
// ⬇️ décommente si tu veux afficher le bouton d’assistant
// import { useState } from "react";
// import { AssistantChatBot } from "@/components/AssistantChatBot";

function InfoBanner() {
  const { user } = useAuth();
  const emailUnverified =
    // champ disponible sur les users Supabase v2 (si non présent, ça ne casse pas)
    // on check de façon défensive
    // @ts-ignore
    !user?.email_confirmed_at && !user?.confirmed_at;

  if (!emailUnverified) return null;

  return (
    <div className="mb-6 rounded-lg border border-yellow-300/40 bg-yellow-50 text-yellow-900 px-4 py-3 flex items-start gap-3">
      <Mail className="w-4 h-4 mt-0.5" />
      <div className="text-sm">
        <p className="font-medium">Vérifiez votre email</p>
        <p className="opacity-90">
          Un message de confirmation a été envoyé à votre adresse. Pensez à
          vérifier vos spams si besoin.
        </p>
      </div>
    </div>
  );
}

function WelcomeStrip() {
  const { language } = useLanguage();
  const L =
    language === "en"
      ? {
          title: "Welcome to your QVT Box dashboard",
          subtitle:
            "Track your QWL indicators, alerts and resources in real time.",
          ctaQuote: "Request a quote",
          ctaBoxes: "Discover our Boxes",
          ctaSaaS: "Enterprise SaaS",
        }
      : {
          title: "Bienvenue dans votre tableau de bord QVT Box",
          subtitle:
            "Suivez vos indicateurs QVT, alertes et ressources en temps réel.",
          ctaQuote: "Demander un devis",
          ctaBoxes: "Découvrir nos Box",
          ctaSaaS: "Licence SaaS",
        };

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            {L.title}
          </h1>
          <p className="text-sm md:text-base text-foreground/70">{L.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 text-sm hover:bg-primary/90 transition"
          >
            <Sparkles className="w-4 h-4" />
            {L.ctaQuote}
          </Link>
          <Link
            to="/box"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-white px-4 py-2 text-sm hover:bg-primary/5 transition"
          >
            <Gift className="w-4 h-4 text-primary" />
            {L.ctaBoxes}
          </Link>
          <Link
            to="/saas"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 bg-white px-4 py-2 text-sm hover:bg-secondary/5 transition"
          >
            <BarChart3 className="w-4 h-4 text-secondary" />
            {L.ctaSaaS}
          </Link>
        </div>
      </div>
    </div>
  );
}

function TipsStrip() {
  return (
    <div className="mb-6 rounded-lg border border-blue-200/50 bg-blue-50 px-4 py-3 text-blue-900 flex items-start gap-3">
      <Info className="w-4 h-4 mt-0.5" />
      <div className="text-sm">
        <p className="font-medium">Astuce</p>
        <p className="opacity-90">
          Ajoutez régulièrement vos données (alertes, besoins, préférences
          Box) pour améliorer la précision des recommandations.
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // ⬇️ décommente pour l’assistant flottant
  // const [botOpen, setBotOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Mon Tableau de Bord — QVT Box</title>
        <meta
          name="description"
          content="Suivez vos indicateurs QVT, alertes et ressources dans votre tableau de bord QVT Box."
        />
        <link rel="canonical" href="https://qvtbox.com/dashboard" />
        <meta property="og:title" content="Mon Tableau de Bord — QVT Box" />
        <meta
          property="og:description"
          content="Suivez vos indicateurs QVT, alertes et ressources dans votre tableau de bord QVT Box."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header visible en permanence */}
      <Navigation />

      {/* Contenu protégé */}
      <AuthGuard>
        <main className="min-h-[70vh] pt-24 pb-12 px-6 bg-background">
          <div className="container mx-auto">
            <WelcomeStrip />
            <InfoBanner />
            <TipsStrip />

            {/* Dashboard principal */}
            <ProfessionalDashboard />
          </div>
        </main>
      </AuthGuard>

      <Footer />

      {/* Assistant flottant (optionnel) */}
      {/* <AssistantChatBot isOpen={botOpen} onToggle={() => setBotOpen((v) => !v)} /> */}
    </>
  );
}
