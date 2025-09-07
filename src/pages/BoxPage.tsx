import React, { useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import {
  Package,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  Wrench,
  Award,
  Heart,
  Gift,
} from "lucide-react";
import qvtBoxImage from "@/assets/qvt-box-products.jpg";
import professionalTeam from "@/assets/professional-team-meeting.jpg";

// --- Mise en avant : Box Pouvoir d'Achat (standard mensuelle)
const FEATURED_BOX = {
  name: "Box Pouvoir d'Achat",
  subtitle: "La box standard, personnalisée par les salariés, à recevoir chaque mois",
  description:
    "Un petit coup de pouce au budget avec des essentiels utiles 100% français, choisis par vos équipes selon leurs priorités.",
  price: "À partir de 29€ / mois",
  contents: [
    "Essentiels du quotidien Made in France",
    "Avantages/partenariats locaux",
    "Astuces budget & organisation",
    "Produit surprise de terroir",
  ],
  badge: "Standard mensuelle",
  icon: Gift,
} as const;

const THEMATIC_BOXES = [
  {
    name: "Box Focus & Performance",
    description: "Solutions pour améliorer la concentration et réduire le stress professionnel",
    price: "À partir de 45€",
    contents: [
      "Produits ergonomiques français",
      "Guide ANACT bien-être",
      "Outils anti-stress certifiés",
      "Accompagnement personnalisé",
    ],
    icon: Shield,
    compliance: "Conforme aux recommandations INRS",
  },
  {
    name: "Box Mobilité & Ergonomie",
    description: "Prévention des TMS et amélioration des conditions de travail",
    price: "À partir de 55€",
    contents: [
      "Accessoires ergonomiques",
      "Programme d'exercices validé",
      "Conseils posturaux INRS",
      "Suivi personnalisé",
    ],
    icon: Wrench,
    compliance: "Validé par des kinésithérapeutes",
  },
  {
    name: "Box Pénibilité & Récupération",
    description: "Solutions pour soulager la pénibilité physique au travail",
    price: "À partir de 65€",
    contents: [
      "Produits de récupération bio",
      "Protocoles de soulagement",
      "Guide prévention TMS",
      "Coaching bien-être",
    ],
    icon: Heart,
    compliance: "Produits certifiés biologiques",
  },
  {
    name: "Box Cohésion & Reconnaissance",
    description: "Renforcement du lien social et valorisation des équipes",
    price: "À partir de 40€",
    contents: [
      "Activités team-building",
      "Outils de reconnaissance",
      "Guide management bienveillant",
      "Rituels d'équipe",
    ],
    icon: Award,
    compliance: "Basé sur les pratiques ANACT",
  },
] as const;

const EVENT_BOXES = [
  {
    event: "Départ à la retraite",
    description: "Accompagnement bienveillant pour cette transition de vie",
    icon: Gift,
    customization: "Personnalisable selon les goûts et l'histoire professionnelle",
  },
  {
    event: "Naissance / Adoption",
    description: "Félicitations et soutien pour les nouveaux parents",
    icon: Heart,
    customization: "Produits pour bébé français et conseils parentalité",
  },
  {
    event: "Promotion / Évolution",
    description: "Reconnaissance des efforts et accompagnement du changement",
    icon: Award,
    customization: "Adapté au nouveau poste et aux défis à venir",
  },
  {
    event: "Anniversaire entreprise",
    description: "Célébration de l'ancienneté et fidélisation",
    icon: Calendar,
    customization: "Rétrospective personnalisée et cadeaux adaptés",
  },
] as const;

const PROCESS_STEPS = [
  { step: "01", title: "Diagnostic participatif", description: "Les salariés expriment leurs besoins via notre outil d'évaluation anonyme" },
  { step: "02", title: "Co-construction des box", description: "Sélection collaborative des produits selon les priorités identifiées" },
  { step: "03", title: "Livraison et suivi", description: "Distribution sur site avec accompagnement et mesure d'impact" },
] as const;

const BoxPage: React.FC = () => {
  const [heroRef, heroVisible] = useScrollReveal();
  const [boxesRef, boxesVisible] = useStaggeredReveal(5, 200); // +1 pour la mise en avant
  const [processRef, processVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  // JSON-LD: inclut la Box Pouvoir d'Achat en premier
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "Product",
          position: 1,
          name: FEATURED_BOX.name,
          description: FEATURED_BOX.description,
          brand: { "@type": "Brand", name: "QVT Box" },
          offers: { "@type": "Offer", priceCurrency: "EUR", price: FEATURED_BOX.price.replace(/[^0-9]/g, ""), availability: "https://schema.org/InStock" },
        },
        ...THEMATIC_BOXES.map((b, i) => ({
          "@type": "Product",
          position: i + 2,
          name: b.name,
          description: b.description,
          brand: { "@type": "Brand", name: "QVT Box" },
          offers: { "@type": "Offer", priceCurrency: "EUR", price: b.price.replace(/[^0-9]/g, ""), availability: "https://schema.org/PreOrder" },
        })),
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Box QVT – Pouvoir d'Achat (standard) & Thématiques | QVT Box"
        description="La Box Pouvoir d'Achat, standard mensuelle co‑personnalisée par les salariés, et nos box thématiques ergonomie, pénibilité, cohésion."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navigation />

      {/* Hero Section */}
      <section
        className={`pt-24 pb-16 px-6 bg-gradient-hero scroll-reveal ${heroVisible ? 'visible' : ''}`}
        ref={heroRef}
        aria-labelledby="box-hero-title"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-8 h-8 text-primary" aria-hidden="true" />
                <Badge variant="outline">Solution QVT certifiée</Badge>
              </div>

              <h1 id="box-hero-title" className="text-4xl md:text-6xl font-bold text-foreground mb-3 font-inter">
                Box <span className="text-primary">Thématiques & Événementielles</span>
              </h1>
              <p className="text-primary/90 font-medium mb-6">+ <strong>Box Pouvoir d'Achat</strong> — la box standard mensuelle personnalisée par les salariés</p>

              <div className="card-professional p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-lato mb-4">
                  <span className="text-primary font-medium">
                    Nos box sont co-construites avec les salariés, conformément aux recommandations de l'ANACT sur la participation et le dialogue social.
                  </span>
                </p>
                <p className="text-foreground/70 font-lato">
                  Une approche participative qui garantit l'adhésion des équipes et l'utilité immédiate des solutions proposées.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/boutique">
                  <Button className="btn-primary text-lg px-8 py-4 font-inter" aria-label="Commander la Box Pouvoir d'Achat">
                    Commander la Box Pouvoir d'Achat
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="text-lg px-8 py-4 font-inter" aria-label="Évaluer mes besoins">
                    Évaluer mes besoins
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src={qvtBoxImage}
                alt="Produits QVT Box professionnels"
                className="rounded-lg shadow-floating w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mise en avant : Box Pouvoir d'Achat */}
      <section className="py-10 px-6 bg-background" aria-labelledby="featured-title">
        <div className="container mx-auto">
          <h2 id="featured-title" className="sr-only">Box standard mise en avant</h2>
          <Card className="card-professional ring-2 ring-secondary">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-6 justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-secondary text-white">{FEATURED_BOX.badge}</Badge>
                    <span className="text-secondary font-medium">Abonnement mensuel</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{FEATURED_BOX.name}</h3>
                  <p className="text-foreground/70 mb-4">{FEATURED_BOX.subtitle}</p>
                  <p className="text-foreground/80 mb-6">{FEATURED_BOX.description}</p>
                  <div className="grid sm:grid-cols-2 gap-2 mb-6">
                    {FEATURED_BOX.contents.map((c) => (
                      <div key={c} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5" aria-hidden="true" />
                        {c}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">{FEATURED_BOX.price}</div>
                    <Link to="/boutique">
                      <Button className="btn-secondary">Choisir cette box</Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-full bg-secondary/10">
                  <FEATURED_BOX.icon className="w-12 h-12 text-secondary" aria-hidden="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Box Thématiques */}
      <section className="py-20 px-6 section-professional" ref={boxesRef} aria-labelledby="thematic-title">
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${boxesVisible.has(0) ? 'visible' : ''}`}>
            <h2 id="thematic-title" className="text-4xl font-bold text-foreground mb-6 font-inter">
              Box <span className="text-secondary">Thématiques</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Solutions ciblées pour répondre aux défis identifiés par les études DARES et INRS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {THEMATIC_BOXES.map((box, index) => {
              const IconComponent = box.icon;
              return (
                <Card
                  key={box.name}
                  className={`card-professional overflow-hidden card-hover stagger-item ${boxesVisible.has(index + 1) ? 'visible' : ''}`}
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-10 h-10 text-primary" aria-hidden="true" />
                      {box.compliance && (
                        <Badge variant="outline" className="text-xs">{box.compliance}</Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-inter text-foreground" itemProp="name">
                      {box.name}
                    </CardTitle>
                    <p className="text-foreground/70 font-lato" itemProp="description">
                      {box.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-primary font-inter" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="EUR" />
                        <span itemProp="price" content={box.price.replace(/[^0-9]/g, '')}>{box.price}</span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 font-inter">Contenu de la box :</h4>
                        <ul className="space-y-1">
                          {box.contents.map((item) => (
                            <li key={`${box.name}-${item}`} className="flex items-start gap-2 text-sm font-lato">
                              <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full btn-outline button-hover" aria-label={`Personnaliser la ${box.name}`}>
                        Personnaliser cette box
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Box Événementielles */}
      <section className="py-20 px-6 bg-background" aria-labelledby="event-title">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="event-title" className="text-4xl font-bold text-foreground mb-6 font-inter">
              Box <span className="text-primary">Événementielles</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Marquer les moments importants de la vie professionnelle avec bienveillance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {EVENT_BOXES.map((eventBox) => {
              const IconComponent = eventBox.icon;
              return (
                <Card key={eventBox.event} className="card-professional p-6 text-center">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg font-inter">{eventBox.event}</h3>
                    <p className="text-sm text-foreground/70 font-lato">{eventBox.description}</p>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-primary font-medium font-lato">{eventBox.customization}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processus participatif */}
      <section className="py-20 px-6 section-professional" ref={processRef} aria-labelledby="process-title">
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${processVisible ? 'visible' : ''}`}>
            <h2 id="process-title" className="text-4xl font-bold text-foreground mb-6 font-inter">
              Un processus <span className="text-secondary">clair et participatif</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Conformément aux recommandations ANACT : participation, dialogue social et co-construction
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.step} className="flex items-center gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold font-inter">
                  {step.step}
                </div>

                <div className="flex-1 card-professional p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-inter">{step.title}</h3>
                  <p className="text-foreground/70 font-lato leading-relaxed">{step.description}</p>
                </div>

                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block" aria-hidden="true">
                    <ArrowRight className="w-8 h-8 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="py-16 px-6 bg-background" aria-labelledby="testimonial-title">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={professionalTeam}
              alt="Équipe professionnelle en réunion QVT"
              className="rounded-lg shadow-floating object-cover w-full h-96"
              loading="lazy"
            />

            <div className="space-y-6">
              <div className="card-professional p-8">
                <h3 id="testimonial-title" className="sr-only">Témoignage client</h3>
                <blockquote className="text-lg italic text-foreground/80 mb-6 font-lato">
                  "La démarche participative de QVT Box a transformé notre approche du bien-être au travail.
                  Les salariés se sentent écoutés et les box répondent vraiment à leurs besoins quotidiens."
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground font-inter">Catherine Moreau</p>
                  <p className="text-sm text-foreground/60 font-lato">DRH, TechnoServices (320 salariés)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`py-20 px-6 bg-primary scroll-reveal-scale ${ctaVisible ? 'visible' : ''}`}
        ref={ctaRef}
        aria-labelledby="cta-title"
      >
        <div className="container mx-auto text-center">
          <h2 id="cta-title" className="text-4xl font-bold text-white mb-6 font-inter">
            Prêt à co-construire avec vos équipes ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato">
            Lancez une démarche participative alignée avec les recommandations ANACT
            et offrez des solutions concrètes à vos collaborateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter button-hover">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                Commencer l'évaluation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter button-hover">
                Demander une présentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BoxPage;
