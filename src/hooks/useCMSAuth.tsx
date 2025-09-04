import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export type CMSRole = 'admin' | 'editor' | 'catalog_manager' | 'partners_manager' | 'reader' | null;

interface CMSAuthHook {
  hasAccess: boolean;
  role: CMSRole;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isCatalogManager: boolean;
  isPartnersManager: boolean;
  canManageProducts: boolean;
  canManagePages: boolean;
  canManagePartners: boolean;
  canManageSettings: boolean;
}

export const useCMSAuth = (): CMSAuthHook => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<CMSRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // Check if user is lamia.brechet@outlook.fr (auto admin)
        if (user.email === 'lamia.brechet@outlook.fr') {
          setRole('admin');
          setLoading(false);
          return;
        }

        // Check CMS roles in database
        const { data, error } = await supabase
          .from('cms_user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          console.error('Error checking CMS role:', error);
        }

        setRole(data?.role as CMSRole || null);
      } catch (error) {
        console.error('Error in CMS auth check:', error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAccess();
    }
  }, [user, authLoading]);

  const hasAccess = role !== null;
  const isAdmin = role === 'admin';
  const isEditor = role === 'editor' || isAdmin;
  const isCatalogManager = role === 'catalog_manager' || isAdmin;
  const isPartnersManager = role === 'partners_manager' || isAdmin;

  return {
    hasAccess,
    role,
    loading: loading || authLoading,
    isAdmin,
    isEditor,
    isCatalogManager,
    isPartnersManager,
    canManageProducts: isCatalogManager || isEditor,
    canManagePages: isEditor,
    canManagePartners: isPartnersManager,
    canManageSettings: isAdmin
  };
};