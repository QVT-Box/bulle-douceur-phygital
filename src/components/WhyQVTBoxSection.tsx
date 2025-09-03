const WhyQVTBoxSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-8">
            Pourquoi <span className="text-primary">QVT Box</span> ?
          </h2>
          
          <div className="card-bubble p-8 md:p-12 text-left">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
              Les salariés vivent la réalité du travail : plannings serrés, réorganisations, pénibilité, pression… 
              Les managers de proximité manquent souvent de moyens pour soutenir leurs équipes.
            </p>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light mt-6">
              <span className="text-primary font-medium">QVT Box</span> aide à transformer ces défis en solutions visibles et humaines : 
              des box pour soulager et reconnaître, et un SaaS pour suivre et prévenir.
            </p>
          </div>
          
          {/* Bulles décoratives */}
          <div className="relative mt-8">
            <div className="absolute -top-4 left-1/4 w-8 h-8 bg-gradient-bubble rounded-full animate-float opacity-20"></div>
            <div className="absolute -bottom-2 right-1/3 w-6 h-6 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-0 right-1/4 w-10 h-10 bg-accent/15 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyQVTBoxSection;