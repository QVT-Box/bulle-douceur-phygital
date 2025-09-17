// src/components/AppInitializer.tsx
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import SafeAutoPromotion from "./SafeAutoPromotion";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const { loading } = useAuth();
  const { language } = useLanguage();

  const label = language === "fr" ? "Chargement…" : "Loading…";

  // Attente des contexts (auth) avant d'afficher l'app
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div
          className="flex flex-col items-center gap-3"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label={label}
        >
          {/* Spinner contrasté et accessible */}
          <div className="h-10 w-10 rounded-full border-2 border-black/20 border-t-black animate-spin" />
          <span className="text-sm text-gray-800">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SafeAutoPromotion />
      {children}
    </>
  );
};

export default AppInitializer;
