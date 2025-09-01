import React from 'react';
import Navigation from '@/components/Navigation';
import FloatingBubbles from '@/components/FloatingBubbles';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useProducts, useCategories } from '@/hooks/useProducts';

const BoutiquePage = () => {
  const { addItem, setIsOpen } = useCart();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Données statiques pour les artisans (à migrer en base plus tard)
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

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: `${product.price.toFixed(2)}€`,
      origin: product.origin || 'France',
      category: product.category?.name || 'Produit'
    });
    setIsOpen(true);
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <FloatingBubbles />
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <FloatingBubbles />
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-red-500">Erreur lors du chargement des produits</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <FloatingBubbles />
      <Navigation />
      
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              La Boutique du bien-être
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Produits artisanaux français sélectionnés avec amour pour votre bien-être. 
              Chaque achat soutient nos artisans locaux et leur savoir-faire authentique.
            </p>
            <Badge className="bg-primary/20 text-primary text-lg px-6 py-2">
              🇫🇷 100% Made in France
            </Badge>
          </div>

          {/* Products by Category */}
          {categories.map((category) => {
            const categoryProducts = products.filter(p => p.category_id === category.id);
            
            if (categoryProducts.length === 0) return null;
            
            return (
              <section key={category.id} className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                    <p className="text-lg text-muted-foreground">{category.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map((product) => (
                      <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0].image_url} 
                              alt={product.images[0].alt_text || product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                              🎁
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-white/90">
                              Artisanal
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <CardDescription className="text-primary/80">
                                {product.origin || 'France'}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {product.price.toFixed(2)}€
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {product.short_description && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {product.short_description}
                            </p>
                          )}
                          <Button 
                            className="w-full" 
                            onClick={() => handleAddToCart(product)}
                          >
                            Ajouter au panier
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          {/* Artisans Section */}
          <section className="py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">👨‍🎨 Nos Artisans Partenaires</h2>
              <p className="text-lg text-muted-foreground">
                Découvrez les créateurs passionnés derrière nos produits
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {artisans.map((artisan, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">{artisan.name}</CardTitle>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary">
                        {artisan.craft}
                      </Badge>
                      <span className="text-muted-foreground text-sm">{artisan.region}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{artisan.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20">
            <div className="text-center py-16 bg-muted/20 rounded-3xl">
              <h2 className="text-3xl font-bold mb-6">Nos Valeurs</h2>
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-semibold mb-2">Écologique</h3>
                  <p className="text-sm text-muted-foreground">Produits bio et respectueux</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-semibold mb-2">Équitable</h3>
                  <p className="text-sm text-muted-foreground">Commerce juste et local</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="font-semibold mb-2">Authentique</h3>
                  <p className="text-sm text-muted-foreground">Savoir-faire artisanal</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💝</div>
                  <h3 className="font-semibold mb-2">Bienveillant</h3>
                  <p className="text-sm text-muted-foreground">Sélection avec amour</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à découvrir nos trésors ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Livraison gratuite dès 80€ d'achat. Emballage cadeau offert. 
              Satisfaction garantie ou remboursé.
            </p>
            <Button 
              onClick={() => setIsOpen(true)}
              className="font-medium px-8 py-3 text-lg"
            >
              Voir mon panier
            </Button>
          </section>
        </div>
      </div>
      
      <CartSidebar />
      <Footer />
    </div>
  );
};

export default BoutiquePage;