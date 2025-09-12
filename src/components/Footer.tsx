import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-primary/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-4 mb-6 animate-slide-in-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg animate-pulse-soft group-hover:blur-xl transition-all duration-500"></div>
              <img 
                src="https://2d181cb9-4143-4c90-9e92-77eb836ddc8b.lovableproject.com/logo-qvt.jpeg" 
                alt="QVT Box Logo"
                className="relative w-14 h-14 rounded-full object-cover shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-110 animate-glow"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="hidden relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-110 animate-glow">
                QVT
              </div>
            </div>
            <span className="text-3xl font-bold text-gradient font-inter">QVT Box</span>
          </div>
          
          <p className="text-foreground/70 mb-8 font-lato font-light max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            QVT Box est un compagnon professionnel du quotidien, conçu pour les salariés, les managers, les RH et les représentants du personnel. 
            Ensemble, faisons de la question "Ça va ?" un vrai levier de dialogue social et de bien-être durable.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/box" className="nav-link hover:scale-110 transition-all duration-300 font-inter">Notre Offre</Link>
            <Link to="/saas" className="nav-link hover:scale-110 transition-all duration-300 font-inter">Licence SaaS</Link>
            <Link to="/about" className="nav-link hover:scale-110 transition-all duration-300 font-inter">À propos</Link>
            <Link to="/auth" className="nav-link hover:scale-110 transition-all duration-300 font-inter">Mon Espace</Link>
          </div>
          
          <div className="border-t border-primary/10 pt-6 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="space-y-4 mb-6">
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Coordonnées QVT Box</h3>
                <div className="space-y-1 text-sm text-foreground/70">
                  <p>📧 Email : contact@qvtbox.fr</p>
                  <p>📞 Téléphone : +33 (0)X XX XX XX XX</p>
                  <p>📍 Adresse : Rennes, France</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
              <Link to="/cgv" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                CGV
              </Link>
              <Link to="/mentions-legales" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                Mentions Légales
              </Link>
              <Link to="/politique-confidentialite" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                RGPD
              </Link>
              <Link to="/contact" className="text-foreground/60 hover:text-primary transition-colors font-inter">
                Contact
              </Link>
            </div>
            <p className="text-sm text-foreground/50 font-inter text-center">
              © 2024 QVT Box - Solutions phygitales B2B pour la qualité de vie au travail - Fait avec <Heart className="inline w-4 h-4 text-red-400 animate-pulse-soft" /> en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;