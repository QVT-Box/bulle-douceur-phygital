import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";

const BoutiquePage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
            La <span className="text-accent">Boutique</span> du cœur
          </h1>
          <p className="text-xl text-foreground/70 mb-16 max-w-3xl mx-auto">
            Produits artisanaux français sélectionnés avec amour pour votre bien-être
          </p>
          
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-bubble mx-auto mb-8 animate-float"></div>
            <h2 className="text-2xl font-kalam font-bold text-accent mb-4">
              Page en construction
            </h2>
            <p className="text-foreground/70">
              Notre boutique artisanale ouvre ses portes très bientôt !
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoutiquePage;