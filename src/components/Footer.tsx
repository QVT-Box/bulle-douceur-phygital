// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language, t } = useLanguage();

  // Préfixe FR/EN pour les liens
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) =>
    !p || p === "/" ? root : `${root}${p.startsWith("/") ? p : `/${p}`}`;

  // Fallback de libellés si la clé i18n n'existe pas encore
  const tr = (key: string, fr: string, en: string) => {
    const s = t(key);
    return s !== key ? s : language === "fr" ? fr : en;
  };

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* Logo + marque (contraste fort, source locale fiable) */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <img
                src="/logo-qvt.jpeg"
                alt="QVT Box"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover shadow-lg"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              {/* Fallback monogramme si le fichier n'existe pas */}
              <div className="hidden h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center shadow-lg">
                QVT
              </div>
            </div>
            <span className="text-3xl font-bold">QVT Box</span>
          </div>

          {/* Texte (fr/en) avec contraste lisible */}
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === "fr"
              ? "QVT Box est un compagnon professionnel du quotidien, conçu pour les salariés, les managers, les RH et les représentants du personnel. Ensemble, faisons de la question « Ça va ? » un vrai levier de dialogue social et de bien-être durable."
              : "QVT Box is a daily professional companion for employees, managers, HR and employee representatives. Together, let’s turn “How are you?” into a real driver for dialogue and sustainable well-being."}
          </p>

          {/* Liens principaux (fort contraste + focus ring) */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link
              to={withLang("/box")}
              className="text-sm font-medium text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              {tr("nav.offer", "Notre Offre", "Our Offer")}
            </Link>
            <Link
              to={withLang("/saas")}
              className="text-sm font-medium text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              {tr("nav.saas", "Licence SaaS", "SaaS License")}
            </Link>
            <Link
              to={withLang("/about")}
              className="text-sm font-medium text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              {tr("nav.about", "À propos", "About")}
            </Link>
            <Link
              to={withLang("/auth")}
              className="text-sm font-medium text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              {tr("nav.account", "Mon Espace", "My Account")}
            </Link>
          </div>

          {/* Bloc coordonnées */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-4 mb-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === "fr" ? "Coordonnées QVT Box" : "QVT Box contact details"}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    📧 Email : <a href="mailto:contact@qvtbox.fr" className="underline">contact@qvtbox.fr</a> /{" "}
                    <a href="mailto:lamia.brechet@outlook.fr" className="underline">lamia.brechet@outlook.fr</a>
                  </p>
                  <p>📞 {language === "fr" ? "Téléphone" : "Phone"} : +33 (0)6 76 43 55 51 / 02 23 24 28 45</p>
                  <p>📍 {language === "fr" ? "Adresse" : "Address"} : Rennes, France</p>
                </div>
              </div>
            </div>

            {/* Liens légaux (contraste ++ + focus) */}
            <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
              <Link
                to={withLang("/cgv")}
                className="text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                CGV
              </Link>
              <Link
                to={withLang("/mentions-legales")}
                className="text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                {language === "fr" ? "Mentions Légales" : "Legal notice"}
              </Link>
              <Link
                to={withLang("/politique-confidentialite")}
                className="text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                {language === "fr" ? "RGPD" : "Privacy"}
              </Link>
              <Link
                to={withLang("/contact")}
                className="text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                {tr("nav.contact", "Contact", "Contact")}
              </Link>
            </div>

            <p className="text-sm text-gray-500 text-center">
              © 2024 QVT Box — {language === "fr"
                ? "Solutions phygitales B2B pour la qualité de vie au travail — Fait avec "
                : "Phygital B2B solutions for workplace quality of life — Made with "}
              <Heart className="inline w-4 h-4 text-red-500" />{" "}
              {language === "fr" ? "en France" : "in France"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
