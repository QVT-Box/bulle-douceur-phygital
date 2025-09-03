import { Link } from "react-router-dom";
import saasImage from "@/assets/saas-dashboard.jpg";

const SaasSection = () => {
  const features = [
    {
      title: "Tableaux de bord en bulles",
      description: "Visualisez l'humeur de vos équipes de façon intuitive et poétique"
    },
    {
      title: "Alertes RPS bienveillantes", 
      description: "Prévenez les risques psychosociaux avec délicatesse"
    },
    {
      title: "Export DUERP simplifié",
      description: "Générez vos documents réglementaires sans stress"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Le <span className="text-secondary">SaaS</span> qui prend soin
            </h2>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed font-light">
              « Prévenir les risques psychosociaux n'est pas qu'une option, c'est une obligation légale (DUERP). »
            </p>
            <div className="card-bubble p-6 mb-8">
              <p className="text-lg text-foreground/80 leading-relaxed font-light">
                QVT Box accompagne les RH, CSE et managers de proximité avec des outils fiables : dashboards intuitifs, alertes précoces, indicateurs anonymisés et exports réglementaires. Une solution simple et professionnelle pour piloter la QVCT avec sérieux et humanité.
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/saas" className="btn-bubble">
              Prévenir les risques et agir concrètement
            </Link>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src={saasImage} 
                alt="Dashboard SaaS avec visualisation des émotions en bulles colorées" 
                className="w-full rounded-2xl shadow-floating"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-bubble rounded-full animate-float opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasSection;