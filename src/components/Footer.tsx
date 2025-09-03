import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-primary/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-6 animate-slide-in-up">
            <img 
              src="/logo-qvt.png" 
              alt="QVT Box Logo" 
              className="w-10 h-10 rounded-full object-cover animate-pulse-soft"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-10 h-10 rounded-full bg-gradient-bubble flex items-center justify-center text-xs font-bold text-foreground animate-pulse-soft">
              QVT
            </div>
            <span className="text-2xl font-dancing font-bold text-gradient">QVT Box</span>
          </div>
          
          <p className="text-foreground/70 mb-8 font-poppins font-light max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            QVT Box est un compagnon professionnel du quotidien, conçu pour les salariés, les managers, les RH et les représentants du personnel. 
            Ensemble, faisons de la question "Ça va ?" un vrai levier de dialogue social et de bien-être durable.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/box" className="nav-link hover:scale-110 transition-all duration-300 font-inter">Box</Link>
            <Link to="/saas" className="nav-link hover:scale-110 transition-all duration-300 font-inter">SaaS</Link>
            <Link to="/boutique" className="nav-link hover:scale-110 transition-all duration-300 font-inter">Boutique</Link>
            <Link to="/connexion" className="nav-link hover:scale-110 transition-all duration-300 font-inter">Mon Espace</Link>
          </div>
          
          <div className="border-t border-primary/10 pt-6 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-foreground/50 font-inter">
              © 2024 QVT Box - Fait avec <Heart className="inline w-4 h-4 text-red-400 animate-pulse-soft" /> en France pour le bien-être au travail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;