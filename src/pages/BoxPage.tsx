import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";

const BoxPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
            Nos <span className="text-primary">Box Magiques</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-16 max-w-3xl mx-auto">
            Découvrez notre collection complète de box pensées pour le bien-être au travail
          </p>
          
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-bubble mx-auto mb-8 animate-float"></div>
            <h2 className="text-2xl font-kalam font-bold text-primary mb-4">
              Page en construction
            </h2>
            <p className="text-foreground/70">
              Cette belle page arrive bientôt avec tous les détails de nos box !
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoxPage;