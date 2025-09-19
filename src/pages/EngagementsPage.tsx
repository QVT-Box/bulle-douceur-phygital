import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Wrench,
  Shield,
  Wifi,
  Award,
  MapPin,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo, useState } from "react";

/**
 * Utilitaires de localisation d’URL (préfixe /fr ou /en)
 */
function useLangPaths() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => {
    if (!p || p === "/") return root;
    return `${root}${p.startsWith("/") ? p : `/${p}`}`;
  };

  // optionnel : si on veut forcer la page courante avec le bon préfixe
  const ensurePrefixed = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    const currentLng = parts[0] === "fr" || parts[0] === "en" ? parts[0] : null;
    if (currentLng !== language) {
      if (currentLng) parts[0] = language;
      else parts.unshift(language);
      navigate("/" + parts.join("/") + location.search, { replace: true });
    }
  };

  return { withLang, ensurePrefixed };
}

export default function EngagementsPage() {
  const { language } = useLanguage();
  const { withLang } = useLangPaths();
  const [showSources, setShowSources] = useState(false);

  const L =
    language === "en"
      ? {
          seoTitle: "Our Commitments — QVT Box",
          seoDesc:
            "Evidence-based solutions to improve quality of work life: ergonomics, psychosocial risk prevention, recognition, local impact.",
          heroTitle: "Our ",
          heroSpan: "Commitments",
          heroLead:
            "Solutions based on recent studies and official recommendations to turn work challenges into well-being opportunities.",
          sectionEngTitle: "Detailed Commitments",
          sectionImpactTitle: "Measured ",
          sectionImpactSpan: "impacts",
          sourcesTitle: "References & methodology",
          sourcesToggleOpen: "Hide details",
          sourcesToggleClosed: "See sources & methodology",
          ctaTitle: "Let’s move forward together",
          ctaDesc:
            "Turn your company’s challenges into opportunities for well-being and collective performance.",
          ctaBtn: "Become a partner company",
          card: {
            p: "Reduce physical strain",
            rps: "Prevent psychosocial risks",
            deco: "Respect the right to disconnect",
            recog: "Recognition & appreciation",
            local: "Support local economy",
            stats: "Stats",
            source: "Source",
          },
          impacts: {
            a: "Sick leave reduction",
            b: "Better social climate",
            c: "Regulatory compliance",
            aDesc: "With continuous prevention",
            bDesc: "Thanks to employee participation",
            cDesc: "DUERP & RPS obligations respected",
          },
        }
      : {
          seoTitle: "Nos Engagements — QVT Box",
          seoDesc:
            "Des solutions fondées sur des études et recommandations officielles : ergonomie, prévention RPS, reconnaissance, impact local.",
          heroTitle: "Nos ",
          heroSpan: "Engagements",
          heroLead:
            "Des solutions fondées sur les dernières études et recommandations officielles pour transformer les défis du travail en opportunités de bien-être.",
          sectionEngTitle: "Engagements détaillés",
          sectionImpactTitle: "Impacts ",
          sectionImpactSpan: "mesurés",
          sourcesTitle: "Références & méthodologie",
          sourcesToggleOpen: "Masquer les détails",
          sourcesToggleClosed: "Voir les sources & la méthodologie",
          ctaTitle: "Rejoignons le mouvement ensemble",
          ctaDesc:
            "Transformez les défis de votre entreprise en opportunités de bien-être et de performance collective.",
          ctaBtn: "Devenir entreprise partenaire",
          card: {
            p: "Soulager la pénibilité",
            rps: "Prévenir les risques psychosociaux",
            deco: "Droit à la déconnexion",
            recog: "Reconnaître et valoriser",
            local: "Soutenir l'économie locale",
            stats: "Chiffre clé",
            source: "Source",
          },
          impacts: {
            a: "Réduction des arrêts maladie",
            b: "Amélioration du climat social",
            c: "Conformité réglementaire",
            aDesc: "Avec une approche préventive continue",
            bDesc: "Grâce à la participation des salariés",
            cDesc: "Respect des obligations DUERP et RPS",
          },
        };

  const engagements = useMemo(
    () => [
      {
        title: L.card.p,
        description:
          language === "en"
            ? "40% of employees report constraining physical hardship (DARES 2023)"
            : "40% des salariés déclarent une pénibilité physique contraignante (DARES 2023)",
        details:
          language === "en"
            ? "Appropriate products (ergonomics, recovery) to reduce MSDs and improve working conditions."
            : "Des produits adaptés (ergonomie, récupération) pour réduire les TMS et améliorer les conditions de travail.",
        icon: Wrench,
        color: "text-secondary",
        stats: language === "en" ? "40% affected" : "40% des salariés concernés",
        source: "DARES 2023",
      },
      {
        title: L.card.rps,
        description:
          language === "en"
            ? "Psychosocial risks affect 1 out of 3 employees (INRS)"
            : "Les RPS touchent 1 salarié sur 3 (INRS)",
        details:
          language === "en"
            ? "Early alerts, anonymized dashboards and tools aligned with INRS & Public Health recommendations."
            : "Alertes précoces, tableaux de bord anonymisés et outils conformes aux recommandations INRS et Santé Publique France.",
        icon: Shield,
        color: "text-primary",
        stats: language === "en" ? "1 in 3 exposed" : "1 sur 3 exposé",
        source: "INRS / SPF",
      },
      {
        title: L.card.deco,
        description:
          language === "en"
            ? "Legal obligation in France since the Labour Law; promoted by ANACT"
            : "Obligation légale depuis la Loi Travail, promue par l’ANACT",
        details:
          language === "en"
            ? "Kind tools and a disconnection charter to preserve work-life balance."
            : "Outils bienveillants et charte de déconnexion pour préserver l’équilibre vie pro / perso.",
        icon: Wifi,
        color: "text-accent-foreground",
        stats: language === "en" ? "Legal requirement" : "Obligation légale",
        source: "Loi Travail / ANACT",
      },
      {
        title: L.card.recog,
        description:
          language === "en"
            ? "Only ~15% feel truly recognized (Gallup 2023)"
            : "Seuls ~15% se sentent vraiment reconnus (Gallup 2023)",
        details:
          language === "en"
            ? "Visible, concrete gestures to improve engagement and motivation."
            : "Des gestes visibles et concrets pour améliorer l’engagement et la motivation.",
        icon: Award,
        color: "text-secondary",
        stats: language === "en" ? "~85% lacking recognition" : "~85% manquent de reconnaissance",
        source: "Gallup 2023",
      },
      {
        title: L.card.local,
        description:
          language === "en"
            ? "70% of French people want local sourcing (ADEME)"
            : "70% des Français souhaitent un approvisionnement local (ADEME)",
        details:
          language === "en"
            ? "100% French-made products, short supply chains, support for local artisans."
            : "Produits 100% français, circuits courts et soutien aux artisans locaux.",
        icon: MapPin,
        color: "text-primary",
        stats: language === "en" ? "70% favorable" : "70% favorables",
        source: "ADEME",
      },
    ],
    [language, L]
  );

  const impacts = useMemo(
    () => [
      {
        title: L.impacts.a,
        value: "-25%",
        description: L.impacts.aDesc,
        icon: TrendingUp,
      },
      {
        title: L.impacts.b,
        value: "+40%",
        description: L.impacts.bDesc,
        icon: CheckCircle,
      },
      {
        title: L.impacts.c,
        value: "100%",
        description: L.impacts.cDesc,
        icon: BarChart3,
      },
    ],
    [L]
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{L.seoTitle}</title>
        <meta name="description" content={L.seoDesc} />
        <link rel="canonical" href="https://qvtbox.com/engagements" />
        <meta property="og:title" content={L.seoTitle} />
        <meta property="og:description" content={L.seoDesc} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
            {L.heroTitle}
            <span className="text-primary">{L.heroSpan}</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato leading-relaxed">
            {L.heroLead}
          </p>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground font-inter">
              {L.sectionEngTitle}
            </h2>
          </div>

          <div className="space-y-12">
            {engagements.map((engagement, index) => {
              const IconComponent = engagement.icon;
              return (
                <Card key={index} className="card-professional overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Col gauche */}
                      <div className="p-8 bg-primary/5 flex flex-col justify-center">
                        <div className="flex justify-center mb-6">
                          <div
                            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <IconComponent className={`w-10 h-10 ${engagement.color}`} />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-4 font-inter">
                          {engagement.title}
                        </h3>
                        <div className="text-center">
                          <Badge variant="outline" className="mb-2">
                            {engagement.stats}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {language === "en" ? "Source:" : "Source :"} {engagement.source}
                          </p>
                        </div>
                      </div>

                      {/* Col droite */}
                      <div className="p-8 md:col-span-2">
                        <p className="text-lg font-medium mb-4 text-primary font-montserrat">
                          {engagement.description}
                        </p>
                        <p className="text-foreground/70 leading-relaxed font-lato">
                          {engagement.details}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sources & Méthodo (repliable) */}
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setShowSources((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition text-sm"
              aria-expanded={showSources}
            >
              <Info className="w-4 h-4" />
              {showSources ? L.sourcesToggleOpen : L.sourcesToggleClosed}
              {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSources && (
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <Card className="card-professional p-6">
                  <h4 className="font-semibold mb-3 font-montserrat">
                    {language === "en" ? "Institutional references" : "Références institutionnelles"}
                  </h4>
                  <ul className="space-y-2 text-sm font-lato text-foreground/80">
                    <li>• ANACT</li>
                    <li>• DARES</li>
                    <li>• INRS</li>
                    <li>• Santé Publique France</li>
                    <li>• ADEME</li>
                  </ul>
                </Card>
                <Card className="card-professional p-6">
                  <h4 className="font-semibold mb-3 font-montserrat">
                    {language === "en" ? "International studies" : "Études internationales"}
                  </h4>
                  <ul className="space-y-2 text-sm font-lato text-foreground/80">
                    <li>• Gallup – State of the Global Workplace</li>
                    <li>• Eurostat / Eurofound</li>
                    <li>• ILO / OIT</li>
                  </ul>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impacts */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              {L.sectionImpactTitle}
              <span className="text-secondary">{L.sectionImpactSpan}</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              {language === "en"
                ? "Concrete outcomes observed with partner companies. Figures are orders of magnitude and may vary depending on context."
                : "Résultats observés chez nos entreprises partenaires. Chiffres indicatifs susceptibles de varier selon le contexte."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => {
              const IconComponent = impact.icon;
              return (
                <Card key={index} className="card-professional text-center p-8">
                  <CardContent className="space-y-4">
                    <IconComponent className="w-12 h-12 text-primary mx-auto" aria-hidden="true" />
                    <div className="text-4xl font-bold text-primary font-inter">
                      {impact.value}
                    </div>
                    <h4 className="font-semibold text-lg font-montserrat">
                      {impact.title}
                    </h4>
                    <p className="text-sm text-foreground/70 font-lato">
                      {impact.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-inter">
            {L.ctaTitle}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-lato">
            {L.ctaDesc}
          </p>
          <Link to={withLang("/box")}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-inter"
            >
              {L.ctaBtn}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
