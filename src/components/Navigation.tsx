// src/components/Navigation.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useCart } from "@/hooks/useCart";
// IMPORTANT : on importe le hook unifié. Si tu as créé src/hooks/useLanguage.ts qui réexporte,
// tu peux aussi faire: import { useLanguage } from "@/hooks/useLanguage";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Settings, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { totalItems, setIsOpen } = useCart();

  // Langue + i18n
  const { language, setLanguage, t } = useLanguage(); // "fr" | "en"

  // Petit helper : si la clé i18n n'existe pas, on renvoie un libellé par défaut FR/EN
  const tr = (key: string, frDefault: string, enDefault: string) => {
    const s = t(key);
    return s !== key ? s : language === "fr" ? frDefault : enDefault;
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Racine localisée
  const root = useMemo(() => (language === "en" ? "/en" : "/fr"), [language]);

  // Construit un chemin avec préfixe langue
  const withLang = (p: string) => {
    if (!p || p === "/") return root;
    return `${root}${p.startsWith("/") ? p : `/${p}`}`;
  };

  // Si on change la langue via le sélecteur, on reste sur la même page mais préfixée
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const currentLng = parts[0] === "fr" || parts[0] === "en" ? parts[0] : null;
    const targetLng = language;
    if (currentLng !== targetLng) {
      if (currentLng) parts[0] = targetLng;
      else parts.unshift(targetLng);
      navigate("/" + parts.join("/") + location.search, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Scroll-lock + focus + Échap quand le menu mobile est ouvert
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  // Ferme le menu si la route change
  useEffect(() => {
    setMobileMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Ferme si on passe en viewport md et +
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.offer"), path: "/box" },
    { name: t("nav.saas"), path: "/saas" },
    { name: t("nav.international"), path: "/international" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ].map((it) => ({ ...it, fullPath: withLang(it.path) }));

  const isActive = (fullPath: string) =>
    location.pathname === fullPath || location.pathname.startsWith(fullPath + "/");

  const cartLabel = tr("nav.cart", "Panier", "Cart");
  const quoteLabel = tr("nav.quote", "Demander un devis", "Request Quote");
  const dashboardLabel = tr("nav.dashboard", "Mon Tableau de Bord", "My Dashboard");
  const accountLabel = tr("nav.account", "Mon Espace", "My Account");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + marque */}
          <Link
            to={withLang("/")}
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group"
            aria-label={tr("nav.home", "Accueil", "Home")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
              <img
                src="/logo-qvt.jpeg"
                width={48}
                height={48}
                alt="QVT Box Logo"
                loading="eager"
                decoding="async"
                className="relative w-12 h-12 rounded-full object-cover shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="hidden relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                QVT
              </div>
            </div>
            <span className="text-2xl font-inter font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              QVT Box
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.fullPath}
                  className={`nav-link hover:scale-105 transition-all duration-300 font-montserrat ${
                    isActive(item.fullPath) ? "text-primary font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Actions à droite */}
            <li className="flex items-center gap-4">
              {/* Sélecteur de langue */}
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

              {/* Panier */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative rounded-lg p-2 hover:bg-muted transition"
                aria-label={cartLabel}
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 text-[10px] h-4 px-1 bg-primary text-white"
                    variant="default"
                  >
                    {totalItems}
                  </Badge>
                )}
              </button>

              {/* CTA devis */}
              <Link
                to={withLang("/contact")}
                className="bg-primary text-white px-6 py-2 rounded-lg font-medium transition-all hover:bg-primary/90 font-inter"
              >
                {quoteLabel}
              </Link>

              {/* Compte / Dashboard */}
              <Link
                to={user ? withLang("/dashboard") : withLang("/auth")}
                className="bg-secondary text-white px-6 py-2 rounded-lg font-medium transition-all hover:bg-secondary/90 font-inter"
              >
                {user ? dashboardLabel : accountLabel}
              </Link>

              {/* Admin si admin */}
              {user && isAdmin && (
                <Link
                  to={withLang("/admin")}
                  className="bg-accent text-white px-4 py-2 rounded-lg font-medium transition-all hover:bg-accent/90 font-inter"
                  aria-label="Administration"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              )}
            </li>
          </ul>

          {/* Menu hamburger (mobile) */}
          <button
            className="md:hidden p-3"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={tr("nav.menu", "Ouvrir le menu", "Open menu")}
            aria-controls="mobile-drawer"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Menu mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          >
            <div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              className="fixed right-0 top-0 h-full w-80 bg-background shadow-xl p-6 transform transition-transform duration-300 ease-out"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-inter font-bold text-foreground">Menu</span>
                <button
                  ref={closeBtnRef}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2"
                  aria-label={tr("nav.close", "Fermer le menu", "Close menu")}
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="flex flex-col space-y-4 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.fullPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-montserrat py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive(item.fullPath)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <div className="px-4 mb-2">
                  <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                </div>

                {/* Panier */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsOpen(true);
                  }}
                  className="relative rounded-lg px-4 py-3 bg-muted text-foreground font-inter flex items-center justify-center gap-2"
                  aria-label={cartLabel}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartLabel}
                  {totalItems > 0 && (
                    <Badge className="ml-2 text-[10px] h-4 px-1 bg-primary text-white" variant="default">
                      {totalItems}
                    </Badge>
                  )}
                </button>

                <Link
                  to={withLang("/contact")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-primary/90 font-inter text-center"
                >
                  {quoteLabel}
                </Link>

                <Link
                  to={user ? withLang("/dashboard") : withLang("/auth")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-secondary/90 font-inter text-center"
                >
                  {user ? dashboardLabel : accountLabel}
                </Link>

                {user && isAdmin && (
                  <Link
                    to={withLang("/admin")}
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-accent text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-accent/90 font-inter flex items-center justify-center gap-2"
                  >
                    <Settings className="w-5 h-5" />
                    Administration
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
