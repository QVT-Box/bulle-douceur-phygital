import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'user' | 'salarié' | 'responsable_qvt' | 'rh' | null;

interface UserRoleHook {
  role: UserRole;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isSalarié: boolean;
  isResponsableQVT: boolean;
  isRH: boolean;
  checkRole: (requiredRole: UserRole) => boolean;
  refreshRole: () => Promise<void>;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useUserRole = (): UserRoleHook => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async () => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      setRole((data?.role as UserRole) || 'user');
    } catch (error) {
      console.error('Error fetching user role:', error);
      setRole('user'); // Default to user role on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [user]);

  const checkRole = (requiredRole: UserRole): boolean => {
    if (!requiredRole || !role) return false;
    
    const roleHierarchy: Record<string, number> = {
      admin: 5,
      rh: 4,
      responsable_qvt: 3,
      salarié: 2,
      user: 1
    };
    
    return (roleHierarchy[role] || 0) >= (roleHierarchy[requiredRole] || 0);
  };

  const refreshRole = async () => {
    setLoading(true);
    await fetchUserRole();
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.some(requiredRole => checkRole(requiredRole));
  };

  return {
    role,
    loading,
    isAdmin: role === 'admin',
    isModerator: role === 'admin' || role === 'rh' || role === 'responsable_qvt',
    isSalarié: role === 'salarié' || role === 'responsable_qvt' || role === 'rh' || role === 'admin',
    isResponsableQVT: role === 'responsable_qvt' || role === 'admin',
    isRH: role === 'rh' || role === 'admin',
    checkRole,
    refreshRole,
    hasAnyRole
  };
};