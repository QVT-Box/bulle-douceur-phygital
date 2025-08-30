import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Box", path: "/box" },
    { name: "SaaS", path: "/saas" },
    { name: "Boutique", path: "/boutique" },
    { name: "Mon Espace", path: "/connexion" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-bubble"></div>
            <span className="text-xl font-kalam font-bold text-primary">QVT Box</span>
          </Link>
          
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'text-primary' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
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