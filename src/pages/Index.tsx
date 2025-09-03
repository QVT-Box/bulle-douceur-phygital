import Navigation from "@/components/Navigation";
import ProfessionalHero from "@/components/ProfessionalHero";
import EngagementsProfessionnels from "@/components/EngagementsProfessionnels";
import OutilSolidaire from "@/components/OutilSolidaire";
import ProcessusParticipation from "@/components/ProcessusParticipation";
import BoxSection from "@/components/BoxSection";
import SaasSection from "@/components/SaasSection";
import BoutiqueSection from "@/components/BoutiqueSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="relative z-10">
        <ProfessionalHero />
        <EngagementsProfessionnels />
        <OutilSolidaire />
        <ProcessusParticipation />
        <BoxSection />
        <SaasSection />
        <BoutiqueSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
