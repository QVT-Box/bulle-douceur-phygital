import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CheckCircle, Package, Heart, Users, Zap, Shield, Gift, Star, Globe } from "lucide-react";

const BoxCatalog = () => {
  const [catalogRef, catalogVisible] = useScrollReveal();

  const thematicBoxes = [
    {
      name: "Focus & Reset",
      price: "29,90 €",
      description: "Concentration, gestion du stress et clarté mentale",
      image: "/public/products-hygiene.jpg",
      contents: [
        "Carnet & stylo éco-conçu",
        "Tisane bio relax premium",
        "Balle anti-stress naturelle", 
        "Spray anti-fatigue aux huiles essentielles",
        "Carte rituel focus personnalisée"
      ],
      benefits: ["Améliore la concentration", "Réduit le stress", "Favorise la détente"],
      madeInFrance: true,
      customizable: true
    },
    {
      name: "Mobilité & Terrain",
      price: "34,90 €",
      description: "Soutien pour les salariés nomades et terrain",
      image: "/public/products-alimentaire.jpg",
      contents: [
        "Gourde/mug isotherme français",
        "Lingettes biodégradables",
        "Snack sain et énergétique",
        "Crème mains protection",
        "Carte pause mobilité"
      ],
      benefits: ["Confort en déplacement", "Hydratation optimale", "Protection cutanée"],
      madeInFrance: true,
      customizable: true
    },
    {
      name: "Pénibilité & Récupération",
      price: "34,90 €",
      description: "Récupération après effort et soulagement",
      image: "/public/products-cosmetique.jpg",
      contents: [
        "Patch chauffant naturel",
        "Crème articulations & muscles",
        "Infusion détente bio",
        "Balle de massage ergonomique",
        "Carte rituel récupération"
      ],
      benefits: ["Soulage les tensions", "Améliore la récupération", "Détente musculaire"],
      madeInFrance: true,
      customizable: true
    },
    {
      name: "Cohésion & Reconnaissance",
      price: "89,90 €",
      description: "Créer du lien d'équipe et valoriser",
      image: "/public/surprise.jpg",
      contents: [
        "Mini-jeu collaboratif français",
        "Friandises locales artisanales",
        "Carnet Merci/Bravo personnalisé",
        "Goodies ludiques éco-responsables",
        "Carte rituel cohésion d'équipe"
      ],
      benefits: ["Renforce la cohésion", "Valorise les réussites", "Améliore l'ambiance"],
      madeInFrance: true,
      customizable: true,
      premium: true
    }
  ];

  const eventBoxes = [
    {
      name: "Box Retraite",
      price: "59,90 €",
      description: "Célébrer une carrière et souhaiter le meilleur",
      image: "/public/surprise.jpg",
      contents: [
        "Livre d'or personnalisé",
        "Produits artisanaux français",
        "Carte de remerciements",
        "Cadeau souvenir gravé",
        "Coffret présentation premium"
      ]
    },
    {
      name: "Box Naissance",
      price: "49,90 €",
      description: "Partager la joie d'une nouvelle vie",
      image: "/public/surprise.jpg",
      contents: [
        "Produits bio pour bébé",
        "Carte félicitations",
        "Cadeau symbolique",
        "Douceurs pour les parents"
      ]
    },
    {
      name: "Box Anniversaire",
      price: "39,90 €",
      description: "Marquer une date importante",
      image: "/public/surprise.jpg",
      contents: [
        "Friandises artisanales",
        "Carte personnalisée",
        "Petit cadeau surprise",
        "Emballage festif"
      ]
    },
    {
      name: "Box Promotion/Réussite",
      price: "49,90 €",
      description: "Célébrer les succès et évolutions",
      image: "/public/surprise.jpg",
      contents: [
        "Accessoire professionnel",
        "Produits de bien-être",
        "Carte de félicitations",
        "Symbole de réussite"
      ]
    },
    {
      name: "Box Mariage/Événement",
      price: "59,90 €",
      description: "Partager les moments de bonheur",
      image: "/public/surprise.jpg",
      contents: [
        "Produits raffinés français",
        "Carte personnalisée",
        "Cadeau mémorable",
        "Présentation élégante"
      ]
    }
  ];

  const customizationOptions = [
    {
      title: "Personnalisation Complète",
      description: "Logo entreprise, couleurs, message personnalisé",
      icon: Star
    },
    {
      title: "Produits Locaux",
      description: "Sélection de producteurs de votre région",
      icon: Globe
    },
    {
      title: "Quantités Flexibles",
      description: "De 10 à 1000+ box selon vos besoins",
      icon: Package
    },
    {
      title: "Livraison Internationale",
      description: "Expédition partout dans le monde",
      icon: Globe
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/10" ref={catalogRef}>
      <div className="container mx-auto">
        <div className={`text-center mb-16 scroll-reveal ${catalogVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
            Nos <span className="text-primary">Box Exceptionnelles</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato mb-8 leading-relaxed">
            Offrez à vos équipes un cadeau exceptionnel : une box française expédiée directement dans votre entreprise.
            Conçues pour marquer les moments importants, une à deux fois par an.
          </p>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-lg font-semibold text-foreground">
              🇫🇷 100% Made in France • Artisanat Local • Impact Mesurable
            </p>
          </div>
        </div>

        {/* Box Thématiques */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter">
            Box <span className="text-primary">Thématiques</span>
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {thematicBoxes.map((box, index) => (
              <Card key={index} className="card-professional overflow-hidden hover:shadow-floating transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={box.image} 
                    alt={`Box ${box.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {box.madeInFrance && (
                      <Badge className="bg-primary text-white">Made in France</Badge>
                    )}
                    {box.customizable && (
                      <Badge variant="outline" className="bg-white/90">Personnalisable</Badge>
                    )}
                    {box.premium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">Premium</Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-xl font-bold text-white mb-1">{box.name}</h4>
                    <p className="text-white/80 text-sm">{box.description}</p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/90 px-3 py-1 rounded-full">
                      <span className="font-bold text-primary">{box.price}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-foreground">Contenu de la box :</h5>
                    <div className="grid gap-2">
                      {box.contents.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-foreground">Bénéfices :</h5>
                    <div className="flex flex-wrap gap-2">
                      {box.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Link to="/contact">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Demander un devis pour cette box
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Box Événementielles */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter">
            Box <span className="text-secondary">Événementielles</span>
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {eventBoxes.map((box, index) => (
              <Card key={index} className="card-professional text-center hover:shadow-floating transition-all duration-300 group">
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={box.image} 
                    alt={`${box.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-white/90 px-2 py-1 rounded">
                      <span className="font-bold text-secondary text-sm">{box.price}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg text-foreground mb-2">{box.name}</h4>
                  <p className="text-foreground/70 text-sm mb-4">{box.description}</p>
                  
                  <div className="mb-4">
                    <div className="grid gap-1">
                      {box.contents.map((item, idx) => (
                        <div key={idx} className="flex items-center text-xs text-foreground/60">
                          <Gift className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white">
                      Commander cette box
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Options de Personnalisation */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter">
            Options de <span className="text-primary">Personnalisation</span>
          </h3>
          
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {customizationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{option.title}</h4>
                    <p className="text-foreground/70 text-sm">{option.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-bold text-foreground mb-4">
              Cadeau Exceptionnel International
            </h4>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
              Offrez l'excellence française à vos équipes internationales. 
              Nos box sont expédiées dans le monde entier avec le même niveau de qualité et d'attention.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg">
                <Globe className="w-5 h-5 mr-2" />
                Demander un devis international
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxCatalog;