// src/components/BoxGallery.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Settings, Users, Star, Package, Sparkles } from "lucide-react";
import boxImage from "@/assets/box-artisanal.jpg";
import boutiqueImage from "@/assets/boutique-artisan.jpg";
import productsImage from "@/assets/qvt-box-products.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

type IconType = React.ComponentType<{ className?: string }>;

interface BoxCard {
  id: number;
  name: string;
  image: string;
  pillars: string[];
  colors: string[]; // ex: ["bg-green-500", "bg-blue-500"]
  icons: IconType[];
  description: string;
  price: string;
}

const BoxGallery = () => {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [galleryRef, galleryVisible] = useScrollReveal();
  const { language } = useLanguage();

  // Préfixe de langue pour les liens
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => `${root}${p.startsWith("/") ? p : `/${p}`}`;

  const boxes: BoxCard[] = [
    {
      id: 1,
      name: language === "en" ? "Focus & Reset Box" : "Box Focus & Reset",
      image: boxImage,
      pillars:
        language === "en"
          ? ["Health & Balance", "Organization & Efficiency"]
          : ["Santé & Équilibre", "Organisation & Efficacité"],
      colors: ["bg-green-500", "bg-blue-500"],
      icons: [Heart, Settings],
      description:
        language === "en"
          ? "Regain serenity and daily efficiency"
          : "Retrouvez sérénité et efficacité au quotidien",
      price: "39€",
    },
    {
      id: 2,
      name: language === "en" ? "Team Cohesion Box" : "Box Cohésion Team",
      image: boutiqueImage,
      pillars:
        language === "en"
          ? ["Cohesion & Relationships", "Development & Inspiration"]
          : ["Cohésion & Relations", "Développement & Inspiration"],
      colors: ["bg-orange-500", "bg-purple-500"],
      icons: [Users, Star],
      description:
        language === "en"
          ? "Strengthen bonds and team spirit"
          : "Renforcez les liens et l'esprit d'équipe",
      price: "45€",
    },
    {
      id: 3,
      name: language === "en" ? "Pro Balance Box" : "Box Équilibre Pro",
      image: productsImage,
      pillars:
        language === "en"
          ? ["Health & Balance", "Development & Inspiration"]
          : ["Santé & Équilibre", "Développement & Inspiration"],
      colors: ["bg-green-500", "bg-purple-500"],
      icons: [Heart, Star],
      description:
        language === "en"
          ? "The perfect harmony between well-being and performance"
          : "L'harmonie parfaite entre bien-être et performance",
      price: "42€",
    },
    {
      id: 4,
      name: language === "en" ? "Innovation Box" : "Box Innovation",
      image: boxImage,
      pillars:
        language === "en"
          ? ["Organization & Efficiency", "Development & Inspiration"]
          : ["Organisation & Efficacité", "Développement & Inspiration"],
      colors: ["bg-blue-500", "bg-purple-500"],
      icons: [Settings, Star],
      description:
        language === "en"
          ? "Boost creativity and productivity"
          : "Boostez votre créativité et votre productivité",
      price: "48€",
    },
    {
      id: 5,
      name: language === "en" ? "Positive Energy Box" : "Box Énergie Positive",
      image: boutiqueImage,
      pillars:
        language === "en"
          ? ["Health & Balance", "Cohesion & Relationships"]
          : ["Santé & Équilibre", "Cohésion & Relations"],
      colors: ["bg-green-500", "bg-orange-500"],
      icons: [Heart, Users],
      description:
        language === "en"
          ? "Share good vibes and vitality"
          : "Partagez la bonne humeur et la vitalité",
      price: "36€",
    },
    {
      id: 6,
      name: language === "en" ? "Leadership Box" : "Box Leadership",
      image: productsImage,
      pillars:
        language === "en"
          ? [
              "Organization & Efficiency",
              "Cohesion & Relationships",
              "Development & Inspiration",
            ]
          : [
              "Organisation & Efficacité",
              "Cohésion & Relations",
              "Développement & Inspiration",
            ],
      colors: ["bg-blue-500", "bg-orange-500", "bg-purple-500"],
      icons: [Settings, Users, Star],
      description:
        language === "en"
          ? "Grow your kind leadership potential"
          : "Développez votre potentiel de leader bienveillant",
      price: "55€",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        {/* Titre + accroche */}
        <div
          ref={galleryRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
            {language === "en" ? (
              <>Our <span className="text-primary">Magic Boxes</span> ✨</>
            ) : (
              <>Nos <span className="text-primary">Box Magiques</span> ✨</>
            )}
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            {language === "en"
              ? "Each box is carefully crafted according to your needs, with French artisanal products and exclusive digital content."
              : "Chaque box est soigneusement composée selon vos besoins, avec des produits français artisanaux et des contenus digitaux exclusifs."}
          </p>
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-sm">
            {/* contraste élevé pour la lisibilité */}
            <Package className="w-5 h-5" />
            <span className="font-medium">
              {language === "en"
                ? "Free shipping from 2 boxes"
                : "Livraison offerte dès 2 box"}
            </span>
          </div>
        </div>

        {/* Grille des box */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boxes.map((box, index) => (
            <article
              key={box.id}
              className={`card-bubble overflow-hidden hover:shadow-floating transition-all duration-500 transform hover:scale-[1.02] cursor-pointer ${
                galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
              onMouseEnter={() => setHoveredBox(box.id)}
              onMouseLeave={() => setHoveredBox(null)}
              aria-label={box.name}
            >
              <div className="relative overflow-hidden">
                <img
                  src={box.image}
                  alt={box.name}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-52 object-cover transition-transform duration-500 ${
                    hoveredBox === box.id ? "scale-110" : "scale-100"
                  }`}
                  onError={(e) => {
                    // Masque l'image si erreur (évite un carré cassé)
                    (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow">
                    <span className="text-sm font-bold text-foreground">{box.price}</span>
                  </div>
                </div>

                {/* voile pour lisibilité du texte au survol */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 ${
                    hoveredBox === box.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {hoveredBox === box.id && (
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {language === "en" ? "PREMIUM CONTENT" : "CONTENU PREMIUM"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-kalam font-bold text-foreground mb-2">
                  {box.name}
                </h3>
                <p className="text-foreground/70 text-sm mb-4">{box.description}</p>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">
                      {language === "en" ? "Included pillars:" : "Piliers intégrés :"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {box.pillars.map((pillar, i) => {
                        const bgClass = box.colors[i]; // ex: "bg-green-500"
                        const textClass = bgClass.replace("bg-", "text-"); // "text-green-500"
                        const Icon = box.icons[i];
                        return (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${bgClass}/10 ${textClass} border border-current`}
                          >
                            <Icon className="w-3 h-3 text-current" />
                            <span className="text-[11px] font-medium leading-none">
                              {pillar}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Détails animés */}
                  <div
                    className={`transition-all duration-300 ${
                      hoveredBox === box.id ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="pt-3 border-t border-border/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/60">
                          🇫🇷 {language === "en" ? "Made in France" : "Made in France"}
                        </span>
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          {language === "en" ? "In stock" : "En stock"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA à contraste fort */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={withLang("/contact")}
                      className="inline-flex-ctr grow"
                      aria-label={
                        language === "en"
                          ? `Request a quote for ${box.name}`
                          : `Demander un devis pour ${box.name}`
                      }
                    >
                      <button className="w-full bg-black text-white hover:bg-black/90 rounded-lg px-4 py-2 text-sm font-medium">
                        {language === "en" ? "Request a quote" : "Demander un devis"}
                      </button>
                    </Link>
                    <Link
                      to={withLang("/box")}
                      className="inline-flex-ctr"
                      aria-label={
                        language === "en"
                          ? `View all boxes including ${box.name}`
                          : `Voir toutes les box dont ${box.name}`
                      }
                    >
                      <button className="whitespace-nowrap bg-white text-black border border-black/20 hover:bg-black hover:text-white rounded-lg px-4 py-2 text-sm font-medium">
                        {language === "en" ? "Details" : "Détails"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bandeau de personnalisation */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-kalam font-bold text-foreground mb-2">
              🎨 {language === "en" ? "Customization Available" : "Personnalisation Disponible"}
            </h3>
            <p className="text-foreground/70 text-sm mb-4">
              {language === "en"
                ? "All our boxes can be tailored to your needs. Contact us to craft your custom box!"
                : "Toutes nos box peuvent être personnalisées selon vos besoins spécifiques. Contactez-nous pour créer votre box sur mesure !"}
            </p>
            <Link to={withLang("/contact")}>
              <button className="bg-black text-white hover:bg-black/90 rounded-lg px-5 py-2 text-sm font-medium">
                {language === "en" ? "Contact us" : "Nous contacter"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxGallery;
