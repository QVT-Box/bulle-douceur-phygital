import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAutoPromotion = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isPromoting, setIsPromoting] = useState(false);

  useEffect(() => {
    const checkAndPromoteFirstAdmin = async () => {
      if (!user || isPromoting || loading || !toast) return;

      try {
        setIsPromoting(true);

        // Vérifier s'il existe déjà un admin
        const { data: existingAdmins, error: adminError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('role', 'admin')
          .limit(1);

        if (adminError) throw adminError;

        // S'il n'y a pas d'admin, promouvoir l'utilisateur actuel
        if (existingAdmins.length === 0) {
          const { error: insertError } = await supabase
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'admin'
            });

          if (insertError) throw insertError;

          toast({
            title: "Félicitations !",
            description: "Vous êtes maintenant administrateur en tant que premier utilisateur.",
          });
        }
      } catch (error) {
        console.error('Erreur lors de l\'auto-promotion:', error);
      } finally {
        setIsPromoting(false);
      }
    };

    // Délayer l'exécution pour s'assurer que tous les contextes sont initialisés
    const timeout = setTimeout(checkAndPromoteFirstAdmin, 1000);
    return () => clearTimeout(timeout);
  }, [user, isPromoting, loading, toast]);

  return { isPromoting };
};