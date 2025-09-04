import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";
import PillarsSection from "@/components/PillarsSection";
import BoxGallery from "@/components/BoxGallery";
import BoxEvaluationModal from "@/components/BoxEvaluationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Award, 
  Globe,
  Flag,
  Package,
  MessageCircle,
  Crown,
  CheckCircle
} from "lucide-react";
import boxImage from "@/assets/box-artisanal.jpg";
import productsImage from "@/assets/qvt-box-products.jpg";

const NewBoxPage = () => {
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [heroRef, heroVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();
  const { trackCTAClick } = useAnalytics();

  const handleEvaluateNeeds = () => {
    trackCTAClick('evaluer_besoins', '/box');
    setShowEvaluation(true);
  };

  const handleDemoClick = () => {
    trackCTAClick('demander_demo', '/box');
  };

  const handlePartnerClick = () => {
    trackCTAClick('devenir_partenaire', '/box');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="container mx-auto">
            <div 
              ref={heroRef}
              className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-kalam font-bold text-foreground mb-8">
                Trouvez votre <br />
                <span className="text-primary">Box QVT</span> en 2 minutes ✨
              </h1>
              
              <p className="text-2xl text-foreground/70 max-w-4xl mx-auto mb-8 leading-relaxed">
                Des solutions concrètes pour prendre soin de vous et de vos équipes, 
                en intégrant nos <strong>4 piliers du bien-être</strong>.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button 
                  size="lg"
                  onClick={handleEvaluateNeeds}
                  className="bg-gradient-accent hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Évaluer mes besoins
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  <Link to="/contact" onClick={handleDemoClick}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Demander une démo
                  </Link>
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  <Link to="/partenaires" onClick={handlePartnerClick}>
                    <Crown className="w-5 h-5 mr-2" />
                    Devenir partenaire
                  </Link>
                </Button>
              </div>

              {/* Visual Gallery */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                <div className="relative overflow-hidden rounded-2xl shadow-bubble group">
                  <img 
                    src={boxImage} 
                    alt="Box QVT artisanale avec produits naturels français" 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-kalam font-bold text-xl mb-2">Box Thématiques</h3>
                    <p className="text-sm opacity-90">Solutions ciblées pour chaque besoin</p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-2xl shadow-bubble group">
                  <img 
                    src={productsImage} 
                    alt="Produits QVT Box variés pour le bien-être en entreprise" 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-kalam font-bold text-xl mb-2">Produits Premium</h3>
                    <p className="text-sm opacity-90">Artisanat français & innovation</p>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Package, title: "Made in France", desc: "Produits artisanaux de qualité" },
                  { icon: Users, title: "Approche Collaborative", desc: "Co-création avec vos équipes" },
                  { icon: Award, title: "Conforme ANACT", desc: "Basé sur les recommandations officielles" },
                  { icon: CheckCircle, title: "Personnalisable", desc: "Adapté à vos besoins spécifiques" }
                ].map((benefit, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-floating transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-kalam font-bold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-foreground/70 text-sm">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="px-6 py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-kalam font-bold text-foreground mb-6">
                  Notre <span className="text-primary">Philosophie</span>
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Parce que les salariés ont besoin de moyens <strong>visibles et utiles</strong>, 
                  nos box apportent des réponses concrètes aux réalités du travail : fatigue, charge, 
                  cohésion, reconnaissance. Elles sont conçues pour être offertes par l'entreprise 
                  à ses collaborateurs comme <strong>preuves tangibles d'attention et de soutien</strong>.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <PillarsSection />

        {/* Box Gallery */}
        <BoxGallery />

        {/* Partner Section */}
        <section className="px-6 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
                Nos <span className="text-primary">Partenaires</span> Engagés
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Un réseau de producteurs et artisans sélectionnés pour leur qualité et leur engagement éthique.
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-kalam font-bold text-foreground">
                      Notre Engagement Éthique
                    </h3>
                  </div>
                  <p className="text-foreground/80 text-lg leading-relaxed">
                    Nos box privilégient le <strong>Made in France</strong> et les producteurs locaux. 
                    Nous sélectionnons aussi des produits issus de pays de l'OCDE, garantissant 
                    qualité, respect des normes sociales et environnementales, et cohérence avec notre démarche éthique.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Flag className="w-8 h-8 text-blue-500" />
                    </div>
                    <h4 className="font-kalam font-bold text-foreground mb-2">🇫🇷 France Prioritaire</h4>
                    <p className="text-foreground/70 text-sm">Artisans et producteurs français en première ligne</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="font-kalam font-bold text-foreground mb-2">🇪🇺 Europe & OCDE</h4>
                    <p className="text-foreground/70 text-sm">Sélection rigoureuse selon nos critères éthiques</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-purple-500" />
                    </div>
                    <h4 className="font-kalam font-bold text-foreground mb-2">Qualité Garantie</h4>
                    <p className="text-foreground/70 text-sm">Respect des normes sociales et environnementales</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    asChild
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link to="/partenaires" onClick={handlePartnerClick}>
                      <Crown className="w-4 h-4 mr-2" />
                      Rejoindre notre réseau de partenaires
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Content Types */}
        <section className="px-6 py-16 bg-gradient-to-r from-secondary/5 to-accent/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-kalam font-bold text-foreground mb-6">
                Contenus <span className="text-secondary">Variés</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Chaque box combine produits physiques, contenus digitaux et expériences pour une approche complète du bien-être.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-floating transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-kalam font-bold text-foreground mb-4">Produits Physiques</h3>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li>• Bien-être & relaxation</li>
                    <li>• Ergonomie & confort</li>
                    <li>• Papeterie créative</li>
                    <li>• Cosmétiques naturels</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-floating transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-kalam font-bold text-foreground mb-4">Produits Virtuels</h3>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li>• Sessions de coaching</li>
                    <li>• Playlists musicales</li>
                    <li>• E-books & guides</li>
                    <li>• Podcasts inspirants</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-floating transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-kalam font-bold text-foreground mb-4">Événementiel</h3>
                  <ul className="space-y-2 text-foreground/70 text-sm">
                    <li>• Ateliers en ligne</li>
                    <li>• Conférences bien-être</li>
                    <li>• Expériences partagées</li>
                    <li>• Team building virtuel</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20">
          <div className="container mx-auto">
            <div 
              ref={ctaRef}
              className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${
                ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md border-white/20 p-12">
                <h2 className="text-4xl font-kalam font-bold text-foreground mb-6">
                  Prêt à transformer votre <span className="text-primary">QVT</span> ?
                </h2>
                <p className="text-xl text-foreground/70 mb-8">
                  Commencez par évaluer vos besoins ou contactez-nous pour une démonstration personnalisée.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg"
                    onClick={handleEvaluateNeeds}
                    className="bg-gradient-accent hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Commencer l'évaluation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    <Link to="/contact" onClick={handleDemoClick}>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Demander une présentation
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Evaluation Modal */}
        <BoxEvaluationModal 
          isOpen={showEvaluation}
          onClose={() => setShowEvaluation(false)}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default NewBoxPage;