// src/components/BoxPreferencesCustomizer.tsx
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Package, Gift, Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import alimentaireImg from "@/assets/products-alimentaire.jpg";
import hygieneImg from "@/assets/products-hygiene.jpg";
import cosmetiqueImg from "@/assets/products-cosmetique.jpg";
import surpriseImg from "@/assets/products-surprise.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

type Freq = "mensuelle" | "bimestrielle" | "trimestrielle";

interface BoxPreferences {
  categories: {
    alimentaire: boolean;
    hygiene: boolean;
    cosmetique: boolean;
    surprise: boolean;
  };
  priorities: {
    alimentaire: number;
    hygiene: number;
    cosmetique: number;
    surprise: number;
  };
  budget: number;
  frequency: Freq;
  allergies: string[];
  preferences_notes: string;
}

const CATEGORIES = [
  {
    id: "alimentaire" as const,
    image: alimentaireImg,
  },
  {
    id: "hygiene" as const,
    image: hygieneImg,
  },
  {
    id: "cosmetique" as const,
    image: cosmetiqueImg,
  },
  {
    id: "surprise" as const,
    image: surpriseImg,
  },
] as const;

const FREQUENCY_OPTIONS = [
  { value: "mensuelle" as const },
  { value: "bimestrielle" as const },
  { value: "trimestrielle" as const },
] as const;

