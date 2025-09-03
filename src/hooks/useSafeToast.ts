import { useToast as useOriginalToast } from '@/hooks/use-toast';

export const useSafeToast = () => {
  try {
    return useOriginalToast();
  } catch (error) {
    // Fallback si useToast n'est pas disponible
    return {
      toast: ({ title, description }: { title?: string; description?: string }) => {
        // Fallback silencieux pour la production
      },
      dismiss: () => {},
      toasts: []
    };
  }
};