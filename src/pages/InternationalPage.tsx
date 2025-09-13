import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Globe, 
  Package, 
  Shield, 
  Award, 
  Plane,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Gift,
  Truck,
  Clock
} from "lucide-react";
import internationalHero from "@/assets/hero-spectacular-impact.jpg";
import boxImage from "@/assets/box-artisanal.jpg";
import worldMap from "@/assets/workplace-wellness.jpg";

const InternationalPage = () => {
  const { t } = useLanguage();
  const [heroRef, heroVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useStaggeredReveal(3, 200);
  const [benefitsRef, benefitsVisible] = useScrollReveal();
  const [processRef, processVisible] = useStaggeredReveal(4, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const internationalServices = [
    {
      title: "Box Premium International",
      description: "Des box exceptionnelles conçues spécifiquement pour l'export avec packaging renforcé",
      icon: Package,
      features: [
        "Emballage sécurisé pour l'international",
        "Produits français certifiés export",
        "Documentation douanière incluse",
        "Suivi de livraison mondial"
      ],
      price: "49,90 - 89,90 €",
      color: "primary"
    },
    {
      title: "Licence SaaS Globale",
      description: "Solution digitale déployable dans tous vos bureaux internationaux",
      icon: Globe,
      features: [
        "Interface multilingue",
        "Conformité RGPD internationale",
        "Support 24h/7j multi-fuseaux",
        "Rapports consolidés globaux"
      ],
      price: "Sur devis",
      color: "secondary"
    },
    {
      title: "Accompagnement Culturel",
      description: "Adaptation de nos solutions aux spécificités culturelles locales",
      icon: Users,
      features: [
        "Analyse des besoins locaux",
        "Personnalisation culturelle",
        "Formation équipes locales",
        "Support multilingue"
      ],
      price: "Inclus",
      color: "accent"
    }
  ];

  const deliveryZones = [
    {
      zone: "Europe",
      countries: "27 pays",
      delivery: "3-5 jours",
      customs: "Incluses",
      icon: "🇪🇺"
    },
    {
      zone: "Amérique du Nord",
      countries: "USA, Canada",
      delivery: "5-8 jours",
      customs: "Incluses",
      icon: "🇺🇸"
    },
    {
      zone: "Asie-Pacifique",
      countries: "Japon, Singapour, Australie",
      delivery: "7-12 jours",
      customs: "Incluses",
      icon: "🌏"
    },
    {
      zone: "Moyen-Orient & Afrique",
      countries: "Émirats, Maroc, Afrique du Sud",
      delivery: "8-15 jours",
      customs: "Incluses",
      icon: "🌍"
    }
  ];

  const internationalProcess = [
    {
      step: "01",
      title: "Consultation Globale",
      description: "Analyse de vos besoins multi-sites et définition de la stratégie QVT internationale",
      icon: Globe
    },
    {
      step: "02", 
      title: "Personnalisation Locale",
      description: "Adaptation des box et solutions aux spécificités culturelles de chaque pays",
      icon: Heart
    },
    {
      step: "03",
      title: "Logistique Mondiale",
      description: "Organisation des expéditions internationales avec gestion des douanes",
      icon: Truck
    },
    {
      step: "04",
      title: "Suivi & Support",
      description: "Accompagnement continu avec support multilingue et rapports consolidés",
      icon: Shield
    }
  ];

  const internationalTestimonials = [
    {
      quote: "Nos équipes de Londres, Berlin et Tokyo reçoivent désormais les mêmes attentions. La qualité française fait l'unanimité !",
      author: "Sarah Chen, Global HR Director",
      company: "TechCorp International (2,400 employés, 15 pays)",
      flag: "🌍"
    },
    {
      quote: "L'impact sur nos collaborateurs américains a été immédiat. Ils découvrent l'art de vivre français au bureau.",
      author: "Michael Rodriguez, VP Operations",
      company: "French-American Corp (800 employés, USA)",
      flag: "🇺🇸"
    },
    {
      quote: "La logistique est parfaite. Nos bureaux de Singapour et Sydney reçoivent leurs box en parfait état.",
      author: "Yuki Tanaka, Regional Manager",
      company: "Asian Solutions Ltd (1,200 employés, Asie)",
      flag: "🇸🇬"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6" ref={heroRef}>
        <div className="absolute inset-0">
          <img 
            src={internationalHero} 
            alt="QVT Box International - Équipes mondiales" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        <div className="relative container mx-auto text-center text-white">
          <div className={`max-w-5xl mx-auto scroll-reveal ${heroVisible ? 'visible' : ''}`}>
            <div className="mb-8">
              <Badge className="bg-white/20 text-white border-white/30 mb-6 px-6 py-2 text-lg">
                <Globe className="w-5 h-5 mr-2" />
                {t('international.subtitle')}
              </Badge>
              
              <h1 className="font-inter text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="block text-white">QVT Box</span>
                <span className="block text-primary text-3xl md:text-5xl lg:text-6xl mt-4">
                  International
                </span>
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-white/90">
              {t('international.hero.title')}
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-12 font-light max-w-4xl mx-auto leading-relaxed">
              {t('international.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
                <Plane className="w-6 h-6 mr-3" />
                Demander un devis international
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
                <Users className="w-6 h-6 mr-3" />
                Consultation gratuite
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-white/70 text-sm">Pays desservis</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/70 text-sm">Made in France</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-white/70 text-sm">Langues disponibles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">72h</div>
                <div className="text-white/70 text-sm">Délai moyen mondial</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Internationaux */}
      <section className="py-20 px-6 bg-background" ref={servicesRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Solutions <span className="text-primary">Internationales</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Des solutions QVT pensées pour vos équipes dispersées dans le monde entier
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {internationalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className={`card-professional p-8 hover:shadow-floating transition-all duration-300 stagger-item ${servicesVisible.has(index) ? 'visible' : ''}`}>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center mb-6">
                      <div className={`w-20 h-20 bg-${service.color}/10 rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-10 h-10 text-${service.color}`} />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-foreground text-center">{service.title}</h3>
                    <p className="text-foreground/70 text-center leading-relaxed font-lato">{service.description}</p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center pt-4 border-t border-border">
                      <div className="text-lg font-bold text-primary">{service.price}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zones de Livraison */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Livraison <span className="text-secondary">Mondiale</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              Nous livrons dans plus de 50 pays avec la même qualité et le même soin
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {deliveryZones.map((zone, index) => (
              <Card key={index} className="card-professional text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <div className="text-4xl mb-4">{zone.icon}</div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{zone.zone}</h3>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex items-center justify-between">
                      <span>Pays:</span>
                      <span className="font-semibold">{zone.countries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Livraison:</span>
                      <span className="font-semibold text-primary">{zone.delivery}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Douanes:</span>
                      <span className="font-semibold text-green-600">{zone.customs}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processus International */}
      <section className="py-20 px-6 bg-background" ref={processRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Notre <span className="text-primary">Processus</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              Un accompagnement sur-mesure pour déployer QVT Box à l'international
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {internationalProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className={`card-professional p-8 hover:shadow-lg transition-all duration-300 stagger-item ${processVisible.has(index) ? 'visible' : ''}`}>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-xs font-bold text-center text-primary">{step.step}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-foreground mb-3">{step.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages Internationaux */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/5" ref={testimonialsRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Témoignages <span className="text-primary">Mondiaux</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {internationalTestimonials.map((testimonial, index) => (
              <Card key={index} className={`card-professional p-6 text-center hover:shadow-lg transition-all duration-300 stagger-item ${testimonialsVisible.has(index) ? 'visible' : ''}`}>
                <CardContent className="space-y-4">
                  <div className="text-4xl mb-4">{testimonial.flag}</div>
                  <blockquote className="text-foreground/80 italic leading-relaxed mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-foreground/60">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white" ref={ctaRef}>
        <div className="container mx-auto text-center">
          <div className={`scroll-reveal ${ctaVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-inter">
              Prêt à Conquérir le Monde ?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-lato">
              Rejoignez les entreprises qui font confiance à QVT Box pour prendre soin 
              de leurs équipes internationales avec l'excellence française.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
                <Globe className="w-6 h-6 mr-3" />
                Démarrer votre projet international
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
                <Users className="w-6 h-6 mr-3" />
                Planifier une démo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalPage;