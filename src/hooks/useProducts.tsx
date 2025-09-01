import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProductImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  origin: string | null;
  artisan_info: string | null;
  is_featured: boolean;
  category_id: string | null;
  inventory_quantity: number;
  created_at: string;
  category?: Category;
  images?: ProductImage[];
}

export const useProducts = (categorySlug?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('products')
          .select(`
            *,
            category:categories(name, slug),
            images:product_images(*)
          `)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (categorySlug) {
          query = query.eq('categories.slug', categorySlug);
        }

        const { data, error } = await query;

        if (error) throw error;

        const formattedProducts = data?.map((product: any) => ({
          ...product,
          images: product.images?.sort((a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order) || []
        })) || [];

        setProducts(formattedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return { products, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};