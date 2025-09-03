import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  origin?: string;
  sortBy?: 'name' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  tags?: string[];
}

export const useProductSearch = (filters: SearchFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

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
          .eq('is_active', true);

        // Text search
        if (filters.query) {
          query = query.textSearch('search_vector', filters.query, { 
            type: 'websearch',
            config: 'french'
          });
        }

        // Category filter
        if (filters.category) {
          query = query.eq('category.slug', filters.category);
        }

        // Price range filter
        if (filters.minPrice !== undefined) {
          query = query.gte('price', filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
          query = query.lte('price', filters.maxPrice);
        }

        // Rating filter
        if (filters.rating) {
          query = query.gte('average_rating', filters.rating);
        }

        // Origin filter
        if (filters.origin) {
          query = query.ilike('origin', `%${filters.origin}%`);
        }

        // Sorting
        switch (filters.sortBy) {
          case 'name':
            query = query.order('name', { ascending: true });
            break;
          case 'price_asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price_desc':
            query = query.order('price', { ascending: false });
            break;
          case 'rating':
            query = query.order('average_rating', { ascending: false });
            break;
          case 'newest':
          default:
            query = query.order('created_at', { ascending: false });
            break;
        }

        const { data, error } = await query;

        if (error) throw error;

        let formattedProducts = data?.map((product: any) => ({
          ...product,
          images: product.images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [],
          variants: product.variants?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [],
          reviews: product.reviews?.filter((r: any) => r.is_approved).sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ) || [],
          tags: product.tags || []
        })) || [];

        // Client-side tag filtering (since we can't easily do this in SQL with the current structure)
        if (filters.tags && filters.tags.length > 0) {
          formattedProducts = formattedProducts.filter(product =>
            filters.tags!.some(filterTag =>
              product.tags?.some(productTag => 
                productTag.tag.toLowerCase().includes(filterTag.toLowerCase())
              )
            )
          );
        }

        setProducts(formattedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    // Only search if there are filters applied
    if (Object.keys(filters).length > 0 && Object.values(filters).some(v => v !== undefined && v !== '')) {
      searchProducts();
    } else {
      setProducts([]);
    }
  }, [filters]);

  return { products, loading, error };
};

// Hook for getting available filter options
export const useSearchFilters = () => {
  const [origins, setOrigins] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Get unique origins
        const { data: originsData } = await supabase
          .from('products')
          .select('origin')
          .eq('is_active', true)
          .not('origin', 'is', null);

        const uniqueOrigins = [...new Set(originsData?.map(p => p.origin).filter(Boolean))] as string[];
        setOrigins(uniqueOrigins);

        // Get price range
        const { data: priceData } = await supabase
          .from('products')
          .select('price')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (priceData && priceData.length > 0) {
          setPriceRange({
            min: priceData[0].price,
            max: priceData[priceData.length - 1].price
          });
        }

        // Get popular tags
        const { data: tagsData } = await supabase
          .from('product_tags')
          .select(`
            tag,
            products!inner(is_active)
          `)
          .eq('products.is_active', true);

        const tagCounts = tagsData?.reduce((acc: Record<string, number>, item) => {
          acc[item.tag] = (acc[item.tag] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const popularTags = Object.entries(tagCounts || {})
          .sort(([,a], [,b]) => b - a)
          .slice(0, 20)
          .map(([tag]) => tag);

        setTags(popularTags);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { origins, priceRange, tags, loading };
};