import React from 'react';
import Navigation from '@/components/Navigation';
import FloatingBubbles from '@/components/FloatingBubbles';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import ProductSearch from '@/components/ProductSearch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useProductSearch, SearchFilters } from '@/hooks/useProductSearch';
import { useState } from 'react';

const BoutiquePage = () => {
  const { setIsOpen } = useCart();
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const { products: searchResults, loading: searchLoading } = useProductSearch(searchFilters);

  // Use search results if filters are applied, otherwise use all products
  const isSearching = Object.keys(searchFilters).length > 0 && 
    Object.values(searchFilters).some(v => v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true));
  const displayProducts = isSearching ? searchResults : products;


  if (productsLoading || categoriesLoading || searchLoading) {
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

          {/* Search and Filters */}
          <div className="mb-12">
            <ProductSearch 
              onFiltersChange={setSearchFilters}
              initialFilters={searchFilters}
              showAdvancedFilters={true}
            />
          </div>

          {/* Products Display */}
          {isSearching ? (
            /* Search Results */
            <section className="py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Résultats de recherche
                </h2>
                <p className="text-muted-foreground">
                  {displayProducts.length} produit{displayProducts.length > 1 ? 's' : ''} trouvé{displayProducts.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    showQuickView={true}
                    showWishlist={true}
                  />
                ))}
              </div>
              
              {displayProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Aucun produit ne correspond à vos critères de recherche.
                  </p>
                  <Button onClick={() => setSearchFilters({})}>
                    Voir tous les produits
                  </Button>
                </div>
              )}
            </section>
          ) : (
            /* Products by Category */
            categories.map((category) => {
              const categoryProducts = displayProducts.filter(p => p.category_id === category.id);
              
              if (categoryProducts.length === 0) return null;
              
              return (
                <section key={category.id} className="py-16 px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                      <p className="text-lg text-muted-foreground">{category.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          showQuickView={true}
                          showWishlist={true}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })
          )}

          {/* Artisans Section - Only show when not searching */}
          {!isSearching && (
            <section className="py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">👨‍🎨 Nos Artisans Partenaires</h2>
                <p className="text-lg text-muted-foreground">
                  Découvrez les créateurs passionnés derrière nos produits
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Marie & Jean Dubois</CardTitle>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary">
                        Maîtres savonniers
                      </Badge>
                      <span className="text-muted-foreground text-sm">Périgord</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Fabrication traditionnelle de savons au lait d'ânesse depuis 3 générations
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Atelier des Senteurs</CardTitle>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary">
                        Distillateurs d'huiles
                      </Badge>
                      <span className="text-muted-foreground text-sm">Grasse</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Distillation artisanale d'huiles essentielles depuis 1952
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Les Tisanes de Léa</CardTitle>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary">
                        Herboriste
                      </Badge>
                      <span className="text-muted-foreground text-sm">Loire</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Cueillette sauvage et mélanges sur mesure pour le bien-être
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Values Section - Only show when not searching */}
          {!isSearching && (
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
          )}

          {/* CTA Section - Only show when not searching */}
          {!isSearching && (
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
          )}
        </div>
      </div>
      
      <CartSidebar />
      <Footer />
    </div>
  );
};

export default BoutiquePage;