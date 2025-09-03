import { useToast as useOriginalToast } from '@/hooks/use-toast';

export const useSafeToast = () => {
  try {
    return useOriginalToast();
  } catch (error) {
    // Fallback si useToast n'est pas disponible
    console.warn('useToast not available, using console fallback');
    return {
      toast: ({ title, description }: { title?: string; description?: string }) => {
        console.log('Toast:', title, description);
      },
      dismiss: () => {},
      toasts: []
    };
  }
};