import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { AdvancedProductFilters } from "@/components/AdvancedProductFilters";
import { AssistantChatBot } from "@/components/AssistantChatBot";
import { useState as useAssistantState } from 'react';
import { 
  MapPin, 
  Leaf, 
  Award, 
  ShoppingBag,
  Search,
  Filter,
  Star,
  CheckCircle,
  Truck,
  ArrowRight
} from "lucide-react";
import localProducts from "@/assets/local-products-boutique.jpg";

const BoutiquePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isChatBotOpen, setIsChatBotOpen] = useAssistantState(false);
  
  const [heroRef, heroVisible] = useScrollReveal();
  const [productsRef, productsVisible] = useStaggeredReveal(6, 150);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const categories = [
    { id: "all", name: "Tous les produits", icon: ShoppingBag },
    { id: "bien-etre", name: "Bien-être", icon: Leaf },
    { id: "ergonomie", name: "Ergonomie", icon: CheckCircle },
    { id: "energie", name: "Énergie", icon: Star },
    { id: "local", name: "Terroir Local", icon: MapPin }
  ];

  const products = [
    {
      id: 1,
      name: "Huile Essentielle Lavande Bio",
      price: "24€",
      category: "bien-etre",
      origin: "Provence, France",
      producer: "Distillerie des Alpilles",
      rating: 4.8,
      reviews: 127,
      image: "/api/placeholder/300/200",
      labels: ["Bio", "Made in France", "Artisanal"],
      description: "Huile essentielle pure de lavande fine AOP, récoltée à la main dans les champs de Provence."
    },
    {
      id: 2,
      name: "Coussin Ergonomique Lombaire",
      price: "45€",
      category: "ergonomie",
      origin: "Normandie, France",
      producer: "Ergofrance",
      rating: 4.6,
      reviews: 89,
      image: "/api/placeholder/300/200",
      labels: ["Ergonomique", "Testé cliniquement", "Garantie 2 ans"],
      description: "Support lombaire conçu par des kinésithérapeutes français, mousse à mémoire de forme."
    },
    {
      id: 3,
      name: "Tisane Énergisante Bio",
      price: "18€",
      category: "energie",
      origin: "Auvergne, France",
      producer: "Herboristerie du Puy",
      rating: 4.7,
      reviews: 203,
      image: "/api/placeholder/300/200",
      labels: ["Bio", "Plantes françaises", "Commerce équitable"],
      description: "Mélange de plantes tonifiantes cultivées dans le Massif Central, sans théine."
    },
    {
      id: 4,
      name: "Miel de Tilleul Artisanal",
      price: "16€",
      category: "local",
      origin: "Bourgogne, France",
      producer: "Rucher des Coteaux",
      rating: 4.9,
      reviews: 156,
      image: "/api/placeholder/300/200",
      labels: ["Artisanal", "Récolte 2024", "Apiculteur local"],
      description: "Miel crémeux aux notes florales délicates, récolté dans les forêts bourguignonnes."
    },
    {
      id: 5,
      name: "Balle Anti-stress Naturelle",
      price: "12€",
      category: "bien-etre",
      origin: "Nouvelle-Aquitaine, France",
      producer: "Ateliers Solidaires",
      rating: 4.4,
      reviews: 74,
      image: "/api/placeholder/300/200",
      labels: ["Éco-conçu", "Insertion sociale", "Matériaux naturels"],
      description: "Balle de relaxation en graines de lin bio, fabriquée par des ateliers d'insertion."
    },
    {
      id: 6,
      name: "Repose-pieds Ajustable",
      price: "38€",
      category: "ergonomie",
      origin: "Bretagne, France",
      producer: "Mobilier Pro Bretagne",
      rating: 4.5,
      reviews: 92,
      image: "/api/placeholder/300/200",
      labels: ["Ergonomique", "Bois français", "Réglable"],
      description: "Repose-pieds en hêtre massif français, hauteur et inclinaison ajustables."
    }
  ];

  const stats = [
    { value: "70%", label: "des Français veulent des entreprises locales", source: "ADEME 2023" },
    { value: "150+", label: "artisans partenaires", source: "Réseau QVT Box" },
    { value: "100%", label: "produits français", source: "Charte qualité" },
    { value: "48h", label: "livraison moyenne", source: "Circuits courts" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.producer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero" ref={heroRef}>
        <div className="container mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center scroll-reveal ${heroVisible ? 'visible' : ''}`}>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-8 h-8 text-secondary" />
                <Badge variant="outline">70% des Français favorables - ADEME</Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
                Boutique <span className="text-secondary">Locale</span>
              </h1>
              
              <div className="card-professional p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-lato mb-4">
                  <span className="text-secondary font-medium">Selon l'ADEME, 70% des Français veulent que leurs entreprises 
                  s'approvisionnent localement.</span>
                </p>
                <p className="text-foreground/70 font-lato">
                  Notre boutique sélectionne exclusivement des produits français, 
                  créés par des artisans de nos régions pour soutenir l'économie solidaire.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-secondary text-lg px-8 py-4 font-inter">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Découvrir le savoir-faire local
                </Button>
                <Link to="/engagements">
                  <Button variant="outline" className="text-lg px-8 py-4 font-inter">
                    Nos engagements éthiques
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img 
                src={localProducts} 
                alt="Produits artisanaux français"
                className="rounded-lg shadow-floating w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-professional text-center p-6">
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-secondary font-inter">
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

      {/* Filtres et Recherche */}
      <section className="py-8 px-6 section-professional">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit ou artisan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filtres Avancés */}
      <section className="py-8 px-6 bg-background-soft">
        <div className="container mx-auto">
          <AdvancedProductFilters 
            onFiltersChange={(filters) => console.log('Filters:', filters)}
            productCount={filteredProducts.length}
          />
        </div>
      </section>

      {/* Produits */}
      <section className="py-12 px-6 bg-background" ref={productsRef}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className={`card-professional overflow-hidden group hover:shadow-floating transition-all duration-300 card-hover stagger-item ${productsVisible.has(product.id - 1) ? 'visible' : ''}`}>
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.labels.slice(0, 2).map((label, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 font-inter">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground/70 font-lato">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews} avis)
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary font-inter">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-secondary">
                        <MapPin className="w-3 h-3" />
                        {product.origin}
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 font-lato">
                      Par {product.producer}
                    </p>
                    
                    <Button className="w-full btn-outline group-hover:btn-primary transition-all button-hover">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Nos <span className="text-secondary">Engagements Éthiques</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-professional p-8 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">100% Local</h3>
                <p className="text-foreground/70 font-lato">
                  Tous nos produits sont fabriqués en France par des artisans sélectionnés 
                  pour leur savoir-faire et leurs pratiques éthiques.
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional p-8 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">Éco-responsable</h3>
                <p className="text-foreground/70 font-lato">
                  Priorité aux circuits courts, emballages recyclables et producteurs 
                  engagés dans des démarches environnementales.
                </p>
              </CardContent>
            </Card>

            <Card className="card-professional p-8 text-center">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold font-inter">Qualité Garantie</h3>
                <p className="text-foreground/70 font-lato">
                  Sélection rigoureuse, certifications officielles et engagement 
                  qualité sur tous nos produits partenaires.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Livraison */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <Card className="card-professional p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-inter">
                  <Truck className="inline w-6 h-6 mr-2 text-secondary" />
                  Livraison Responsable
                </h3>
                <p className="text-foreground/70 font-lato mb-4">
                  Nos partenaires logistiques privilégient les circuits courts et les modes 
                  de transport décarbonés pour réduire l'impact environnemental.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-lato">Livraison 48h en moyenne</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-lato">Emballages recyclables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-lato">Transporteurs engagés</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">Gratuit</div>
                <p className="text-foreground/70 font-lato">
                  Livraison offerte dès 50€ d'achat
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-secondary" ref={ctaRef}>
        <div className={`container mx-auto text-center scroll-reveal-scale ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-6 font-inter">
            Soutenons ensemble l'économie locale
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato">
            Chaque achat contribue au développement des territoires français 
            et au maintien des savoir-faire artisanaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-inter button-hover">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Commencer mes achats
            </Button>
            <Link to="/box">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary font-inter button-hover">
                Découvrir nos Box
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Assistant ChatBot */}
      <AssistantChatBot 
        isOpen={isChatBotOpen} 
        onToggle={() => setIsChatBotOpen(!isChatBotOpen)} 
      />
    </div>
  );
};

export default BoutiquePage;