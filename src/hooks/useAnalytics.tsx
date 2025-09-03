import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  page?: string;
  userId?: string;
  properties?: Record<string, any>;
}

interface UserProperties {
  userId?: string;
  email?: string;
  company?: string;
  role?: string;
  teamSize?: number;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Console logging for development (replace with real analytics in production)
    console.log('📊 Analytics Event:', {
      ...event,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent.substring(0, 100)
    });

    // Here you would integrate with your analytics service:
    // - Google Analytics 4
    // - Mixpanel
    // - Amplitude
    // - Custom analytics endpoint
    
    try {
      // Example for GA4
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_properties: event.properties
        });
      }

      // Example for custom endpoint
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(() => {}); // Silently fail analytics
      
    } catch (error) {
      // Analytics should never break the user experience
      console.warn('Analytics tracking failed:', error);
    }
  }, []);

  const trackPageView = useCallback((page: string, title?: string) => {
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: page,
      properties: {
        title: title || document.title,
        referrer: document.referrer
      }
    });
  }, [trackEvent]);

  const trackCTAClick = useCallback((ctaName: string, location: string, destination?: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: ctaName,
      properties: {
        location,
        destination,
        timestamp: Date.now()
      }
    });
  }, [trackEvent]);

  const trackProductView = useCallback((productId: string, productName: string, category: string, price?: number) => {
    trackEvent({
      action: 'product_view',
      category: 'ecommerce',
      label: productName,
      value: price,
      properties: {
        product_id: productId,
        product_category: category
      }
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((productId: string, productName: string, price: number, quantity: number = 1) => {
    trackEvent({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: productName,
      value: price * quantity,
      properties: {
        product_id: productId,
        quantity,
        currency: 'EUR'
      }
    });
  }, [trackEvent]);

  const trackFormSubmission = useCallback((formName: string, success: boolean, errors?: string[]) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'forms',
      label: formName,
      properties: {
        errors: errors?.join(', '),
        form_name: formName
      }
    });
  }, [trackEvent]);

  const trackUserInteraction = useCallback((interaction: string, element: string, details?: Record<string, any>) => {
    trackEvent({
      action: 'user_interaction',
      category: 'engagement',
      label: `${interaction}_${element}`,
      properties: details
    });
  }, [trackEvent]);

  const trackPerformance = useCallback((metric: string, value: number, context?: string) => {
    trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metric,
      value: Math.round(value),
      properties: {
        context,
        user_agent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType
      }
    });
  }, [trackEvent]);

  const trackSearch = useCallback((query: string, resultsCount: number, filters?: Record<string, any>) => {
    trackEvent({
      action: 'search',
      category: 'search',
      label: query,
      value: resultsCount,
      properties: {
        filters,
        query_length: query.length
      }
    });
  }, [trackEvent]);

  const identifyUser = useCallback((userProperties: UserProperties) => {
    // Set user properties for analytics
    console.log('👤 User Identified:', userProperties);
    
    // Example for analytics services
    try {
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          user_id: userProperties.userId,
          custom_map: {
            custom_dimension_1: 'company',
            custom_dimension_2: 'role'
          }
        });
      }
    } catch (error) {
      console.warn('User identification failed:', error);
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackCTAClick,
    trackProductView,
    trackAddToCart,
    trackFormSubmission,
    trackUserInteraction,
    trackPerformance,
    trackSearch,
    identifyUser
  };
};