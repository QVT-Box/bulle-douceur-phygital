import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BoxPage = () => {
  const thematicBoxes = [
    {
      name: "Box Focus & Reset",
      description: "Retrouvez votre concentration avec des outils et techniques de bien-être",
      price: "49€",
      contents: ["Huiles essentielles bio", "Carnet de méditation", "Thé détox", "Guide pratique"],
      color: "primary"
    },
    {
      name: "Box Mobilité",
      description: "Prenez soin de votre corps avec des accessoires ergonomiques",
      price: "59€",
      contents: ["Coussin lombaire", "Exercices posturaux", "Balle anti-stress", "Étirements bureau"],
      color: "secondary"
    },
    {
      name: "Box Pénibilité",
      description: "Soulagez les tensions liées à votre environnement de travail",
      price: "69€",
      contents: ["Gel apaisant bio", "Compresses chaudes/froides", "Guide ergonomie", "Infusions relaxantes"],
      color: "accent"
    },
    {
      name: "Box Cohésion",
      description: "Renforcez les liens avec vos collègues grâce à des activités partagées",
      price: "79€",
      contents: ["Jeux d'équipe", "Activités créatives", "Goûter partagé", "Guide team-building"],
      color: "primary"
    }
  ];

  const eventBoxes = [
    {
      name: "Box Retraite",
      description: "Célébrez cette nouvelle étape avec élégance",
      price: "89€",
      occasion: "Départ en retraite"
    },
    {
      name: "Box Naissance",
      description: "Accueillez le nouveau membre de la famille",
      price: "65€",
      occasion: "Naissance"
    },
    {
      name: "Box Promotion",
      description: "Félicitez une belle évolution de carrière",
      price: "55€",
      occasion: "Promotion"
    },
    {
      name: "Box Mariage",
      description: "Célébrez l'union avec des produits raffinés",
      price: "75€",
      occasion: "Mariage"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Nos <span className="text-primary">Box Magiques</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Découvrez notre collection complète de box pensées pour le bien-être au travail. 
              Chaque box est soigneusement composée avec des produits français artisanaux.
            </p>
          </div>

          {/* Box Thématiques */}
          <section className="mb-20">
            <h2 className="text-3xl font-kalam font-bold text-center text-foreground mb-12">
              📦 Box Thématiques
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {thematicBoxes.map((box, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-foreground font-kalam text-xl">
                        {box.name}
                      </CardTitle>
                      <Badge className={`bg-gradient-${box.color} text-white`}>
                        {box.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-4">{box.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2">Contenu :</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        {box.contents.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className={`w-full bg-gradient-${box.color} hover:opacity-90 text-white`}>
                      Commander cette Box
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Box Événementielles */}
          <section className="mb-20">
            <h2 className="text-3xl font-kalam font-bold text-center text-foreground mb-12">
              🎉 Box Événementielles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventBoxes.map((box, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                  <CardHeader>
                    <CardTitle className="text-foreground font-kalam text-lg">
                      {box.name}
                    </CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {box.occasion}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 text-sm mb-4">{box.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-primary text-lg">{box.price}</span>
                    </div>
                    <Button variant="outline" className="w-full bg-white/20 border-white/30 text-foreground hover:bg-white/30">
                      Commander
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-white/5 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-kalam font-bold text-foreground mb-4">
              Une question sur nos Box ?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans le choix de la box parfaite 
              pour votre entreprise ou votre événement spécial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary hover:opacity-90 text-white">
                Demander un devis personnalisé
              </Button>
              <Button variant="outline" className="bg-white/20 border-white/30 text-foreground hover:bg-white/30">
                Nous contacter
              </Button>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoxPage;