// src/hooks/useLanguage.ts
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, vars?: Record<string, string | number>, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Petit utilitaire pour lire une clé "a.b.c" dans un objet */
function deepGet(obj: any, path: string): any {
  return path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
}

/** Interpolation simple: "Bonjour {{name}}" + {name:"Paul"} */
function interpolate(input: string, vars?: Record<string, string | number>) {
  if (!vars) return input;
  return input.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{{${k}}}`
  );
}

/** Dictionnaire intégré (pas de dossier locales/) */
const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      offer: "Notre Offre",
      saas: "Licence SaaS",
      about: "À propos",
      contact: "Contact",
      international: "International",
      quote: "Demander un devis",
      dashboard: "Mon Tableau de Bord",
      account: "Mon Espace",
      cart: "Panier" // (ajouté)
    },

    // Hero section
    hero: {
      tagline: "« Sortez de votre bulle, on veille sur vous »",
      description:
        "Solutions phygitales B2B pour améliorer la Qualité de Vie au Travail. Nous combinons attention quotidienne et outils de prévention pour vos équipes.",
      cta: {
        quote: "Demander un devis",
        callback: "Être recontacté"
      }
    },

    // Offer section
    offer: {
      title: "Notre Offre Complète",
      subtitle: "Trois familles de solutions pour répondre à tous les besoins de vos équipes",
      box: {
        title: "Box & Produits",
        subtitle: "Solutions physiques",
        description:
          "Box thématiques et événementielles, produits français artisanaux pour le soutien quotidien des équipes"
      },
      saas: {
        title: "Licence SaaS Entreprise",
        subtitle: "Outil numérique exclusif",
        description:
          "Application QVT réservée aux entreprises sous forme de licence pour la prévention RPS et le suivi QVCT",
        warning: "⚠️ L'application QVT Box est réservée aux entreprises sous forme de licence"
      },
      boutique: {
        title: "Boutique & Partenariats",
        subtitle: "Réseau local",
        description:
          "Sélection de partenaires locaux et boutique en ligne pour compléter votre offre bien-être"
      }
    },

    // Pricing
    pricing: {
      title: "Tarifs Indicatifs",
      subtitle: "Des solutions adaptées à tous les budgets et toutes les tailles d'entreprise",
      saas: { note: "3 000 € /an + Box (coût supplémentaire)" },
      recommended: "Recommandé"
    },

    // Demo
    demo: {
      title: "Licence Entreprise – Démo",
      description:
        "Chaque entreprise dispose de son propre espace sécurisé. Les RH peuvent ajouter leurs salariés, suivre les indicateurs QVT et recevoir des alertes.",
      no_individual: "QVT Box ne vend pas l'application aux particuliers.",
      cta: "Recevoir une démo de la licence"
    },

    // Contact
    contact: {
      title: "Contactez-nous",
      subtitle: "Parlons de vos besoins en qualité de vie au travail",
      form: {
        name: "Nom",
        company: "Entreprise",
        email: "Email",
        phone: "Téléphone",
        employees: "Nombre d'employés",
        offer: "Type d'offre souhaitée",
        message: "Message",
        send: "Envoyer"
      }
    },

    // Boxes
    boxes: {
      title: "Nos Box Exceptionnelles",
      subtitle:
        "Offrez à vos équipes un cadeau exceptionnel : une box française expédiée directement dans votre entreprise",
      thematic: "Box Thématiques",
      events: "Box Événementielles",
      customization: "Options de Personnalisation",
      international: {
        title: "Cadeau Exceptionnel International",
        description:
          "Offrez l'excellence française à vos équipes internationales. Nos box sont expédiées dans le monde entier avec le même niveau de qualité et d'attention."
      },
      cta: {
        quote: "Demander un devis pour cette box",
        order: "Commander cette box",
        international: "Demander un devis international"
      }
    },

    // International page
    international: {
      title: "QVT Box International",
      subtitle: "L'excellence française exportée dans le monde entier",
      hero: {
        title: "Vos Équipes Internationales Méritent le Meilleur",
        description:
          "QVT Box étend son savoir-faire au-delà des frontières. Offrez à vos collaborateurs internationaux l'authenticité et la qualité des produits français, avec la même attention et le même professionnalisme."
      }
    },

    // Commun
    common: { back: "Retour", edit: "Modifier" },

    // Onboarding (ajout minimal pour compat avec la modale)
    onboarding: {
      title: "Créons votre bulle personnalisée",
      rolePrompt: "Dites-nous qui vous êtes pour personnaliser votre expérience",
      journeyPrompt: "Parfait ! Maintenant, choisissez votre parcours bien-être",
      youAre: "Vous êtes",
      almostReady: "Votre bulle est presque prête !",
      recap: "Récapitulatif de votre configuration personnalisée",
      role: "Rôle",
      journey: "Parcours",
      finish: "Finaliser",
      auth: { title: "Créer votre compte" },
      toast: {
        welcomeTitle: "Bienvenue dans votre bulle !",
        welcomeDesc: "Votre parcours personnalisé est maintenant configuré.",
        errorTitle: "Erreur",
        errorDesc: "Impossible de finaliser votre inscription. Veuillez réessayer."
      },
      roleDefs: {
        employee: { title: "Salarié", desc: "Je souhaite prendre soin de mon bien-être au quotidien" },
        manager: { title: "Manager", desc: "Je veux accompagner le bien-être de mon équipe" },
        rh: { title: "RH", desc: "Je pilote la stratégie QVT de l'entreprise" },
        admin: { title: "Admin", desc: "Je gère la plateforme et les utilisateurs" }
      },
      journeyDefs: {
        box_only: {
          title: "Box Physique Only",
          desc: "Je préfère recevoir uniquement des box physiques avec des produits sélectionnés",
          b1: "Box mensuelles personnalisées",
          b2: "Produits artisanaux français",
          b3: "Rituels bien-être"
        },
        saas_box: {
          title: "SaaS + Box",
          desc: "Je veux l'expérience complète : suivi digital + box physiques",
          b1: "Dashboard personnel",
          b2: "Analyse IA des humeurs",
          b3: "Box adaptées aux tendances",
          b4: "Insights équipe"
        }
      }
    }
  },

  en: {
    nav: {
      home: "Home",
      offer: "Our Offer",
      saas: "SaaS License",
      about: "About",
      contact: "Contact",
      international: "International",
      quote: "Request Quote",
      dashboard: "My Dashboard",
      account: "My Account",
      cart: "Cart"
    },
    hero: {
      tagline: "« Get out of your bubble, we're watching over you »",
      description:
        "Phygital B2B solutions to improve Workplace Quality of Life. We combine daily care and prevention tools for your teams.",
      cta: { quote: "Request a quote", callback: "Get called back" }
    },
    offer: {
      title: "Our Complete Offer",
      subtitle: "Three solution families to meet all your team needs",
      box: {
        title: "Boxes & Products",
        subtitle: "Physical solutions",
        description:
          "Thematic and event boxes, French artisanal products for daily team support"
      },
      saas: {
        title: "Enterprise SaaS License",
        subtitle: "Exclusive digital tool",
        description:
          "QVT application reserved for companies under license for RPS prevention and QVCT monitoring",
        warning: "⚠️ The QVT Box application is reserved for companies under license"
      },
      boutique: {
        title: "Shop & Partnerships",
        subtitle: "Local network",
        description:
          "Selection of local partners and online shop to complement your wellness offer"
      }
    },
    pricing: {
      title: "Indicative Pricing",
      subtitle: "Solutions for all budgets and company sizes",
      saas: { note: "€3,000 /year + Box (additional cost)" },
      recommended: "Recommended"
    },
    demo: {
      title: "Enterprise License – Demo",
      description:
        "Each company has its own secure space. HR can add employees, track QVCT indicators and receive alerts.",
      no_individual: "QVT Box does not sell the application to individuals.",
      cta: "Get a license demo"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Let's talk about your workplace quality of life needs",
      form: {
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        employees: "Number of employees",
        offer: "Desired offer type",
        message: "Message",
        send: "Send"
      }
    },
    boxes: {
      title: "Our Exceptional Boxes",
      subtitle:
        "Offer your teams an exceptional gift: a French box shipped directly to your company",
      thematic: "Thematic Boxes",
      events: "Event Boxes",
      customization: "Customization Options",
      international: {
        title: "Exceptional International Gift",
        description:
          "Offer French excellence to your international teams. Our boxes are shipped worldwide with the same quality and care."
      },
      cta: {
        quote: "Request a quote for this box",
        order: "Order this box",
        international: "Request international quote"
      }
    },
    international: {
      title: "QVT Box International",
      subtitle: "French excellence exported worldwide",
      hero: {
        title: "Your International Teams Deserve the Best",
        description:
          "QVT Box extends its expertise beyond borders. Offer your international employees authentic French products with the same care and professionalism."
      }
    },
    common: { back: "Back", edit: "Edit" },
    onboarding: {
      title: "Let’s build your personalized bubble",
      rolePrompt: "Tell us who you are to personalize your experience",
      journeyPrompt: "Great! Now pick your well-being journey",
      youAre: "You are",
      almostReady: "Your bubble is almost ready!",
      recap: "Your personalized configuration recap",
      role: "Role",
      journey: "Journey",
      finish: "Finish",
      auth: { title: "Create your account" },
      toast: {
        welcomeTitle: "Welcome to your bubble!",
        welcomeDesc: "Your personalized journey is now set.",
        errorTitle: "Error",
        errorDesc: "Could not complete your onboarding. Please try again."
      },
      roleDefs: {
        employee: { title: "Employee", desc: "I want to care for my daily well-being" },
        manager: { title: "Manager", desc: "I want to support my team’s well-being" },
        rh: { title: "HR", desc: "I drive the company’s QVCT strategy" },
        admin: { title: "Admin", desc: "I manage the platform and users" }
      },
      journeyDefs: {
        box_only: {
          title: "Physical Box Only",
          desc: "I prefer to receive physical boxes only with curated products",
          b1: "Personalized monthly boxes",
          b2: "French artisan products",
          b3: "Well-being rituals"
        },
        saas_box: {
          title: "SaaS + Box",
          desc: "I want the full experience: digital tracking + physical boxes",
          b1: "Personal dashboard",
          b2: "AI mood analysis",
          b3: "Boxes adapted to trends",
          b4: "Team insights"
        }
      }
    }
  }
} as const;

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Détection initiale : URL (/fr|/en) > localStorage > langue navigateur > fr
  const initial: Language = (() => {
    if (typeof window === "undefined") return "fr";
    const seg = window.location.pathname.split("/").filter(Boolean)[0];
    if (seg === "fr" || seg === "en") return seg;
    const saved = localStorage.getItem("qvtbox-language") as Language | null;
    if (saved === "fr" || saved === "en") return saved;
    const nav = (navigator.language || navigator.languages?.[0] || "fr").slice(0, 2);
    return nav === "en" ? "en" : "fr";
  })();

  const [language, setLanguage] = useState<Language>(initial);

  useEffect(() => {
    try {
      localStorage.setItem("qvtbox-language", language);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, vars?: Record<string, string | number>, fallback?: string): string => {
    const val = deepGet(translations[language], key);
    const frFallback = deepGet(translations.fr, key);
    const chosen = (val ?? frFallback ?? fallback ?? key) as string;
    return interpolate(chosen, vars);
  };

  const handleSetLanguage = (newLanguage: Language) => setLanguage(newLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
