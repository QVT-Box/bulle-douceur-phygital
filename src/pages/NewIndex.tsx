import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SpectacularHero from "@/components/SpectacularHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { 
  Users, 
  Package, 
  Shield, 
  Award, 
  MapPin, 
  Handshake,
  TrendingUp,
  CheckCircle,
  BarChart3,
  FileCheck,
  ArrowRight
} from "lucide-react";

const NewIndex = () => {
  const [statsRef, statsVisible] = useStaggeredReveal(4, 200);
  const [piersRef, piersVisible] = useStaggeredReveal(4, 150);
  const [testimonialsRef, testimonialsVisible] = useStaggeredReveal(3, 200);
  const [solutionsRef, solutionsVisible] = useStaggeredReveal(3, 250);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const stats = [
    { value: "40%", label: "des salariés déclarent une pénibilité physique", source: "DARES 2023" },
    { value: "33%", label: "des salariés exposés aux RPS", source: "INRS" },
    { value: "15%", label: "seulement se sentent reconnus", source: "Gallup 2023" },
    { value: "70%", label: "veulent des entreprises locales", source: "ADEME" }
  ];

  const engagements = [
    {
      title: "Soulager",
      action: "la pénibilité",
      description: "Par des produits adaptés (ergonomie, récupération)",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Prévenir", 
      action: "les risques psychosociaux",
      description: "Grâce à des alertes simples et un suivi collectif",
      icon: Shield,
      color: "text-primary"
    },
    {
      title: "Respecter",
      action: "le droit à la déconnexion",
      description: "Avec des outils bienveillants",
      icon: Package,
      color: "text-accent-foreground"
    },
    {
      title: "Reconnaître",
      action: "et valoriser les salariés",
      description: "Par des gestes visibles et concrets",
      icon: Award,
      color: "text-secondary"
    }
  ];

  const testimonials = [
    {
      quote: "QVT Box nous aide à concrétiser notre politique de bien-être. Les salariés apprécient la démarche participative.",
      author: "Marie Dubois, DRH",
      company: "TechCorp (240 salariés)"
    },
    {
      quote: "L'outil SaaS nous permet de suivre les RPS de façon anonyme et conforme. Très utile pour le DUERP.",
      author: "Pierre Martin, CSE",
      company: "IndustrieXX (450 salariés)"
    },
    {
      quote: "Enfin une solution qui associe bien-être des équipes et soutien à l'économie locale !",
      author: "Sophie Laurent, Dirigeante",
      company: "Services+ (85 salariés)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero spectaculaire */}
      <SpectacularHero />

      {/* Chiffres clés */}
      <section className="py-16 px-6 bg-background" ref={statsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-12 scroll-reveal ${statsVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-3xl font-bold text-foreground mb-4 font-inter">
              Les réalités du <span className="text-primary">travail en France</span>
            </h2>
            <p className="text-lg text-foreground/70 font-lato">
              Données issues des dernières études officielles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className={`card-professional text-center p-6 card-hover stagger-item ${statsVisible.has(index + 1) ? 'visible' : ''}`}>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-primary font-inter">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground font-lato leading-tight">
                    {stat.label}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {stat.source}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 piliers avec visuels */}
      <section className="py-20 px-6 section-professional" ref={piersRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${piersVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Nos 4 <span className="text-secondary">Piliers</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              Une approche complète pour répondre aux défis identifiés par les études
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {engagements.map((engagement, index) => {
              const IconComponent = engagement.icon;
              return (
                <Card key={index} className={`card-professional p-6 text-center hover:shadow-floating transition-all duration-300 card-hover stagger-item ${piersVisible.has(index + 1) ? 'visible' : ''}`}>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className={`w-8 h-8 ${engagement.color}`} />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-xl text-foreground">
                      {engagement.title}
                    </h3>
                    <div className="text-primary font-medium text-sm uppercase tracking-wide">
                      {engagement.action}
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed font-lato">
                      {engagement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
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
              <Card key={index} className={`card-professional p-6 card-hover stagger-item ${testimonialsVisible.has(index + 1) ? 'visible' : ''}`}>
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

      {/* Solutions */}
      <section className="py-20 px-6 section-professional" ref={solutionsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${solutionsVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Nos <span className="text-secondary">Solutions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`card-professional p-8 text-center card-hover stagger-item ${solutionsVisible.has(1) ? 'visible' : ''}`}>
              <CardContent className="space-y-6">
                <Package className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold font-inter">Box QVT</h3>
                <p className="text-foreground/70 font-lato">
                  Box thématiques et événementielles co-construites avec vos équipes
                </p>
                <Link to="/box">
                  <Button className="btn-outline w-full button-hover">
                    En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className={`card-professional p-8 text-center card-hover stagger-item ${solutionsVisible.has(2) ? 'visible' : ''}`}>
              <CardContent className="space-y-6">
                <BarChart3 className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold font-inter">SaaS RH</h3>
                <p className="text-foreground/70 font-lato">
                  Prévention RPS, tableaux de bord anonymisés, export DUERP
                </p>
                <Link to="/saas">
                  <Button className="btn-outline w-full button-hover">
                    Demander une démo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className={`card-professional p-8 text-center card-hover stagger-item ${solutionsVisible.has(3) ? 'visible' : ''}`}>
              <CardContent className="space-y-6">
                <MapPin className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold font-inter">Boutique Locale</h3>
                <p className="text-foreground/70 font-lato">
                  Produits 100% français pour soutenir l'économie locale
                </p>
                <Link to="/boutique">
                  <Button className="btn-outline w-full button-hover">
                    Découvrir <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-primary" ref={ctaRef}>
        <div className={`container mx-auto text-center scroll-reveal-scale ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-6 font-inter">
            Transformons ensemble les défis en solutions
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato leading-relaxed">
            Rejoignez les entreprises qui font de la QVCT un levier de performance 
            et de dialogue social, avec des solutions concrètes et mesurables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/box">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter button-hover">
                <Handshake className="w-5 h-5 mr-2" />
                Devenir entreprise partenaire
              </Button>
            </Link>
            <Link to="/engagements">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter button-hover">
                Découvrir nos engagements
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