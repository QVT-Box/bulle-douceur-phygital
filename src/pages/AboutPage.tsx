import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Lightbulb, Shield, Award, Target } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const VALUES = [
  {
    icon: Heart,
    title: "Bien-être au cœur",
    description:
      "Le bien-être de vos collaborateurs est notre priorité absolue. Nous croyons qu'un employé épanoui est plus productif et créatif.",
  },
  {
    icon: Users,
    title: "Équipe dédiée",
    description:
      "Une équipe d'experts passionnés travaille chaque jour pour créer des solutions innovantes et personnalisées.",
  },
  {
    icon: Lightbulb,
    title: "Innovation continue",
    description:
      "Nous développons constamment de nouvelles approches pour améliorer la qualité de vie au travail.",
  },
  {
    icon: Shield,
    title: "Confiance & Transparence",
    description:
      "Relations basées sur la confiance, la transparence et le respect mutuel avec nos clients et partenaires.",
  },
] as const;

const MILESTONES = [
  {
    year: "2025",
    title: "Création de QVT Box",
    description:
      "Lancement officiel de QVT Box avec la vision de réinventer le bien-être au travail.",
  },
  {
    year: "2025",
    title: "Premiers tests utilisateurs",
    description:
      "Expérimentation des premières Box physiques et mise en place des premiers dashboards RH.",
  },
  {
    year: "2025",
    title: "Crowdfunding & partenaires",
    description:
      "Campagne de financement participatif et premiers partenariats avec des artisans français.",
  },
  {
    year: "2026",
    title: "Déploiement SaaS",
    description:
      "Lancement de la plateforme digitale intégrée, combinant IA émotionnelle et suivi QVT.",
  },
  {
    year: "2027",
    title: "Expansion francophone",
    description:
      "Déploiement de QVT Box en Belgique et en Suisse, avec reconnaissance comme acteur de référence en prévention émotionnelle.",
  },
] as const;

const AboutPage = () => {
  const [heroRef, heroVisible] = useScrollReveal();
  const [missionRef, missionVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();
  const [timelineRef, timelineVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "À propos - QVT Box",
    description:
      "Découvrez l'histoire de QVT Box, notre mission et nos valeurs pour améliorer la qualité de vie au travail.",
    publisher: {
      "@type": "Organization",
      name: "QVT Box",
      url: "https://www.qvtbox.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.qvtbox.com/logo.png",
      },
    },
  } as const;

  return (
    <>
      <SEOHead
        title="À propos - QVT Box | Notre mission et nos valeurs"
        description="Découvrez l'histoire de QVT Box, notre équipe passionnée et notre mission d'améliorer la qualité de vie au travail en France."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />

        <main id="main" role="main" className="pt-24 relative z-10">
          {/* Hero Section */}
          <section
            className={`container mx-auto px-6 py-16 scroll-reveal ${heroVisible ? 'visible' : ''}`}
            aria-labelledby="about-hero-title"
            ref={heroRef}
          >
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge
                className="mb-6 bg-primary/10 text-primary border-primary/20"
                aria-label="Section: Notre histoire"
              >
                Notre Histoire
              </Badge>
              <h1
                id="about-hero-title"
                className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-kalam"
              >
                Réinventer le
                <span className="text-gradient"> bien-être au travail</span>
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                QVT Box est née en 2025 de la conviction que chaque entreprise mérite des collaborateurs épanouis
                et que chaque collaborateur mérite un environnement de travail bienveillant.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section
            className={`container mx-auto px-6 py-16 scroll-reveal ${missionVisible ? 'visible' : ''}`}
            aria-labelledby="mission-title"
            ref={missionRef}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  id="mission-title"
                  className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam"
                >
                  Notre Mission
                </h2>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  Nous accompagnons les entreprises dans leur démarche QVT en proposant des solutions
                  concrètes, mesurables et personnalisées. Notre approche combine produits artisanaux,
                  outils digitaux et expertise humaine.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                    <Target className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Objectif 2025</h3>
                    <p className="text-foreground/70">Accompagner 1000+ entreprises</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    aria-label="Aller à la page contact"
                  >
                    Nous contacter
                  </Link>
                  <Link
                    to="/box"
                    className="btn-secondary inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    aria-label="Découvrir nos Box"
                  >
                    Découvrir nos Box
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Card className="card-professional">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Notre Vision</h3>
                      <p className="text-foreground/80">
                        Créer un écosystème où bien-être et performance s'épanouissent ensemble,
                        transformant chaque lieu de travail en environnement inspirant.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section
            className={`container mx-auto px-6 py-16 scroll-reveal ${valuesVisible ? 'visible' : ''}`}
            aria-labelledby="values-title"
            ref={valuesRef}
          >
            <div className="text-center mb-12">
              <h2
                id="values-title"
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam"
              >
                Nos Valeurs
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Les principes qui guident chacune de nos actions et décisions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="card-professional transition-transform duration-300 will-change-transform hover:scale-[1.03]">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                      <span className="sr-only">{title}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
                    <p className="text-foreground/70">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Timeline Section */}
          <section
            className={`container mx-auto px-6 py-16 scroll-reveal ${timelineVisible ? 'visible' : ''}`}
            aria-labelledby="timeline-title"
            ref={timelineRef}
          >
            <div className="text-center mb-12">
              <h2
                id="timeline-title"
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam"
              >
                Notre Parcours
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Les étapes clés de notre développement
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <ol className="relative border-l border-primary/20 pl-6">
                {MILESTONES.map(({ year, title, description }) => (
                  <li key={`${year}-${title}`} className="mb-10 ml-4">
                    <span className="absolute -left-2 mt-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary"></span>
                    <Card className="card-professional">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-primary text-white" aria-label={`Année ${year}`}>
                          {year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                        <p className="text-foreground/70">{description}</p>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section
            className={`container mx-auto px-6 py-16 scroll-reveal ${ctaVisible ? 'visible' : ''}`}
            aria-labelledby="cta-title"
            ref={ctaRef}
          >
            <Card className="card-professional text-center">
              <CardContent className="p-12">
                <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam">
                  Prêt à transformer votre entreprise ?
                </h2>
                <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Rejoignez les entreprises qui ont déjà fait le choix du bien-être
                  et découvrez comment QVT Box peut vous accompagner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    Nous contacter
                  </Link>
                  <Link
                    to="/box"
                    className="btn-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    Découvrir nos Box
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
