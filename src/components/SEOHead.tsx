import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

export const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage = '/og-image.png',
  url = window.location.href,
  type = 'website'
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | QVT Box - Bien-être au travail`;
    
    // Update meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    
    // Open Graph tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', url, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:site_name', 'QVT Box', true);
    
    // Twitter tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
  }, [title, description, keywords, ogImage, url, type]);

  return null;
};