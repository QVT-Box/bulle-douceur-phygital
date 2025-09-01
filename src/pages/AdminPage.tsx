import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import FloatingBubbles from '@/components/FloatingBubbles';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    compare_at_price: '',
    origin: '',
    artisan_info: '',
    category_id: '',
    inventory_quantity: '0',
    is_featured: false
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    sort_order: '0'
  });

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          ...productForm,
          price: parseFloat(productForm.price),
          compare_at_price: productForm.compare_at_price ? parseFloat(productForm.compare_at_price) : null,
          inventory_quantity: parseInt(productForm.inventory_quantity),
          slug: productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-')
        }]);

      if (error) throw error;

      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté avec succès."
      });

      setProductForm({
        name: '',
        slug: '',
        description: '',
        short_description: '',
        price: '',
        compare_at_price: '',
        origin: '',
        artisan_info: '',
        category_id: '',
        inventory_quantity: '0',
        is_featured: false
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit.",
        variant: "destructive"
      });
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{
          ...categoryForm,
          sort_order: parseInt(categoryForm.sort_order),
          slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-')
        }]);

      if (error) throw error;

      toast({
        title: "Catégorie ajoutée",
        description: "La catégorie a été ajoutée avec succès."
      });

      setCategoryForm({
        name: '',
        slug: '',
        description: '',
        sort_order: '0'
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie.",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <FloatingBubbles />
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Accès restreint</CardTitle>
              <CardDescription>
                Vous devez être connecté et avoir les droits administrateur pour accéder à cette page.
              </CardDescription>
            </CardHeader>
          </Card>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Administration</h1>
            <p className="text-lg text-muted-foreground">
              Gestion des produits et catégories de la boutique
            </p>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Produits</TabsTrigger>
              <TabsTrigger value="categories">Catégories</TabsTrigger>
              <TabsTrigger value="add-product">Ajouter un produit</TabsTrigger>
            </TabsList>

            {/* Liste des produits */}
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Produits existants</CardTitle>
                  <CardDescription>
                    Liste de tous les produits de la boutique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">Chargement...</div>
                  ) : (
                    <div className="grid gap-4">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {product.price.toFixed(2)}€ - {product.origin}
                            </p>
                            {product.category && (
                              <Badge variant="secondary" className="mt-1">
                                {product.category.name}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                            <Button variant="destructive" size="sm">
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Liste des catégories */}
            <TabsContent value="categories" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Catégories existantes</CardTitle>
                  <CardDescription>
                    Gestion des catégories de produits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button variant="destructive" size="sm">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Ajouter une catégorie</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="category-name">Nom</Label>
                              <Input
                                id="category-name"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="category-slug">Slug (URL)</Label>
                              <Input
                                id="category-slug"
                                value={categoryForm.slug}
                                onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                                placeholder="Auto-généré si vide"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="category-description">Description</Label>
                            <Textarea
                              id="category-description"
                              value={categoryForm.description}
                              onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="category-sort">Ordre d'affichage</Label>
                            <Input
                              id="category-sort"
                              type="number"
                              value={categoryForm.sort_order}
                              onChange={(e) => setCategoryForm({...categoryForm, sort_order: e.target.value})}
                            />
                          </div>
                          <Button type="submit">Ajouter la catégorie</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ajouter un produit */}
            <TabsContent value="add-product" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ajouter un nouveau produit</CardTitle>
                  <CardDescription>
                    Remplissez les informations du produit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom du produit</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input
                          id="slug"
                          value={productForm.slug}
                          onChange={(e) => setProductForm({...productForm, slug: e.target.value})}
                          placeholder="Auto-généré si vide"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="short_description">Description courte</Label>
                      <Input
                        id="short_description"
                        value={productForm.short_description}
                        onChange={(e) => setProductForm({...productForm, short_description: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description complète</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">Prix (€)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="compare_at_price">Prix barré (€)</Label>
                        <Input
                          id="compare_at_price"
                          type="number"
                          step="0.01"
                          value={productForm.compare_at_price}
                          onChange={(e) => setProductForm({...productForm, compare_at_price: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="inventory_quantity">Stock</Label>
                        <Input
                          id="inventory_quantity"
                          type="number"
                          value={productForm.inventory_quantity}
                          onChange={(e) => setProductForm({...productForm, inventory_quantity: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="origin">Origine</Label>
                        <Input
                          id="origin"
                          value={productForm.origin}
                          onChange={(e) => setProductForm({...productForm, origin: e.target.value})}
                          placeholder="ex: Provence, France"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category_id">Catégorie</Label>
                        <Select value={productForm.category_id} onValueChange={(value) => setProductForm({...productForm, category_id: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="artisan_info">Informations artisan</Label>
                      <Textarea
                        id="artisan_info"
                        value={productForm.artisan_info}
                        onChange={(e) => setProductForm({...productForm, artisan_info: e.target.value})}
                        placeholder="Informations sur l'artisan créateur"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Ajouter le produit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;