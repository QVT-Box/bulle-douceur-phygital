import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SpectacularHero from "@/components/SpectacularHero";
import ValuesMindMap from "@/components/ValuesMindMap";
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
  ArrowRight,
  Smartphone,
  Gift,
  Heart
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
      quote: "L'app a détecté que notre équipe était stressée après une réorganisation. On a immédiatement envoyé une box bien-être personnalisée. L'impact a été immédiat !",
      author: "Marie Dubois, DRH",
      company: "TechCorp (240 salariés)"
    },
    {
      quote: "Grâce au duo Box + App, on anticipe les besoins et on agit concrètement. Nos salariés se sentent écoutés ET soutenus financièrement.",
      author: "Pierre Martin, CSE",
      company: "IndustrieXX (450 salariés)"
    },
    {
      quote: "Enfin une solution qui ne se contente pas de mesurer, mais qui apporte un vrai soutien. Le pouvoir d'achat + le suivi, c'est parfait !",
      author: "Sophie Laurent, Dirigeante",
      company: "Services+ (85 salariés)"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero spectaculaire */}
      <SpectacularHero />
      
      {/* Section Comment ça marche */}
      <section className="py-20 px-6 bg-gradient-to-br from-background to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-lato">
              Une solution complète qui combine surveillance du bien-être et soutien concret
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow card-professional">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-inter">1. L'App prend des nouvelles</h3>
                <p className="text-muted-foreground font-lato">
                  Mood tracking, alertes RPS, suivi du bien-être en temps réel pour détecter les besoins de vos équipes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow card-professional">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-inter">2. La Box apporte le soutien</h3>
                <p className="text-muted-foreground font-lato">
                  Pouvoir d'achat personnalisé, produits locaux, soutien financier concret adapté aux besoins détectés.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow card-professional">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-inter">3. Impact mesurable</h3>
                <p className="text-muted-foreground font-lato">
                  Les deux solutions se complètent pour un impact durable et mesurable sur la QVT.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Pourquoi les deux ensemble */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Pourquoi les deux ensemble ?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 text-center card-professional">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-red-600 font-inter">L'app seule</h3>
                <p className="text-muted-foreground font-lato">
                  Détecte les besoins et les problèmes, mais ne les satisfait pas concrètement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center card-professional">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-orange-600 font-inter">La box seule</h3>
                <p className="text-muted-foreground font-lato">
                  Apporte du soutien ponctuel, mais sans suivi ni personnalisation basée sur les données.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center border-2 border-primary card-professional">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary font-inter">Ensemble</h3>
                <p className="text-muted-foreground font-lato">
                  <strong>Solution complète et mesurable :</strong> détection des besoins + soutien personnalisé + suivi d'impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <ValuesMindMap />

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
              <Card key={index} className={`card-professional text-center p-6 card-hover stagger-item ${statsVisible.has(index) ? 'visible' : ''}`}>
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
                <Card key={index} className={`card-professional p-6 text-center hover:shadow-floating transition-all duration-300 card-hover stagger-item ${piersVisible.has(index) ? 'visible' : ''}`}>
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

      {/* Solutions */}
      <section className="py-20 px-6 section-professional" ref={solutionsRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${solutionsVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Nos <span className="text-secondary">Solutions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`card-professional p-8 text-center card-hover stagger-item ${solutionsVisible.has(0) ? 'visible' : ''}`}>
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

            <Card className={`card-professional p-8 text-center card-hover stagger-item ${solutionsVisible.has(1) ? 'visible' : ''}`}>
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

            <Card className={`card-professional p-8 text-center card-hover stagger-item ${solutionsVisible.has(2) ? 'visible' : ''}`}>
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