import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.offer': 'Notre Offre',
    'nav.saas': 'Licence SaaS',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.quote': 'Demander un devis',
    'nav.dashboard': 'Mon Tableau de Bord',
    'nav.account': 'Mon Espace',
    
    // Hero section
    'hero.tagline': '« Sortez de votre bulle, on veille sur vous »',
    'hero.description': 'Solutions phygitales B2B pour améliorer la Qualité de Vie au Travail. Nous combinons attention quotidienne et outils de prévention pour vos équipes.',
    'hero.cta.quote': 'Demander un devis',
    'hero.cta.callback': 'Être recontacté',
    
    // Offer section
    'offer.title': 'Notre Offre Complète',
    'offer.subtitle': 'Trois familles de solutions pour répondre à tous les besoins de vos équipes',
    
    // Box & Products
    'offer.box.title': 'Box & Produits',
    'offer.box.subtitle': 'Solutions physiques',
    'offer.box.description': 'Box thématiques et événementielles, produits français artisanaux pour le soutien quotidien des équipes',
    
    // SaaS License
    'offer.saas.title': 'Licence SaaS Entreprise',
    'offer.saas.subtitle': 'Outil numérique exclusif',
    'offer.saas.description': 'Application QVT réservée aux entreprises sous forme de licence pour la prévention RPS et le suivi QVCT',
    'offer.saas.warning': '⚠️ L\'application QVT Box est réservée aux entreprises sous forme de licence',
    
    // Boutique & Partnerships
    'offer.boutique.title': 'Boutique & Partenariats',
    'offer.boutique.subtitle': 'Réseau local',
    'offer.boutique.description': 'Sélection de partenaires locaux et boutique en ligne pour compléter votre offre bien-être',
    
    // Pricing
    'pricing.title': 'Tarifs Indicatifs',
    'pricing.subtitle': 'Des solutions adaptées à tous les budgets et toutes les tailles d\'entreprise',
    'pricing.saas.note': '3 000 € /an + Box (coût supplémentaire)',
    'pricing.recommended': 'Recommandé',
    
    // Demo section
    'demo.title': 'Licence Entreprise – Démo',
    'demo.description': 'Chaque entreprise dispose de son propre espace sécurisé. Les RH peuvent ajouter leurs salariés, suivre les indicateurs QVT et recevoir des alertes.',
    'demo.no_individual': 'QVT Box ne vend pas l\'application aux particuliers.',
    'demo.cta': 'Recevoir une démo de la licence',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Parlons de vos besoins en qualité de vie au travail',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.offer': 'Our Offer',
    'nav.saas': 'SaaS License',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.quote': 'Request Quote',
    'nav.dashboard': 'My Dashboard',
    'nav.account': 'My Account',
    
    // Hero section
    'hero.tagline': '« Get out of your bubble, we\'re watching over you »',
    'hero.description': 'Phygital B2B solutions to improve Workplace Quality of Life. We combine daily attention and prevention tools for your teams.',
    'hero.cta.quote': 'Request a quote',
    'hero.cta.callback': 'Get called back',
    
    // Offer section
    'offer.title': 'Our Complete Offer',
    'offer.subtitle': 'Three solution families to meet all your team needs',
    
    // Box & Products
    'offer.box.title': 'Boxes & Products',
    'offer.box.subtitle': 'Physical solutions',
    'offer.box.description': 'Thematic and event boxes, French artisanal products for daily team support',
    
    // SaaS License
    'offer.saas.title': 'Enterprise SaaS License',
    'offer.saas.subtitle': 'Exclusive digital tool',
    'offer.saas.description': 'QVT application reserved for companies under license form for RPS prevention and QVCT monitoring',
    'offer.saas.warning': '⚠️ The QVT Box application is reserved for companies under license form',
    
    // Boutique & Partnerships
    'offer.boutique.title': 'Shop & Partnerships',
    'offer.boutique.subtitle': 'Local network',
    'offer.boutique.description': 'Selection of local partners and online shop to complement your wellness offer',
    
    // Pricing
    'pricing.title': 'Indicative Pricing',
    'pricing.subtitle': 'Solutions adapted to all budgets and all company sizes',
    'pricing.saas.note': '€3,000 /year + Box (additional cost)',
    'pricing.recommended': 'Recommended',
    
    // Demo section
    'demo.title': 'Enterprise License – Demo',
    'demo.description': 'Each company has its own secure space. HR can add their employees, monitor QVT indicators and receive alerts.',
    'demo.no_individual': 'QVT Box does not sell the application to individuals.',
    'demo.cta': 'Get a license demo',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Let\'s talk about your workplace quality of life needs',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('qvtbox-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('qvtbox-language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};