// src/components/BoutiqueSection.tsx
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import boutiqueImage from "@/assets/boutique-artisan.jpg";

const BoutiqueSection = () => {
  const { language } = useLanguage();
  const L = language === "en"
    ? {
        title: <>The <span className="text-accent">Boutique</span> with heart</>,
        kicker: "→ Discover local craftsmanship",
        intro:
          "Every product is carefully selected from our artisan partners. Caring for your teams also means supporting French craftsmanship.",
        more:
          "From hand-bound notebooks to herbal teas from our mountains, to embroidered cushions… Discover an authentic and warm selection.",
        cta: "Discover local craftsmanship",
        themes: [
          { name: "Wellness", desc: "Herbal teas, essential oils, cushions" },
          { name: "Ergonomics", desc: "Stands, footrests, accessories" },
          { name: "Energy", desc: "Organic snacks, energizing teas" },
          { name: "Local", desc: "Craftsmanship from our French regions" },
        ],
        madeIn: "🇫🇷 Made in France",
      }
    : {
        title: <>La <span className="text-accent">Boutique</span> du cœur</>,
        kicker: "→ Découvrir le savoir-faire local",
        intro:
          "Chaque produit est sélectionné chez nos artisans partenaires. Prendre soin de vos équipes, c’est aussi soutenir le savoir-faire français.",
        more:
          "Des carnets reliés à la main aux tisanes de nos montagnes, en passant par les coussins brodés… Découvrez une sélection authentique et chaleureuse.",
        cta: "Découvrir le savoir-faire local",
        themes: [
          { name: "Bien-être", desc: "Tisanes, huiles essentielles, coussins" },
          { name: "Ergonomie", desc: "Supports, repose-pieds, accessoires" },
          { name: "Énergie", desc: "Encas bio, thés dynamisants" },
          { name: "Local", desc: "Artisanat de nos régions françaises" },
        ],
        madeIn: "🇫🇷 Made in France",
      };

  // préfixe de langue pour rester dans /fr ou /en
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => `${root}${p.startsWith("/") ? p : `/${p}`}`;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-kalam font-bold text-gray-900 mb-6">
            {L.title}
          </h2>
          <p className="text-gray-900 font-medium mb-6 text-sm uppercase tracking-wide">
            {L.kicker}
          </p>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            {L.intro}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Colonne texte / thèmes */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6 mb-8">
              {L.themes.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="p-6 text-center rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="font-kalam font-bold text-lg text-accent mb-3">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-700">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center lg:text-left">
              <p className="text-lg text-gray-700 mb-6 font-light">{L.more}</p>

              <Link
                to={withLang("/boutique")}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-black text-white hover:bg-black/90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
              >
                {L.cta}
              </Link>
            </div>
          </div>

          {/* Colonne image */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <img
                src={boutiqueImage}
                alt={
                  language === "en"
                    ? "French artisan workshop with natural wellness products"
                    : "Atelier artisanal français avec produits bien-être naturels"
                }
                className="w-full rounded-2xl border border-gray-200 shadow-xl"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // fallback discret si l'image ne charge pas
                  (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                }}
              />
              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-t from-accent/10 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                <span className="text-sm font-medium text-accent">{L.madeIn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoutiqueSection;
