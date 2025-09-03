import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import EnhancedFloatingElements from "@/components/EnhancedFloatingElements";
import PoeticHero from "@/components/PoeticHero";
import WhyQVTBoxSection from "@/components/WhyQVTBoxSection";
import EngagementsSection from "@/components/EngagementsSection";
import BoxSection from "@/components/BoxSection";
import SaasSection from "@/components/SaasSection";
import BoutiqueSection from "@/components/BoutiqueSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingBubbles />
      <EnhancedFloatingElements />
      
      <div className="relative z-10">
        <PoeticHero />
        <WhyQVTBoxSection />
        <EngagementsSection />
        <BoxSection />
        <SaasSection />
        <BoutiqueSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