const BoxPreferencesCustomizer: React.FC = () => {
  const { language } = useLanguage();

  // Libellés FR/EN
  const L = useMemo(
    () =>
      language === "en"
        ? {
            title: "Customize my Purchasing Power Box",
            blurb:
              "Configure your monthly box based on your tastes and needs. The content is negotiated with all employees to guarantee overall satisfaction.",
            budget: "Desired budget",
            perMonth: "/ month",
            estimated: "Estimated value",
            freq: "Delivery frequency",
            freqLabel: {
              mensuelle: "Monthly",
              bimestrielle: "Every 2 months",
              trimestrielle: "Every 3 months",
            },
            freqDesc: {
              mensuelle: "One box each month",
              bimestrielle: "One box every two months",
              trimestrielle: "One box every three months",
            },
            catsTitle: (n: number) => `Desired product categories (${n}/4)`,
            cat: {
              alimentaire: {
                name: "Food Products",
                desc: "Local specialties, French terroir, fine grocery",
                ex: ["Artisanal honey", "Regional confits", "Local biscuits", "Teas & infusions"],
              },
              hygiene: {
                name: "Hygiene & Wellness",
                desc: "Natural cosmetics, artisan soaps, body care",
                ex: ["Marseille soaps", "Solid shampoos", "Organic toothpastes", "Essential oils"],
              },
              cosmetique: {
                name: "Cosmetics & Beauty",
                desc: "Face care, French makeup, artisan perfumes",
                ex: ["Organic creams", "French lipstick", "Grasse perfumes", "Anti-aging care"],
              },
              surprise: {
                name: "Surprises & Discoveries",
                desc: "French crafts, decor items, lifestyle accessories",
                ex: ["Fashion accessories", "Decor objects", "French books", "Innovative gadgets"],
              },
            },
            examples: "Examples:",
            priority: "Priority",
            notes: "Notes (optional)",
            recap: "Your Purchasing Power Box summary",
            recapLineA: (budget: number, f: string) => `Budget: €${budget}/month • Frequency: ${f}`,
            recapLineB: (n: number) => `Selected categories: ${n}/4`,
            valueLine: (v: number) => `Estimated box value: €${v}`,
            recommended: "Recommended",
            save: "Save my preferences",
            preview: "Preview my box",
            toastSaved:
              "Preferences saved! Your next Purchasing Power Box will be customized accordingly.",
          }
        : {
            title: "Personnaliser ma Box Pouvoir d'Achat",
            blurb:
              "Configurez votre box mensuelle selon vos goûts et besoins. Le contenu est négocié avec l'ensemble des salariés pour garantir la satisfaction de tous.",
            budget: "Budget souhaité",
            perMonth: "/ mois",
            estimated: "Valeur estimée",
            freq: "Fréquence de livraison",
            freqLabel: {
              mensuelle: "Mensuelle",
              bimestrielle: "Bimestrielle",
              trimestrielle: "Trimestrielle",
            },
            freqDesc: {
              mensuelle: "Une box chaque mois",
              bimestrielle: "Une box tous les 2 mois",
              trimestrielle: "Une box tous les 3 mois",
            },
            catsTitle: (n: number) => `Catégories de produits souhaités (${n}/4)`,
            cat: {
              alimentaire: {
                name: "Produits Alimentaires",
                desc: "Spécialités locales, produits du terroir français, épicerie fine",
                ex: ["Miel artisanal", "Confits régionaux", "Biscuiterie locale", "Thés et infusions"],
              },
              hygiene: {
                name: "Hygiène & Bien-être",
                desc: "Cosmétiques naturels, savons artisanaux, soins du corps",
                ex: ["Savons de Marseille", "Shampoings solides", "Dentifrices bio", "Huiles essentielles"],
              },
              cosmetique: {
                name: "Cosmétiques & Beauté",
                desc: "Soins visage, maquillage français, parfums artisanaux",
                ex: ["Crèmes bio", "Rouge à lèvres français", "Parfums de Grasse", "Soins anti-âge"],
              },
              surprise: {
                name: "Surprises & Découvertes",
                desc: "Artisanat français, objets déco, accessoires lifestyle",
                ex: ["Accessoires mode", "Objets déco", "Livres français", "Gadgets innovants"],
              },
            },
            examples: "Exemples :",
            priority: "Priorité",
            notes: "Notes (optionnel)",
            recap: "Récapitulatif de votre Box Pouvoir d'Achat",
            recapLineA: (budget: number, f: string) => `Budget : ${budget}€/mois • Fréquence : ${f}`,
            recapLineB: (n: number) => `Catégories sélectionnées : ${n}/4`,
            valueLine: (v: number) => `Valeur estimée de votre box : ${v}€`,
            recommended: "Recommandé",
            save: "Sauvegarder mes préférences",
            preview: "Voir un aperçu de ma box",
            toastSaved:
              "Préférences sauvegardées ! Votre prochaine Box Pouvoir d'Achat sera personnalisée selon vos choix.",
          },
    [language]
  );

  const [preferences, setPreferences] = useState<BoxPreferences>({
    categories: {
      alimentaire: true,
      hygiene: true,
      cosmetique: false,
      surprise: true,
    },
    priorities: {
      alimentaire: 8,
      hygiene: 6,
      cosmetique: 3,
      surprise: 7,
    },
    budget: 35,
    frequency: "mensuelle",
    allergies: [],
    preferences_notes: "",
  });

  const getSelectedCategoriesCount = () =>
    Object.values(preferences.categories).filter(Boolean).length;

  const getEstimatedValue = () => {
    const baseValue = preferences.budget;
    const categoryMultiplier = getSelectedCategoriesCount() * 0.1;
    return Math.round(baseValue * (1 + categoryMultiplier));
  };

  const handleCategoryChange = (
    categoryId: keyof BoxPreferences["categories"],
    checked: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [categoryId]: checked,
      },
    }));
  };

  const handlePriorityChange = (
    categoryId: keyof BoxPreferences["priorities"],
    value: number[]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      priorities: {
        ...prev.priorities,
        [categoryId]: value[0],
      },
    }));
  };

  const handleSavePreferences = () => {
    // Ici on pourrait envoyer au backend ; pour l’instant feedback utilisateur
    toast.success(L.toastSaved);
  };

  return (
    <Card className="card-professional">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-inter">
          <Package className="w-6 h-6 text-primary" />
          {L.title}
        </CardTitle>
        <p className="text-foreground/70 font-lato">{L.blurb}</p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Budget */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-medium font-inter">{L.budget}</Label>
            <Badge variant="outline" className="text-sm">
              {preferences.budget}€ {L.perMonth}
            </Badge>
          </div>
          <Slider
            value={[preferences.budget]}
            onValueChange={(value) =>
              setPreferences((prev) => ({ ...prev, budget: value[0] }))
            }
            max={80}
            min={20}
            step={5}
            className="w-full"
            aria-label={L.budget}
          />
          <div className="flex justify-between text-sm text-foreground/60 mt-2 font-lato">
            <span>20€</span>
            <span aria-live="polite">
              {L.estimated}: {getEstimatedValue()}€
            </span>
            <span>80€</span>
          </div>
        </div>

        <Separator />

        {/* Fréquence */}
        <div>
          <Label className="text-base font-medium font-inter mb-4 block">{L.freq}</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FREQUENCY_OPTIONS.map((option) => {
              const active = preferences.frequency === option.value;
              return (
                <Card
                  key={option.value}
                  role="radio"
                  aria-checked={active}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setPreferences((p) => ({ ...p, frequency: option.value }));
                    }
                  }}
                  className={`cursor-pointer transition-all ${
                    active ? "ring-2 ring-primary bg-primary/5" : "hover:bg-foreground/5"
                  }`}
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, frequency: option.value }))
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      {/* radio déco, en readOnly pour éviter les warnings */}
                      <input
                        type="radio"
                        readOnly
                        checked={active}
                        className="w-4 h-4 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-medium font-inter">
                          {L.freqLabel[option.value]}
                        </p>
                        <p className="text-sm text-foreground/70 font-lato">
                          {L.freqDesc[option.value]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Catégories */}
        <div>
          <Label className="text-base font-medium font-inter mb-4 block">
            {L.catsTitle(getSelectedCategoriesCount())}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((category) => {
              const isSelected = preferences.categories[category.id];
              const priority = preferences.priorities[category.id];
              const meta = L.cat[category.id];

              return (
                <Card
                  key={category.id}
                  className={`transition-all ${
                    isSelected ? "ring-2 ring-primary bg-primary/5" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={meta.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-2 right-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(v) =>
                          handleCategoryChange(category.id, Boolean(v))
                        }
                        className="bg-white/90 border-white"
                        aria-label={meta.name}
                      />
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold font-inter mb-2">{meta.name}</h3>
                    <p className="text-sm text-foreground/70 mb-3 font-lato">{meta.desc}</p>

                    <div className="space-y-2 mb-4">
                      <Label className="text-xs font-lato font-medium">
                        {L.examples}
                      </Label>
                      <div className="flex flex-wrap gap-1">
                        {meta.ex.map((example, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-3 border-t">
                        <Label className="text-sm font-medium font-inter mb-2 block">
                          {L.priority}: {priority}/10
                        </Label>
                        <Slider
                          value={[priority]}
                          onValueChange={(value) =>
                            handlePriorityChange(category.id, value)
                          }
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                          aria-label={`${meta.name} priority`}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Notes libres */}
        <div>
          <Label htmlFor="notes" className="text-base font-medium font-inter mb-2 block">
            {L.notes}
          </Label>
          <Textarea
            id="notes"
            value={preferences.preferences_notes}
            onChange={(e) =>
              setPreferences((p) => ({ ...p, preferences_notes: e.target.value }))
            }
            placeholder=""
            rows={3}
          />
        </div>

        {/* Récap */}
        <div className="bg-gradient-card p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <Gift className="w-8 h-8 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold font-inter mb-2">{L.recap}</h3>
              <div className="space-y-2 text-sm font-lato">
                <p>
                  <strong>{L.recapLineA(preferences.budget, L.freqLabel[preferences.frequency])}</strong>
                </p>
                <p>
                  <strong>{L.recapLineB(getSelectedCategoriesCount())}</strong>
                </p>
                <p className="text-primary font-medium">{L.valueLine(getEstimatedValue())}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium font-lato">{L.recommended}</span>
            </div>
          </div>
        </div>

        {/* Actions (contraste élevé) */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button onClick={handleSavePreferences} className="flex-1 bg-black text-white hover:bg-black/90">
            <ShoppingCart className="w-4 h-4 mr-2" />
            {L.save}
          </Button>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
          >
            {L.preview}
          </Button>
        </div>

        <div className="text-center text-sm text-foreground/60 font-lato">
          <p>
            {language === "en"
              ? "Your preferences are considered during the collective selection of products. The final composition is negotiated with all employees."
              : "Vos préférences sont prises en compte lors de la sélection collective des produits. La composition finale est négociée avec l'ensemble des salariés de votre entreprise."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoxPreferencesCustomizer;
