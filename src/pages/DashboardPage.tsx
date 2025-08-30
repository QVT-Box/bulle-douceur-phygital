import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodBubbleModule from "@/components/MoodBubbleModule";

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
        <div className="container mx-auto space-y-8">
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

          <MoodBubbleModule />

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-effect hover:shadow-bubble transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-kalam text-lg mb-2">Historique des humeurs</h3>
                <p className="text-sm text-foreground/70">
                  Visualisez vos tendances émotionnelles
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:shadow-bubble transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🎁</div>
                <h3 className="font-kalam text-lg mb-2">Mes Box</h3>
                <p className="text-sm text-foreground/70">
                  Box personnalisées selon vos besoins
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:shadow-bubble transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🛍️</div>
                <h3 className="font-kalam text-lg mb-2">Boutique</h3>
                <p className="text-sm text-foreground/70">
                  Découvrir nos produits bien-être
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;