// src/components/Hero.tsx
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
// Si ton image est dans /src/assets/, garde cet import.
// Sinon, mets le fichier dans /public/hero-workplace.jpg et remplace par: const heroImage = "/hero-workplace.jpg";
import heroImage from "@/assets/hero-workplace.jpg";

const Hero = () => {
  const { language, t } = useLanguage();

  // Préfixe de langue pour les liens
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => (!p || p === "/" ? root : `${root}${p.startsWith("/") ? p : `/${p}`}`);

  // Fallbacks si une clé i18n n'existe pas encore
  const tr = (key: string, fr: string, en: string) => {
    const s = t(key);
    return s !== key ? s : language === "fr" ? fr : en;
  };

  const tagline = tr("hero.tagline", "« Salut, ça va ? »", "“How are you?”");
  const subtitle = tr(
    "hero.description",
    "La question la plus simple et la plus difficile. QVT Box vous aide à y répondre pour de vrai.",
    "The simplest and the hardest question. QVT Box helps you truly answer it."
  );
  const desc = tr(
    "hero.subdesc",
    "Sortez de votre bulle avec nos solutions phygitales qui prennent soin de vos équipes. Parce que la qualité de vie au travail, c'est l'affaire de tous.",
    "Step out of your bubble with our phygital solutions that care for your teams. Workplace well-being is everyone’s business."
  );

  const ctaPrimary = tr("cta.boxes", "Découvrir nos Box", "Discover our Boxes");
  const ctaSecondary = tr("cta.demo", "Demander une démo SaaS", "Request SaaS demo");

  const altHero = language === "fr"
    ? "Équipe heureuse dans un environnement de travail bienveillant"
    : "Happy team in a caring workplace";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 bg-white">
      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="max-w-4xl mx-auto">
          {/* Titre + sous-titre très contrastés */}
          <h1 className="font-inter text-4xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight tracking-tight mb-6">
            <span className="block">{tagline}</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-800 font-montserrat mb-4">
            {subtitle}
          </p>

          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            {desc}
          </p>

          {/* CTAs — contraste fort + focus ring */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to={withLang("/box")}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold bg-black text-white shadow-sm hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {ctaPrimary}
            </Link>
            <Link
              to={withLang("/saas")}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold border border-gray-900 text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Visuel hero — avec fallback si l'image manque */}
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200">
            <img
              src={heroImage as unknown as string}
              alt={altHero}
              className="w-full h-[380px] md:h-[500px] object-cover"
              onError={(e) => {
                // Si l'image importée n'existe pas, on cache l'img et on laisse le fallback
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fb = (e.currentTarget.nextElementSibling as HTMLElement) || null;
                if (fb) fb.classList.remove("hidden");
              }}
              loading="eager"
              decoding="async"
            />
            {/* Fallback gradient si l'image ne charge pas */}
            <div className="hidden absolute inset-0 bg-gradient-to-br from-primary/20 via-white to-secondary/20" />
            {/* Légère superposition pour lisibilité */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
