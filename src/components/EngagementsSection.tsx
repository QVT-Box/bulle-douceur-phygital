import { Link } from "react-router-dom";

const EngagementsSection = () => {
  const engagements = [
    {
      title: "Écouter le terrain",
      action: "Simulateur Ma Bulle Attentionnée",
      description: "Donnons la parole aux équipes pour comprendre leurs vrais besoins",
      icon: "👂"
    },
    {
      title: "Donner des moyens concrets", 
      action: "Box thématiques et événementielles",
      description: "Des solutions tangibles pour soutenir et reconnaître",
      icon: "🎁"
    },
    {
      title: "Prévenir les risques",
      action: "Dashboards RH et alertes RPS", 
      description: "Anticipons pour protéger, analysons pour améliorer",
      icon: "🛡️"
    },
    {
      title: "Construire ensemble",
      action: "Partenariats avec CSE, mutuelles et institutions",
      description: "L'union fait la force, surtout quand il s'agit de bien-être",
      icon: "🤝"
    }
  ];

  return (
    <section className="section-gradient py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
            Nos <span className="text-secondary">Engagements</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed">
            Parce que la QVT, c'est un combat positif et collectif
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {engagements.map((engagement, index) => (
            <div key={index} className="card-bubble p-6 text-center hover:shadow-floating transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">{engagement.icon}</div>
              <h3 className="font-kalam font-bold text-xl text-foreground mb-3">
                {engagement.title}
              </h3>
              <div className="text-primary font-medium mb-3 text-sm uppercase tracking-wide">
                → {engagement.action}
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {engagement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/contact" className="btn-bubble">
            Rejoignons le mouvement ensemble
          </Link>
        </div>

        {/* Bulles décoratives flottantes */}
        <div className="relative">
          <div className="absolute -top-10 left-1/4 w-12 h-12 bg-gradient-bubble rounded-full animate-float opacity-20"></div>
          <div className="absolute -bottom-6 right-1/4 w-8 h-8 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/6 w-6 h-6 bg-accent/15 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/3 right-1/6 w-14 h-14 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default EngagementsSection;