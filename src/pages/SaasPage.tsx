// src/pages/ProfessionalSaasPage.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Shield,
  LineChart,
  Users,
  Bell,
  Cpu,
  Lock,
  Database,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: LineChart,
    title: "Dashboard RH en temps réel",
    desc: "Suivez le moral, les signaux faibles et les indicateurs QVT consolidés par équipe et par site.",
  },
  {
    icon: Bell,
    title: "Alertes intelligentes",
    desc: "Détection d'alertes personnalisées (absentéisme, surcharge, risques de burn-out) avec seuils ajustables.",
  },
  {
    icon: Cpu,
    title: "IA attentionnée",
    desc: "Suggestions d'actions concrètes et Box recommandées selon le contexte et la saisonnalité.",
  },
  {
    icon: Users,
    title: "Espaces collaborateurs",
    desc: "Auto-évaluations rapides, feedbacks anonymisés et suivi de ses propres tendances.",
  },
] as const;

const SECURITY = [
  { icon: Lock, title: "Sécurité & RGPD", desc: "Chiffrement en transit et au repos, consentements explicites et DPA." },
  { icon: Database, title: "Supabase sécurisé", desc: "RLS strictes, rôles limités, et audit des accès recommandés." },
  { icon: Shield, title: "Disponibilité", desc: "Architecture cloud résiliente et supervision continue." },
] as const;

const PLANS = [
  {
    name: "Essentiel",
    price: "89€ / mois",
    badge: "PME",
    points: [
      "Jusqu'à 50 collaborateurs",
      "Dashboards de base",
      "Exports CSV",
      "Support email",
    ],
    cta: { label: "Essayer", to: "/contact" },
  },
  {
    name: "Plus",
    price: "249€ / mois",
    badge: "Le + choisi",
    points: [
      "Jusqu'à 250 collaborateurs",
      "Alertes intelligentes",
      "Recommandations IA",
      "Support prioritaire",
    ],
    cta: { label: "Demander une démo", to: "/contact" },
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    badge: "Grand compte",
    points: [
      "> 250 collaborateurs",
      "SSO / RBAC avancé",
      "Intégrations (API)",
      "SLA & accompagnement",
    ],
    cta: { label: "Parler à un expert", to: "/contact" },
  },
] as const;

const FAQ = [
  {
    q: "Les données sont-elles anonymisées ?",
    a: "Oui, les tableaux de bord RH agrègent les résultats au-dessus d'effectifs minimaux et respectent le principe de minimisation des données.",
  },
  {
    q: "Peut-on connecter nos outils ?",
    a: "Oui, via API (Supabase / REST). Nous proposons des connecteurs sur demande (Power BI, Slack, Teams).",
  },
  {
    q: "La solution fonctionne-t-elle sans la Box physique ?",
    a: "Oui. Le SaaS est autonome. La Box vient enrichir l'engagement et la prévention terrain.",
  },
] as const;

