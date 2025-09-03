import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Shield, 
  Wifi, 
  Award, 
  MapPin, 
  BarChart3,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const EngagementsPage = () => {
  const engagements = [
    {
      title: "Soulager la pénibilité",
      description: "40% des salariés déclarent une pénibilité physique contraignante (DARES 2023)",
      details: "Des produits adaptés (ergonomie, récupération) pour réduire les troubles musculosquelettiques et améliorer les conditions de travail.",
      icon: Wrench,
      color: "text-secondary",
      stats: "40% des salariés concernés",
      source: "DARES 2023"
    },
    {
      title: "Prévenir les risques psychosociaux",
      description: "Les RPS touchent 1 salarié sur 3 selon l'INRS",
      details: "Alertes précoces, tableaux de bord anonymisés et outils conformes aux recommandations INRS et Santé Publique France.",
      icon: Shield,
      color: "text-primary",
      stats: "33% des salariés exposés",
      source: "INRS, Santé Publique France"
    },
    {
      title: "Respecter le droit à la déconnexion",
      description: "Obligation légale depuis la Loi Travail, renforcée par l'ANACT",
      details: "Outils bienveillants et charte de déconnexion pour préserver l'équilibre vie professionnelle/personnelle.",
      icon: Wifi,
      color: "text-accent-foreground",
      stats: "Obligation légale",
      source: "Loi Travail, ANACT"
    },
    {
      title: "Reconnaître et valoriser les salariés",
      description: "Seuls 15% des salariés se sentent vraiment reconnus (Gallup 2023)",
      details: "Gestes visibles et concrets pour améliorer l'engagement et la motivation des équipes.",
      icon: Award,
      color: "text-secondary",
      stats: "85% manquent de reconnaissance",
      source: "Gallup 2023"
    },
    {
      title: "Soutenir l'économie locale",
      description: "70% des Français veulent que leurs entreprises s'approvisionnent localement (ADEME)",
      details: "Produits 100% français, circuits courts et soutien aux artisans locaux pour une économie solidaire.",
      icon: MapPin,
      color: "text-primary",
      stats: "70% des Français favorables",
      source: "ADEME"
    }
  ];

  const impacts = [
    {
      title: "Réduction des arrêts maladie",
      value: "-25%",
      description: "Avec une approche préventive continue",
      icon: TrendingUp
    },
    {
      title: "Amélioration du climat social",
      value: "+40%",
      description: "Grâce à la participation des salariés",
      icon: CheckCircle
    },
    {
      title: "Conformité réglementaire",
      value: "100%",
      description: "Respect des obligations DUERP et RPS",
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
            Nos <span className="text-primary">Engagements</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato leading-relaxed">
            Des solutions fondées sur les dernières études et recommandations officielles 
            pour transformer les défis du travail en opportunités de bien-être.
          </p>
        </div>
      </section>

      {/* Engagements détaillés */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="space-y-12">
            {engagements.map((engagement, index) => {
              const IconComponent = engagement.icon;
              return (
                <Card key={index} className="card-professional overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Icône et titre */}
                      <div className="p-8 bg-primary/5 flex flex-col justify-center">
                        <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
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
                            Source: {engagement.source}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
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
        </div>
      </section>

      {/* Impacts mesurés */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Impacts <span className="text-secondary">mesurés</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              Les résultats concrets de nos engagements, basés sur le suivi de nos entreprises partenaires.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => {
              const IconComponent = impact.icon;
              return (
                <Card key={index} className="card-professional text-center p-8">
                  <CardContent className="space-y-4">
                    <IconComponent className="w-12 h-12 text-primary mx-auto" />
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

      {/* Méthodologie */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-inter">
              Une approche <span className="text-primary">scientifique</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="card-professional p-6">
                <h4 className="font-semibold mb-4 font-montserrat">Références institutionnelles</h4>
                <ul className="space-y-2 text-sm font-lato">
                  <li>• ANACT (Agence Nationale pour l'Amélioration des Conditions de Travail)</li>
                  <li>• DARES (Direction de l'Animation de la Recherche)</li>
                  <li>• INRS (Institut National de Recherche et de Sécurité)</li>
                  <li>• Santé Publique France</li>
                  <li>• ADEME (Agence de l'Environnement et de la Maîtrise de l'Énergie)</li>
                </ul>
              </Card>
              
              <Card className="card-professional p-6">
                <h4 className="font-semibold mb-4 font-montserrat">Études internationales</h4>
                <ul className="space-y-2 text-sm font-lato">
                  <li>• Gallup State of the Global Workplace 2023</li>
                  <li>• Eurostat - Conditions de travail en Europe</li>
                  <li>• OIT (Organisation Internationale du Travail)</li>
                  <li>• Eurofound - Enquêtes sur les conditions de travail</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-inter">
            Rejoignons le mouvement ensemble
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto font-lato">
            Transformez les défis de votre entreprise en opportunités de bien-être 
            et de performance collective.
          </p>
          <Link to="/box">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter">
              Devenir entreprise partenaire
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngagementsPage;