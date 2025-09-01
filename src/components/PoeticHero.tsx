import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import FloatingBubbles from "./FloatingBubbles";
import OnboardingModal from "./OnboardingModal";

const PoeticHero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleStartJourney = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setShowOnboarding(true);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingBubbles />
        
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-12 animate-slide-in-up">
            <img 
              src="/logo-qvt.png" 
              alt="QVT Box Logo" 
              className="w-32 h-32 mx-auto mb-8 animate-float"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-32 h-32 mx-auto mb-8 flex items-center justify-center bg-gradient-bubble rounded-full text-foreground font-dancing font-bold text-2xl animate-float">
              QVT BOX
            </div>
          </div>

          {/* Main Question */}
          <div className="mb-12 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-dancing font-bold text-foreground leading-tight">
              <span className="block opacity-90 animate-wiggle">Salut,</span>
              <span className="block text-gradient animate-glow">ça va ?</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-poppins font-light max-w-3xl mx-auto leading-relaxed">
              La question la plus simple,<br />
              <span className="text-secondary font-medium animate-pulse-soft">mais la plus difficile</span>
            </p>
          </div>

          {/* Poetic Description */}
          <div className="mb-16 space-y-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-4xl mx-auto hover:scale-105 transition-all duration-500">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-inter font-light">
                Dans le tourbillon du quotidien, nous oublions de nous poser cette question essentielle. 
                <span className="text-gradient font-dancing font-semibold text-2xl"> QVT Box </span>
                vous invite à retrouver ce dialogue intérieur, à travers des bulles de douceur qui transforment 
                votre bien-être en <span className="text-secondary font-medium animate-pulse-soft">poésie du quotidien</span> ✨
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStartJourney}
                className="btn-bubble text-lg px-10 py-4 shadow-floating hover:shadow-bubble transform hover:scale-110 transition-all duration-300 animate-pulse-soft font-poppins font-medium"
              >
                🫧 Commencer ma bulle
              </Button>
              
              <Button 
                onClick={() => navigate("/box")}
                className="btn-soft text-lg px-8 py-4 hover:scale-105 transition-all duration-300 font-poppins"
                variant="outline"
              >
                📦 Commander ma box
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate("/saas")}
                className="bg-gradient-card border border-secondary/20 text-foreground px-8 py-4 rounded-full hover:bg-secondary/10 hover:scale-105 transition-all duration-300 font-inter"
                variant="outline"
              >
                💭 Demander une démo SaaS
              </Button>
              
              <Button 
                onClick={() => navigate("/boutique")}
                className="bg-accent/20 border border-accent/30 text-foreground px-8 py-4 rounded-full hover:bg-accent/30 hover:scale-105 transition-all duration-300 font-inter"
                variant="outline"
              >
                🛍️ Découvrir la boutique
              </Button>
            </div>
          </div>

          {/* Subtle Animation Text */}
          <div className="mt-16 animate-fade-in">
            <p className="text-foreground/50 font-light text-sm">
              Votre bien-être mérite toute l'attention du monde
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <div className="w-32 h-32 rounded-full bg-gradient-bubble animate-float"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <div className="w-24 h-24 rounded-full bg-gradient-bubble animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  );
};

export default PoeticHero;