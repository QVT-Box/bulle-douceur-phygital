// src/components/GlobalSEO.tsx
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

const GlobalSEO = () => {
  // Vite fournit ces flags (fiable vs process.env.*)
  const isDev = import.meta.env.DEV || window.location.hostname === "localhost";
  const { language } = useLanguage?.() ?? { language: "fr" as const };

  // og:locale selon la langue
  const ogLocale = language === "en" ? "en_GB" : "fr_FR";

  return (
    <Helmet>
      {/* Indexation seulement en prod */}
      <meta name="robots" content={isDev ? "noindex, nofollow, noarchive, nosnippet" : "index, follow"} />

      {/* Métas sécurité/UX */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph par défaut */}
      <meta property="og:site_name" content="QVT Box" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:site" content="@qvtbox" />
      <meta name="twitter:creator" content="@qvtbox" />

      {/* Perfs (préconnexions) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Helmet>
  );
};

export default GlobalSEO;
