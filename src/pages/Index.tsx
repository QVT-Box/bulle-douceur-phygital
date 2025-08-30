import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import PoeticHero from "@/components/PoeticHero";
import BoxSection from "@/components/BoxSection";
import SaasSection from "@/components/SaasSection";
import BoutiqueSection from "@/components/BoutiqueSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="relative z-10">
        <PoeticHero />
        <BoxSection />
        <SaasSection />
        <BoutiqueSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
