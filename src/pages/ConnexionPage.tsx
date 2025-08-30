import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const ConnexionPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <FloatingBubbles />
        <div className="w-16 h-16 rounded-full bg-gradient-bubble animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Mon <span className="text-primary">Espace</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Connectez-vous pour accéder à votre tableau de bord personnalisé
            </p>
          </div>
          
          <AuthForm onSuccess={() => navigate("/dashboard")} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ConnexionPage;