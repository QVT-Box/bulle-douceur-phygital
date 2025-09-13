import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BoxCatalog from "@/components/BoxCatalog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import heroImage from "@/assets/hero-workplace-team.jpg";
import saasImage from "@/assets/saas-dashboard-pro.jpg";
import boxImage from "@/assets/box-artisanal.jpg";
import { 
  Users, 
  Package, 
  Shield, 
  Award, 
  Building2,
  Phone,
  TrendingUp,
  CheckCircle,
  BarChart3,
  FileCheck,
  ArrowRight,
  Smartphone,
  Gift,
  Heart,
  AlertTriangle,
  UserPlus,
  Download,
  Euro
} from "lucide-react";

const NewIndex = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [offerRef, offerVisible] = useStaggeredReveal(3, 200);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useStaggeredReveal(3, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const offers = [
    {
      title: "Box & Produits",
      subtitle: "Solutions physiques",
      description: "Box thématiques et événementielles, produits français artisanaux pour le soutien quotidien des équipes",
      icon: Package,
      features: ["Box Pouvoir d'Achat", "Box Thématiques", "Box Événementielles", "Produits Made in France"],
      color: "primary"
    },
    {
      title: "Licence SaaS Entreprise",
      subtitle: "Outil numérique exclusif",
      description: "Application QVT réservée aux entreprises sous forme de licence pour la prévention RPS et le suivi QVCT",
      icon: BarChart3,
      features: ["Tableaux de bord RH", "Alertes RPS", "Export DUERP", "Suivi anonymisé"],
      color: "secondary"
    },
    {
      title: "Boutique & Partenariats",
      subtitle: "Réseau local",
      description: "Sélection de partenaires locaux et boutique en ligne pour compléter votre offre bien-être",
      icon: Building2,
      features: ["Partenaires locaux", "Co-branding", "Commissions", "Made in France"],
      color: "accent"
    }
  ];

  const demoFeatures = [
    {
      title: "Dashboard RH Global",
      description: "Scoring QVT de 1 à 15 avec indicateurs anonymisés par équipe",
      icon: BarChart3,
      mockup: "Équipe Marketing: 12/15 • Équipe Vente: 8/15 • Global: 11/15"
    },
    {
      title: "Gestion des Salariés",
      description: "Interface simple pour ajouter et gérer vos collaborateurs",
      icon: UserPlus,
      mockup: "Ajouter un collaborateur • Gérer les équipes • Voir les profils"
    },
    {
      title: "Alertes RPS",
      description: "Détection automatique des signaux faibles et alertes préventives",
      icon: AlertTriangle,
      mockup: "🔴 Alerte stress élevé détectée dans l'équipe Support"
    },
    {
      title: "Export DUERP",
      description: "Génération automatique des documents réglementaires",
      icon: Download,
      mockup: "Exporter DUERP • Rapport mensuel • Synthèse annuelle"
    }
  ];

  const pricing = [
    {
      type: "Box Physiques",
      price: "39,90 €",
      unit: "HT / box",
      features: ["Box thématiques", "Box événementielles", "Produits français", "Personnalisation"]
    },
    {
      type: "Licence SaaS Entreprise",
      price: "3 000 €",
      unit: "/an",
      features: ["Dashboard RH complet", "Alertes RPS", "Export DUERP", "Support inclus"],
      popular: true
    },
    {
      type: "Box Premium Export",
      price: "49,90 - 89,90 €",
      unit: "HT",
      features: ["Export international", "Produits premium", "Packaging renforcé", "Douanes incluses"]
    }
  ];

  const testimonials = [
    {
      quote: "La licence QVT Box nous a permis de détecter des tensions avant qu'elles ne dégénèrent. Les alertes RPS sont un vrai plus pour notre prévention.",
      author: "Marie Dubois, DRH",
      company: "TechCorp (240 salariés)"
    },
    {
      quote: "Les box apportent du concret à nos actions QVT. Nos salariés voient que l'entreprise s'investit vraiment pour leur bien-être.",
      author: "Pierre Martin, Responsable CSE",
      company: "IndustrieXX (450 salariés)"
    },
    {
      quote: "Une solution complète qui combine prévention et action. Le ROI est mesurable et l'impact sur nos équipes est immédiat.",
      author: "Sophie Laurent, Dirigeante",
      company: "Services+ (85 salariés)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/10" ref={heroRef}>
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto scroll-reveal ${heroVisible ? 'visible' : ''}`}>
            <div className="mb-8">
              <img 
                src="https://2d181cb9-4143-4c90-9e92-77eb836ddc8b.lovableproject.com/logo-qvt.jpeg" 
                alt="QVT Box Logo"
                className="w-20 h-20 mx-auto mb-6 rounded-full shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                <span className="text-primary">QVT Box</span>
                <br />
                <span className="text-lg md:text-2xl lg:text-3xl font-normal text-foreground/80 mt-4 block">
                  {t('hero.tagline')}
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/contact" className="btn-primary">
                <Phone className="w-5 h-5 mr-2" />
                {t('hero.cta.quote')}
              </Link>
              <Link to="/contact" className="btn-outline">
                {t('hero.cta.callback')}
              </Link>
            </div>

            {/* Hero visuel spectaculaire */}
            <div className="relative max-w-6xl mx-auto">
              {/* Image principale avec effet parallax */}
              <div className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-floating group">
                <img 
                  src={heroImage} 
                  alt="Équipe professionnelle QVT Box - Solutions de bien-être au travail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay gradient dynamique */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Éléments flottants animés */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-32 right-24 w-6 h-6 bg-secondary/60 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute bottom-24 left-1/3 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-primary/40 rounded-full animate-bounce delay-300"></div>
                
                {/* Badge flottant de qualité */}
                <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-foreground text-sm">100% Made in France</span>
                  </div>
                </div>
                
                {/* Carte d'information principale */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">3 000+</div>
                      <div className="text-sm text-foreground/70">Entreprises accompagnées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                      <div className="text-sm text-foreground/70">Pays desservis</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">95%</div>
                      <div className="text-sm text-foreground/70">Satisfaction client</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Solutions QVT Complètes & Mesurables
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      De la box française artisanale au tableau de bord RH, 
                      nous transformons concrètement le bien-être de vos équipes.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Éléments décoratifs autour */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Offre - 3 Familles */}
      <section className="py-20 px-6 bg-background" ref={offerRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              {t('offer.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              {t('offer.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {offers.map((offer, index) => {
              const IconComponent = offer.icon;
              return (
                <Card key={index} className={`card-professional p-8 text-center hover:shadow-floating transition-all duration-300 stagger-item ${offerVisible.has(index) ? 'visible' : ''}`}>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 bg-${offer.color}/10 rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 text-${offer.color}`} />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-foreground">{offer.title}</h3>
                    <Badge variant="outline" className="text-xs">{offer.subtitle}</Badge>
                    <p className="text-foreground/70 text-sm leading-relaxed font-lato">{offer.description}</p>
                    <div className="space-y-2">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-foreground/60">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparatif Physique vs Phygital */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 font-inter">Physique Only vs Phygital</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <h4 className="font-semibold text-lg text-orange-600">Physique Only</h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>• Box thématiques et événementielles</li>
                    <li>• Produits français artisanaux</li>
                    <li>• Soutien ponctuel visible</li>
                    <li>• Pas de suivi des impacts</li>
                  </ul>
                  <div className="text-primary font-bold">À partir de 39,90 € HT</div>
                </CardContent>
              </Card>
              <Card className="p-6 border-2 border-primary">
                <CardContent className="space-y-4">
                  <h4 className="font-semibold text-lg text-primary">Phygital (Recommandé)</h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>• Licence SaaS entreprise incluse</li>
                    <li>• Prévention RPS et alertes</li>
                    <li>• Tableaux de bord personnalisés</li>
                    <li>• Impact mesurable et suivi</li>
                  </ul>
                  <div className="text-primary font-bold">{t('pricing.saas.note')}</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-6">
              <p className="text-sm text-foreground/60 font-semibold">
                {t('offer.saas.warning')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Démo Licence Entreprise */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 to-primary/5" ref={demoRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${demoVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Licence Entreprise – <span className="text-secondary">Démo</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato mb-8 leading-relaxed">
              Chaque entreprise dispose de son propre espace sécurisé. Les RH peuvent ajouter leurs salariés, 
              suivre les indicateurs QVT et recevoir des alertes. 
              <span className="text-primary font-semibold"> QVT Box ne vend pas l'application aux particuliers.</span>
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-8">
              {demoFeatures.slice(0, 2).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="card-professional p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                          <p className="text-foreground/70 text-sm mb-3">{feature.description}</p>
                          <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm text-foreground/80">
                            {feature.mockup}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="space-y-8">
              {demoFeatures.slice(2, 4).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index + 2} className="card-professional p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                          <p className="text-foreground/70 text-sm mb-3">{feature.description}</p>
                          <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm text-foreground/80">
                            {feature.mockup}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-floating">
            <img 
              src={saasImage} 
              alt="Interface de la licence entreprise QVT Box" 
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 bg-white/90 p-4 rounded-lg">
              <p className="font-semibold text-sm text-foreground">
                Interface réelle de la licence entreprise
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recevoir une démo de la licence
            </Link>
          </div>
        </div>
      </section>

      {/* Nos Box Exceptionnelles */}
      <BoxCatalog />

      {/* Tarifs Indicatifs */}
      <section className="py-20 px-6 bg-background" ref={pricingRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              {t('pricing.subtitle')}
            </p>
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto mt-8">
              <p className="text-red-800 font-semibold text-lg">
                💡 Important : La licence SaaS (3 000 € /an) est SANS box
              </p>
              <p className="text-red-700 text-sm mt-2">
                Le coût des box est supplémentaire et facturé séparément selon vos besoins
              </p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card key={index} className={`card-professional p-8 text-center hover:shadow-floating transition-all duration-300 ${plan.popular ? 'border-2 border-primary' : ''} stagger-item ${pricingVisible.has(index) ? 'visible' : ''}`}>
                <CardContent className="space-y-6">
                  {plan.popular && (
                    <Badge className="bg-primary text-white">{t('pricing.recommended')}</Badge>
                  )}
                  <h3 className="font-inter font-bold text-xl text-foreground">{plan.type}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Euro className="w-5 h-5 text-primary mr-1" />
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    </div>
                    <p className="text-sm text-foreground/60">{plan.unit}</p>
                  </div>
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-foreground/70">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className={plan.popular ? "btn-primary w-full" : "btn-outline w-full"}>
                    Demander un devis
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-foreground/60 text-sm">
              Tous les prix sont personnalisables selon la taille de votre entreprise et vos besoins spécifiques.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-6 bg-background" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${testimonialsVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Ils nous font <span className="text-primary">confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`card-professional p-6 card-hover stagger-item ${testimonialsVisible.has(index) ? 'visible' : ''}`}>
                <CardContent className="space-y-4">
                  <p className="text-foreground/80 italic font-lato leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground font-inter">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-foreground/60 font-lato">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-primary" ref={ctaRef}>
        <div className={`container mx-auto text-center scroll-reveal-scale ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-6 font-inter">
            Prêt à transformer votre QVCT ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato leading-relaxed">
            Rejoignez les entreprises qui font de la qualité de vie au travail un véritable levier de performance. 
            Contactez-nous pour un devis personnalisé ou une démonstration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter">
                <Phone className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter">
                <BarChart3 className="w-5 h-5 mr-2" />
                Recevoir une démo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewIndex;