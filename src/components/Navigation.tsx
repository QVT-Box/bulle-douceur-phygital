import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ShoppingBag, Settings, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { totalItems, setIsOpen } = useCart();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Box", path: "/box" },
    { name: "SaaS", path: "/saas" },
    { name: "Boutique", path: "/boutique" },
    { name: "Engagements", path: "/engagements" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
              <img 
                src="/logo-qvt.png" 
                alt="QVT Box Logo" 
                className="relative w-12 h-12 rounded-full object-cover shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                QVT
              </div>
            </div>
            <span className="text-2xl font-inter font-bold text-foreground group-hover:text-primary transition-colors duration-300">QVT Box</span>
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
                className="relative bg-primary text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-primary/90 font-inter"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-white min-w-[20px] h-5 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </button>
              <Link
                to={user ? "/dashboard" : "/auth"}
                className="bg-secondary text-white px-6 py-2 rounded-lg font-medium transition-all hover:bg-secondary/90 font-inter"
              >
                {user ? "Mon Tableau de Bord" : "Mon Espace"}
              </Link>
              {user && isAdmin && (
                <Link
                  to="/admin"
                  className="bg-accent text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-accent/90 font-inter"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              )}
            </li>
          </ul>
          
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <button className="md:hidden p-2">
                <span className="sr-only">Menu</span>
                <Menu className="w-6 h-6 text-primary" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-full">
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-inter font-bold text-foreground">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </button>
                </div>
                
                <div className="flex flex-col space-y-6 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-poppins py-3 px-4 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path 
                          ? 'bg-primary/10 text-primary font-semibold' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="flex flex-col space-y-4 mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="relative bg-primary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-primary/90 font-inter flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Panier
                    {totalItems > 0 && (
                      <Badge className="bg-secondary text-white min-w-[20px] h-5 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </button>
                  
                  <Link
                    to={user ? "/dashboard" : "/auth"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-secondary/90 font-inter text-center"
                  >
                    {user ? "Mon Tableau de Bord" : "Mon Espace"}
                  </Link>
                  
                  {user && isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-accent text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-accent/90 font-inter flex items-center justify-center gap-2"
                    >
                      <Settings className="w-5 h-5" />
                      Administration
                    </Link>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;