const ProfessionalSaasPage: React.FC = () => {
  const [heroRef, heroVisible] = useScrollReveal();
  const [featRef, featVisible] = useScrollReveal();
  const [demoRef, demoVisible] = useScrollReveal();
  const [plansRef, plansVisible] = useScrollReveal();
  const [securityRef, securityVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [email, setEmail] = useState("");

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "QVT Box – SaaS",
      description:
        "Plateforme SaaS de suivi QVT avec dashboards, alertes intelligentes et recommandations d'actions.",
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="SaaS QVT – Dashboards & Alertes intelligentes | QVT Box"
        description="Suivez et améliorez la QVT avec notre SaaS : indicateurs en temps réel, alertes intelligentes, IA attentionnée, sécurité RGPD."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navigation />

      {/* Hero */}
      <section
        className={`pt-24 pb-16 px-6 bg-gradient-hero scroll-reveal ${heroVisible ? "visible" : ""}`}
        aria-labelledby="saas-hero-title"
        ref={heroRef}
      >
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Plateforme SaaS</Badge>
            <h1 id="saas-hero-title" className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
              Le cockpit QVT qui veille sur vos équipes
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mb-8">
              Centralisez vos signaux QVT, recevez des alertes intelligentes et agissez avec des recommandations concrètes.
              Compatible avec la Box physique <span className="text-primary font-medium">(optionnelle)</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button className="btn-primary">Demander une démo</Button>
              </Link>
              <button 
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Voir les offres <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className={`py-16 px-6 section-professional scroll-reveal ${featVisible ? "visible" : ""}`}
        aria-labelledby="features-title"
        ref={featRef}
      >
        <div className="container mx-auto">
          <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-foreground mb-10 font-inter">
            Ce que le SaaS vous apporte
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="card-professional">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-foreground/70 text-sm">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo / Email capture */}
      <section
        className={`py-12 px-6 bg-background-soft scroll-reveal ${demoVisible ? "visible" : ""}`}
        aria-labelledby="demo-title"
        ref={demoRef}
      >
        <div className="container mx-auto">
          <Card className="card-professional">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
                <div>
                  <h2 id="demo-title" className="text-2xl font-bold mb-2">Voir une démo personnalisée</h2>
                  <p className="text-foreground/70 max-w-xl">
                    Dites-nous en une phrase votre contexte (taille d'équipe, enjeux, sites) et on vous recontacte.
                  </p>
                </div>
                <form
                  className="flex w-full max-w-xl gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = "/contact";
                  }}
                >
                  <Input
                    type="email"
                    required
                    placeholder="Votre email pro"
                    aria-label="Votre email professionnel"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="btn-primary">Je veux une démo</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Plans */}
      <section
        id="plans"
        className={`py-16 px-6 bg-background scroll-reveal ${plansVisible ? "visible" : ""}`}
        aria-labelledby="plans-title"
        ref={plansRef}
      >
        <div className="container mx-auto">
          <h2 id="plans-title" className="text-3xl md:text-4xl font-bold mb-10 font-inter">Des offres simples et évolutives</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <Card key={plan.name} className={`card-professional ${plan.name === "Plus" ? "ring-2 ring-primary" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <Badge className={plan.name === "Plus" ? "bg-primary text-white" : "bg-primary/10 text-primary"}>{plan.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-4">{plan.price}</div>
                  <ul className="space-y-2 mb-6">
                    {plan.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.cta.to}>
                    <Button className={plan.name === "Plus" ? "btn-primary w-full" : "btn-secondary w-full"}>{plan.cta.label}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sécurité */}
      <section
        className={`py-16 px-6 section-professional scroll-reveal ${securityVisible ? "visible" : ""}`}
        aria-labelledby="security-title"
        ref={securityRef}
      >
        <div className="container mx-auto">
          <h2 id="security-title" className="text-3xl md:text-4xl font-bold mb-10 font-inter">Sécurité & conformité</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SECURITY.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="card-professional">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-foreground/70 text-sm">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className={`py-16 px-6 bg-background-soft scroll-reveal ${faqVisible ? "visible" : ""}`}
        aria-labelledby="faq-title"
        ref={faqRef}
      >
        <div className="container mx-auto">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold mb-10 font-inter">FAQ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FAQ.map(({ q, a }) => (
              <Card key={q} className="card-professional">
                <CardHeader>
                  <CardTitle className="text-lg">{q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 text-sm">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className={`py-20 px-6 bg-primary scroll-reveal ${ctaVisible ? "visible" : ""}`}
        aria-labelledby="cta-title"
        ref={ctaRef}
      >
        <div className="container mx-auto text-center">
          <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à piloter la QVT autrement ?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Discutons de vos enjeux et voyons comment QVT Box peut s'intégrer simplement à votre environnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Parler à un expert</Button>
            </Link>
            <Link to="/box">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">Découvrir la Box</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfessionalSaasPage;
