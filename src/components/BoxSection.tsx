// src/components/BoxSection.tsx
import { Link } from "react-router-dom";
import boxImage from "@/assets/box-artisanal.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const BoxSection = () => {
  const { language, t } = useLanguage();
  const base = language === "en" ? "/en" : "/fr";

  const boxTypes = [
    {
      // Clés i18n existantes : boxes.thematic
      category: t("boxes.thematic") || "Box Thématiques",
      boxes: ["Focus & Reset", "Mobilité", "Pénibilité", "Cohésion"],
      description:
        t("offer.box.description") ||
        "Des solutions ciblées pour chaque besoin de votre équipe",
    },
    {
      // Clés i18n existantes : boxes.events
      category: t("boxes.events") || "Box Événementielles",
      boxes: ["Retraite", "Naissance", "Anniversaire", "Promotion", "Mariage"],
      description: t("boxes.international.title") || "Célébrez les moments importants avec délicatesse",
    },
  ];

  const title = t("boxes.title") || "Nos Box Exceptionnelles";
  const subtitle =
    t("boxes.subtitle") ||
    "Chaque box est pensée comme un cadeau bienveillant, remplie de produits français artisanaux choisis avec cœur.";

  return (
    <section className="section-gradient py-20 px-6">
      <div className="container mx-auto">
        {/* Titre + intro */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
            {title}
          </h2>

          <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-light mb-6">
            {subtitle}
          </p>

          <div className="card-bubble p-6 max-w-4xl mx-auto">
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              {language === "en"
                ? "Because employees need visible and useful means, our boxes bring concrete answers to workplace realities: fatigue, workload, cohesion, recognition. They are designed to be offered by the company to its employees as tangible proofs of care and support."
                : "Parce que les salariés ont besoin de moyens visibles et utiles, nos box apportent des réponses concrètes aux réalités du travail : fatigue, charge, cohésion, reconnaissance. Elles sont conçues pour être offertes par l'entreprise à ses collaborateurs comme preuves tangibles d'attention et de soutien."}
            </p>
          </div>
        </div>

        {/* Deux familles de box */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Thématiques */}
          <div className="card-bubble p-8 hover:shadow-floating transition-all duration-300">
            <h3 className="text-2xl font-kalam font-bold text-primary mb-4">
              {t("boxes.thematic") || "Box Thématiques"}
            </h3>

            <p className="text-primary font-medium mb-6 text-sm uppercase tracking-wide">
              {language === "en"
                ? "→ Manage stress, mobility, strain and strengthen cohesion with useful, affordable products."
                : "→ Pour gérer le stress, la mobilité, la pénibilité et renforcer la cohésion, avec des produits utiles et accessibles."}
            </p>

            <p className="text-foreground/70 mb-6">
              {t("offer.box.description") ||
                "Des solutions ciblées pour chaque besoin de votre équipe"}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {["Focus & Reset", "Mobilité", "Pénibilité", "Cohésion"].map(
                (box, i) => (
                  <div
                    key={i}
                    className="bg-primary/5 rounded-xl p-3 text-center"
                  >
                    <span className="text-sm font-medium text-primary">
                      {box}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Bouton contrasté */}
            <Link
              to={`${base}/box`}
              className="inline-block w-full text-center bg-black text-white rounded-lg py-3 font-medium hover:bg-black/90 transition-colors"
            >
              {language === "en" ? "See all details" : "Voir tous les détails"}
            </Link>
          </div>

          {/* Événementielles */}
          <div className="card-bubble p-8 hover:shadow-floating transition-all duration-300">
            <h3 className="text-2xl font-kalam font-bold text-secondary mb-4">
              {t("boxes.events") || "Box Événementielles"}
            </h3>

            <p className="text-primary font-medium mb-6 text-sm uppercase tracking-wide">
              {language === "en"
                ? "→ Celebrate life moments, strengthen the collective and value each milestone."
                : "→ Pour célébrer les moments de vie, renforcer le collectif et valoriser chaque étape."}
            </p>

            <p className="text-foreground/70 mb-6">
              {language === "en"
                ? "Celebrate important moments with care"
                : "Célébrez les moments importants avec délicatesse"}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {["Retraite", "Naissance", "Anniversaire", "Promotion", "Mariage"].map(
                (box, i) => (
                  <div
                    key={i}
                    className="bg-secondary/5 rounded-xl p-3 text-center"
                  >
                    <span className="text-sm font-medium text-secondary">
                      {box}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Bouton contrasté */}
            <Link
              to={`${base}/box`}
              className="inline-block w-full text-center bg-black text-white rounded-lg py-3 font-medium hover:bg-black/90 transition-colors"
            >
              {language === "en" ? "See all details" : "Voir tous les détails"}
            </Link>
          </div>
        </div>

        {/* Visuel + argumentaire */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src={boxImage}
                alt={
                  language === "en"
                    ? "French artisanal box with natural products"
                    : "Box artisanale française avec produits naturels"
                }
                className="w-full rounded-2xl shadow-bubble"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Fallback discret si l'image ne charge pas
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = document.getElementById("box-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div
                id="box-fallback"
                className="hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center"
                aria-hidden="true"
              >
                <span className="text-primary font-semibold">
                  QVT Box — visuel indisponible
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-3xl font-kalam font-bold text-foreground mb-6">
              {language === "en" ? (
                <>
                  Made in <span className="text-primary">France</span> with love
                </>
              ) : (
                <>
                  Made in <span className="text-primary">France</span> avec amour
                </>
              )}
            </h3>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              {language === "en"
                ? "Our boxes bring together the best of French craftsmanship: organic herbal teas, hand-bound notebooks, everyday objects designed for wellbeing. Every product tells a story; every box creates a bond."
                : "Nos box rassemblent le meilleur de l'artisanat français : tisanes bio, carnets manuscrits, objets du quotidien pensés pour le bien-être. Chaque produit raconte une histoire, chaque box crée du lien."}
            </p>

            {/* CTA principal très contrasté */}
            <Link
              to={`${base}/box`}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-black/90 transition-colors"
            >
              {language === "en"
                ? "Support my teams with a Box"
                : "Soutenir mes équipes avec une Box"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxSection;
