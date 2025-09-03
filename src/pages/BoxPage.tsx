import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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
  Gift
} from "lucide-react";
import qvtBoxImage from "@/assets/qvt-box-products.jpg";
import professionalTeam from "@/assets/professional-team-meeting.jpg";

const BoxPage = () => {
  const thematicBoxes = [
    {
      name: "Box Focus & Performance",
      description: "Solutions pour améliorer la concentration et réduire le stress professionnel",
      price: "À partir de 45€",
      contents: ["Produits ergonomiques français", "Guide ANACT bien-être", "Outils anti-stress certifiés", "Accompagnement personnalisé"],
      color: "primary",
      icon: Shield,
      compliance: "Conforme aux recommandations INRS"
    },
    {
      name: "Box Mobilité & Ergonomie",
      description: "Prévention des TMS et amélioration des conditions de travail",
      price: "À partir de 55€",
      contents: ["Accessoires ergonomiques", "Programme d'exercices validé", "Conseils posturaux INRS", "Suivi personnalisé"],
      color: "secondary",
      icon: Wrench,
      compliance: "Validé par des kinésithérapeutes"
    },
    {
      name: "Box Pénibilité & Récupération",
      description: "Solutions pour soulager la pénibilité physique au travail",
      price: "À partir de 65€",
      contents: ["Produits de récupération bio", "Protocoles de soulagement", "Guide prévention TMS", "Coaching bien-être"],
      color: "accent",
      icon: Heart,
      compliance: "Produits certifiés biologiques"
    },
    {
      name: "Box Cohésion & Reconnaissance",
      description: "Renforcement du lien social et valorisation des équipes",
      price: "À partir de 40€",
      contents: ["Activités team-building", "Outils de reconnaissance", "Guide management bienveillant", "Rituels d'équipe"],
      color: "secondary",
      icon: Award,
      compliance: "Basé sur les pratiques ANACT"
    }
  ];

  const eventBoxes = [
    {
      event: "Départ à la retraite",
      description: "Accompagnement bienveillant pour cette transition de vie",
      icon: Gift,
      customization: "Personnalisable selon les goûts et l'histoire professionnelle"
    },
    {
      event: "Naissance / Adoption",
      description: "Félicitations et soutien pour les nouveaux parents",
      icon: Heart,
      customization: "Produits pour bébé français et conseils parentalité"
    },
    {
      event: "Promotion / Évolution",
      description: "Reconnaissance des efforts et accompagnement du changement",
      icon: Award,
      customization: "Adapté au nouveau poste et aux défis à venir"
    },
    {
      event: "Anniversaire entreprise",
      description: "Célébration de l'ancienneté et fidélisation",
      icon: Calendar,
      customization: "Rétrospective personnalisée et cadeaux adaptés"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Diagnostic participatif",
      description: "Les salariés expriment leurs besoins via notre outil d'évaluation anonyme"
    },
    {
      step: "02", 
      title: "Co-construction des box",
      description: "Sélection collaborative des produits selon les priorités identifiées"
    },
    {
      step: "03",
      title: "Livraison et suivi",
      description: "Distribution sur site avec accompagnement et mesure d'impact"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-8 h-8 text-primary" />
                <Badge variant="outline">Solution QVT certifiée</Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
                Box <span className="text-primary">Thématiques & Événementielles</span>
              </h1>
              
              <div className="card-professional p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-lato mb-4">
                  <span className="text-primary font-medium">Nos box sont co-construites avec les salariés, 
                  conformément aux recommandations de l'ANACT sur la participation et le dialogue social.</span>
                </p>
                <p className="text-foreground/70 font-lato">
                  Une approche participative qui garantit l'adhésion des équipes et l'utilité immédiate 
                  des solutions proposées.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/boutique">
                  <Button className="btn-primary text-lg px-8 py-4 font-inter">
                    <Package className="w-5 h-5 mr-2" />
                    Commander une box adaptée
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="text-lg px-8 py-4 font-inter">
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Box Thématiques */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Box <span className="text-secondary">Thématiques</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Solutions ciblées pour répondre aux défis identifiés par les études DARES et INRS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {thematicBoxes.map((box, index) => {
              const IconComponent = box.icon;
              return (
                <Card key={index} className="card-professional overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-10 h-10 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {box.compliance}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-inter text-foreground">
                      {box.name}
                    </CardTitle>
                    <p className="text-foreground/70 font-lato">
                      {box.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-primary font-inter">
                        {box.price}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 font-inter">Contenu de la box :</h4>
                        <ul className="space-y-1">
                          {box.contents.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm font-lato">
                              <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full btn-outline">
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
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Box <span className="text-primary">Événementielles</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Marquer les moments importants de la vie professionnelle avec bienveillance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {eventBoxes.map((eventBox, index) => {
              const IconComponent = eventBox.icon;
              return (
                <Card key={index} className="card-professional p-6 text-center">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg font-inter">
                      {eventBox.event}
                    </h3>
                    <p className="text-sm text-foreground/70 font-lato">
                      {eventBox.description}
                    </p>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-primary font-medium font-lato">
                        {eventBox.customization}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processus participatif */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Un processus <span className="text-secondary">clair et participatif</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Conformément aux recommandations ANACT : participation, dialogue social et co-construction
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0 w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold font-inter">
                  {step.step}
                </div>
                
                <div className="flex-1 card-professional p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-inter">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 font-lato leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block">
                    <ArrowRight className="w-8 h-8 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src={professionalTeam} 
              alt="Équipe professionnelle en réunion QVT"
              className="rounded-lg shadow-floating object-cover w-full h-96"
            />
            
            <div className="space-y-6">
              <div className="card-professional p-8">
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
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-inter">
            Prêt à co-construire avec vos équipes ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato">
            Lancez une démarche participative alignée avec les recommandations ANACT 
            et offrez des solutions concrètes à vos collaborateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter">
                <Users className="w-5 h-5 mr-2" />
                Commencer l'évaluation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter">
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