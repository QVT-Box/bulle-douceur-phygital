import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/connexion");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <FloatingBubbles />
        <div className="w-16 h-16 rounded-full bg-gradient-bubble animate-pulse"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-2">
                Bonjour ! 👋
              </h1>
              <p className="text-xl text-foreground/70">
                Bienvenue dans votre espace QVT Box
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="bg-white/20 border-white/30 text-foreground hover:bg-white/30"
            >
              Déconnexion
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground font-kalam">
                  🎁 Mes Box
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  Gérez vos commandes et découvrez nos nouvelles box
                </p>
                <Button 
                  onClick={() => navigate("/box")}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white"
                >
                  Voir les Box
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground font-kalam">
                  📊 Mon Bien-être
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  Suivez votre évolution et vos indicateurs QVT
                </p>
                <Button 
                  onClick={() => navigate("/saas")}
                  className="w-full bg-gradient-secondary hover:opacity-90 text-white"
                >
                  Voir le Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground font-kalam">
                  🛍️ Ma Boutique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  Explorez nos produits artisanaux français
                </p>
                <Button 
                  onClick={() => navigate("/boutique")}
                  className="w-full bg-gradient-accent hover:opacity-90 text-white"
                >
                  Voir la Boutique
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-kalam font-bold text-foreground mb-4">
              Comment ça va aujourd'hui ?
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Prenez un moment pour vous. Explorez nos solutions et 
              laissez-nous vous accompagner dans votre bien-être au travail.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;