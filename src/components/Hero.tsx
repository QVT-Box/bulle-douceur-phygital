import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-workplace.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-kalam text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-relaxed">
            <span className="text-primary">« Salut, ça va ? »</span>
            <br />
            <span className="text-lg md:text-2xl lg:text-3xl font-montserrat font-normal text-foreground/80 mt-4 block">
              La question la plus simple et la plus difficile.
              <br />
              <span className="text-primary font-medium">QVT Box</span> vous aide à y répondre pour de vrai.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-12 font-light max-w-2xl mx-auto">
            Sortez de votre bulle avec nos solutions phygitales qui prennent soin de vos équipes. 
            Parce que la qualité de vie au travail, c'est l'affaire de tous.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/box" className="btn-bubble">
              Découvrir nos Box
            </Link>
            <Link to="/saas" className="btn-soft">
              Demander une Démo SaaS
            </Link>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-floating">
            <img 
              src={heroImage} 
              alt="Équipe heureuse dans un environnement de travail bienveillant" 
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;