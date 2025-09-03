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

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  value: string;
  variant_type: string;
  price_modifier: number;
  sku: string | null;
  inventory_quantity: number;
  is_active: boolean;
  sort_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean;
  is_approved: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductTag {
  id: string;
  product_id: string;
  tag: string;
  tag_type: string;
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
  average_rating: number;
  review_count: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  created_at: string;
  category?: Category;
  images?: ProductImage[];
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  tags?: ProductTag[];
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
            images:product_images(*),
            variants:product_variants(*),
            reviews:product_reviews(*),
            tags:product_tags(*)
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
          images: product.images?.sort((a: ProductImage, b: ProductImage) => a.sort_order - b.sort_order) || [],
          variants: product.variants?.sort((a: ProductVariant, b: ProductVariant) => a.sort_order - b.sort_order) || [],
          reviews: product.reviews?.filter((r: ProductReview) => r.is_approved).sort((a: ProductReview, b: ProductReview) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ) || [],
          tags: product.tags || []
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