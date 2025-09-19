import React, { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AppInitializer from "@/components/AppInitializer";
import GlobalSEO from "@/components/GlobalSEO";
import FloatingBubbles from "@/components/FloatingBubbles";

// Si ton NewIndex est dans le même dossier, l'import est bon.
// Sinon ajuste le chemin (ex: "@/components/NewIndex")
import NewIndex from "./NewIndex";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Méta globales (robots, og, twitter, viewport, preconnect, etc.) */}
      <GlobalSEO />

      {/* Fond décoratif (sans interférer avec les clics) */}
      <FloatingBubbles />

      {/* Barre de nav */}
      <Navigation />

      {/* Initialisation (auth, etc.) + fallback léger */}
      <AppInitializer>
        <main className="pt-20">
          <Suspense
            fallback={
              <div className="container mx-auto px-6 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto animate-pulse" />
                <p className="mt-4 text-sm text-foreground/60">Chargement…</p>
              </div>
            }
          >
            <NewIndex />
          </Suspense>
        </main>

        {/* Pied de page */}
        <Footer />
      </AppInitializer>
    </div>
  );
};

export default Index;
