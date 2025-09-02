import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { totalItems, setIsOpen } = useCart();
  
  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Box", path: "/box" },
    { name: "SaaS", path: "/saas" },
    { name: "Boutique", path: "/boutique" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
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
          </Link>
          
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`nav-link hover:scale-105 transition-all duration-300 font-poppins ${location.pathname === item.path ? 'text-primary' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="relative btn-bubble hover:scale-110 text-white px-4 py-2 rounded-full font-medium transition-all font-inter"
              >
                🛒
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-white min-w-[20px] h-5 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </button>
              <Link
                to={user ? "/dashboard" : "/connexion"}
                className="btn-bubble hover:scale-110 text-white px-6 py-2 rounded-full font-medium transition-all font-inter"
              >
                {user ? "Mon Tableau de Bord" : "Mon Espace"}
              </Link>
              {user && isAdmin && (
                <Link
                  to="/admin"
                  className="btn-bubble hover:scale-110 text-white px-4 py-2 rounded-full font-medium transition-all font-inter bg-accent/80 hover:bg-accent"
                >
                  ⚙️ Admin
                </Link>
              )}
            </li>
          </ul>
          
          <button className="md:hidden">
            <span className="sr-only">Menu</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <div className="w-4 h-0.5 bg-primary rounded"></div>
              <div className="w-4 h-0.5 bg-primary rounded"></div>
              <div className="w-4 h-0.5 bg-primary rounded"></div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;