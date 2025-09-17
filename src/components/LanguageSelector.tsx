// src/components/LanguageSelector.tsx
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";

type LangCode = "fr" | "en";

type Language = {
  code: LangCode;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

interface LanguageSelectorProps {
  /** Optionnel : pour compatibilité avec l’ancien code.
   *  Si omis, le composant utilisera automatiquement le contexte. */
  currentLanguage?: LangCode;
  onLanguageChange?: (language: LangCode) => void;
  className?: string;
  size?: "sm" | "md";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = "",
  size = "sm",
}) => {
  // Contexte langue (fallback sécurisé côté contexte)
  const ctx = useLanguage();

  // Source de vérité : props si fournies (compat), sinon contexte
  const lang: LangCode = (currentLanguage as LangCode) ?? (ctx.language as LangCode);
  const setLang = (onLanguageChange ?? ctx.setLanguage) as (l: LangCode) => void;

  const currentLang = languages.find((l) => l.code === lang) ?? languages[0];

  const isFR = lang === "fr";
  const base =
    "inline-flex items-center gap-1 rounded-xl border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";
  const active = "bg-black text-white border-black";
  const inactive = "bg-white text-black border-gray-200 hover:bg-gray-50";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-9 px-3 gap-2 hover:bg-primary/5 transition-colors ${className}`}
          aria-label="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLang.flag}</span>
          <span className="hidden sm:inline text-sm">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLang(language.code)}
            className="cursor-pointer gap-2"
            aria-checked={lang === language.code}
            role="menuitemradio"
          >
            <span>{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {lang === language.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
