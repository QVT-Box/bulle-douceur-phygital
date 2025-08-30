import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BoutiquePage = () => {
  const categories = [
    {
      name: "🌿 Bien-être",
      products: [
        { name: "Huiles essentielles bio", price: "24€", origin: "Grasse, Provence" },
        { name: "Tisanes détox artisanales", price: "18€", origin: "Vallée de la Loire" },
        { name: "Savons au lait d'ânesse", price: "12€", origin: "Périgord" },
        { name: "Baume apaisant CBD", price: "35€", origin: "Normandie" }
      ]
    },
    {
      name: "💺 Ergonomie",
      products: [
        { name: "Coussin lombaire en lin", price: "45€", origin: "Nord-Pas-de-Calais" },
        { name: "Repose-pieds ajustable", price: "65€", origin: "Jura" },
        { name: "Support écran bambou", price: "89€", origin: "Vosges" },
        { name: "Tapis anti-fatigue", price: "55€", origin: "Bretagne" }
      ]
    },
    {
      name: "⚡ Énergie",
      products: [
        { name: "Thés énergisants bio", price: "22€", origin: "Alsace" },
        { name: "Miel de montagne", price: "16€", origin: "Alpes" },
        { name: "Granola artisanal", price: "14€", origin: "Auvergne" },
        { name: "Chocolat noir 85%", price: "8€", origin: "Bayonne" }
      ]
    },
    {
      name: "🏠 Local",
      products: [
        { name: "Carnet en papier recyclé", price: "15€", origin: "Vercors" },
        { name: "Mug en grès émaillé", price: "28€", origin: "Bourgogne" },
        { name: "Plaid en laine mérinos", price: "95€", origin: "Lozère" },
        { name: "Bougie cire d'abeille", price: "20€", origin: "Aveyron" }
      ]
    }
  ];

  const artisans = [
    {
      name: "Marie & Jean Dubois",
      craft: "Maîtres savonniers",
      region: "Périgord",
      description: "Fabrication traditionnelle de savons au lait d'ânesse depuis 3 générations"
    },
    {
      name: "Atelier des Senteurs",
      craft: "Distillateurs d'huiles",
      region: "Grasse",
      description: "Distillation artisanale d'huiles essentielles depuis 1952"
    },
    {
      name: "Les Tisanes de Léa",
      craft: "Herboriste",
      region: "Loire",
      description: "Cueillette sauvage et mélanges sur mesure pour le bien-être"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              La <span className="text-accent">Boutique</span> du cœur
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
              Produits artisanaux français sélectionnés avec amour pour votre bien-être. 
              Chaque achat soutient nos artisans locaux et leur savoir-faire authentique.
            </p>
            <Badge className="bg-gradient-accent text-white text-lg px-6 py-2">
              🇫🇷 100% Made in France
            </Badge>
          </div>

          {/* Products by Category */}
          <section className="mb-20">
            {categories.map((category, index) => (
              <div key={index} className="mb-16">
                <h2 className="text-2xl font-kalam font-bold text-foreground mb-8">
                  {category.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, i) => (
                    <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                      <CardHeader>
                        <CardTitle className="text-foreground font-kalam text-lg">
                          {product.name}
                        </CardTitle>
                        <div className="flex justify-between items-center">
                          <span className="text-accent font-bold text-xl">{product.price}</span>
                          <Badge variant="secondary" className="text-xs">
                            {product.origin}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-gradient-accent hover:opacity-90 text-white">
                          Ajouter au panier
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Artisans Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-kalam font-bold text-center text-foreground mb-12">
              👨‍🎨 Nos Artisans Partenaires
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {artisans.map((artisan, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-foreground font-kalam">
                      {artisan.name}
                    </CardTitle>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-gradient-accent text-white">
                        {artisan.craft}
                      </Badge>
                      <span className="text-foreground/70 text-sm">{artisan.region}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 text-sm">{artisan.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center py-16 bg-white/5 rounded-3xl backdrop-blur-md">
              <h2 className="text-3xl font-kalam font-bold text-foreground mb-6">
                Nos Valeurs
              </h2>
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-semibold text-foreground mb-2">Écologique</h3>
                  <p className="text-sm text-foreground/70">Produits bio et respectueux</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-semibold text-foreground mb-2">Équitable</h3>
                  <p className="text-sm text-foreground/70">Commerce juste et local</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="font-semibold text-foreground mb-2">Authentique</h3>
                  <p className="text-sm text-foreground/70">Savoir-faire artisanal</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💝</div>
                  <h3 className="font-semibold text-foreground mb-2">Bienveillant</h3>
                  <p className="text-sm text-foreground/70">Sélection avec amour</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16">
            <h2 className="text-3xl font-kalam font-bold text-foreground mb-4">
              Prêt à découvrir nos trésors ?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Livraison gratuite dès 80€ d'achat. Emballage cadeau offert. 
              Satisfaction garantie ou remboursé.
            </p>
            <Button className="bg-gradient-accent hover:opacity-90 text-white font-medium px-8 py-3 text-lg">
              Accéder à la Boutique Complète
            </Button>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoutiquePage;