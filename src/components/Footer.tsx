import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-primary/10 py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-bubble"></div>
            <span className="text-2xl font-kalam font-bold text-primary">QVT Box</span>
          </div>
          
          <p className="text-foreground/70 mb-8 font-light max-w-2xl mx-auto">
            Sortez de votre bulle avec bienveillance. 
            Prenez soin de vos équipes, ils prennent soin de votre entreprise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link to="/box" className="nav-link">Box</Link>
            <Link to="/saas" className="nav-link">SaaS</Link>
            <Link to="/boutique" className="nav-link">Boutique</Link>
            <Link to="/connexion" className="nav-link">Mon Espace</Link>
          </div>
          
          <div className="border-t border-primary/10 pt-6">
            <p className="text-sm text-foreground/50">
              © 2024 QVT Box - Fait avec ❤️ en France pour le bien-être au travail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;