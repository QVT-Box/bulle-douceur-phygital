import React, { useEffect } from 'react';
import { useAutoPromotion } from '@/hooks/useAutoPromotion';
import { useAuth } from '@/hooks/useAuth';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Auto-promotion du premier admin - appelé après l'initialisation complète
  useAutoPromotion();

  // S'assurer que tous les contextes sont chargés avant de rendre les enfants
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-bubble animate-pulse"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AppInitializer;