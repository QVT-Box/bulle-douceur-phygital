// src/components/BoxConfigurator.tsx
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Users,
  Calendar,
  Gift,
  Sparkles,
  ShoppingCart,
  Heart,
  Zap,
  Coffee,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

// ✅ images fiables depuis /src/assets
import imgHygiene from "@/assets/products-hygiene.jpg";
import imgAlimentaire from "@/assets/products-alimentaire.jpg";
import imgCosmetique from "@/assets/products-cosmetique.jpg";
import imgSurprise from "@/assets/products-surprise.jpg";

type IconType = React.ComponentType<{ className?: string }>;

interface BoxType {
  id: "wellbeing" | "energy" | "coffee" | "celebration";
  name: string;
  description: string;
  icon: IconType;
  basePrice: number;
  themes: string[];
  color: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: BoxType["id"];
  image: string;
}

export const BoxConfigurator = () => {
  const { language } = useLanguage();
  const [catalogRef, catalogVisible] = useScrollReveal();

  const L = language === "en"
    ? {
        title: "Box Configurator",
        subtitle: "Create a personalized box for your team",
        chooseTheme: "Choose your theme",
        from: "From",
        teamSize: "Team size",
        occasion: "Occasion (optional)",
        occasionPh: "e.g. Year-end party, new year…",
        message: "Personalized message",
        messagePh: "Add a personal note to go with your box…",
        addProducts: "Add-on products",
        added: "Added",
        preview: "Your box preview",
        teamOf: "Team of {n} people",
        boxContents: "Added products:",
        occasionLabel: "Occasion",
        deliveryIncluded: "Delivery included",
        quote: "Get a quote",
        order: "Order now",
      }
    : {
        title: "Configurateur de Box",
        subtitle: "Créez une box personnalisée pour votre équipe",
        chooseTheme: "Choisissez votre thématique",
        from: "À partir de",
        teamSize: "Taille de l'équipe",
        occasion: "Occasion (optionnel)",
        occasionPh: "Ex : Fête de fin d'année, nouvel an…",
        message: "Message personnalisé",
        messagePh: "Ajoutez un message personnel pour accompagner votre box…",
        addProducts: "Produits complémentaires",
        added: "Ajouté",
        preview: "Aperçu de votre box",
        teamOf: "Équipe de {n} personnes",
        boxContents: "Produits ajoutés :",
        occasionLabel: "Occasion",
        deliveryIncluded: "Livraison incluse",
        quote: "Obtenir un devis",
        order: "Commander maintenant",
      };

  // Préfixe /fr | /en pour les liens
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => `${root}${p.startsWith("/") ? p : `/${p}`}`;

  // Format prix €
  const nf = useMemo(
    () =>
      new Intl.NumberFormat(language === "en" ? "en-GB" : "fr-FR", {
        style: "currency",
        currency: "EUR",
      }),
    [language]
  );

  // Types de box
  const boxTypes: BoxType[] = [
    {
      id: "wellbeing",
      name: language === "en" ? "Wellbeing Box" : "Box Bien-être",
      description:
        language === "en"
          ? "Relaxation and serenity for your teams"
          : "Détente et sérénité pour vos équipes",
      icon: Heart,
      basePrice: 35,
      themes:
        language === "en"
          ? ["Relaxation", "Aromatherapy", "Organic herbal teas", "Zen accessories"]
          : ["Relaxation", "Aromathérapie", "Tisanes bio", "Accessoires zen"],
      color: "text-rose-500",
    },
    {
      id: "energy",
      name: language === "en" ? "Energy Box" : "Box Énergie",
      description:
        language === "en"
          ? "Dynamism and vitality every day"
          : "Dynamisme et vitalité au quotidien",
      icon: Zap,
      basePrice: 32,
      themes:
        language === "en"
          ? ["Energy snacks", "Natural drinks", "Supplements", "Sport accessories"]
          : ["Snacks énergétiques", "Boissons naturelles", "Compléments", "Accessoires sport"],
      color: "text-orange-500",
    },
    {
      id: "coffee",
      name: language === "en" ? "Coffee & Treats Box" : "Box Café & Gourmandise",
      description:
        language === "en"
          ? "Friendly moments and authentic flavors"
          : "Moments conviviaux et saveurs authentiques",
      icon: Coffee,
      basePrice: 38,
      themes:
        language === "en"
          ? ["Artisan coffees", "Premium teas", "Artisan biscuits", "Accessories"]
          : ["Cafés d'artisan", "Thés premium", "Biscuits artisanaux", "Accessoires"],
      color: "text-amber-600",
    },
    {
      id: "celebration",
      name: language === "en" ? "Celebration Box" : "Box Événementielle",
      description:
        language === "en"
          ? "Celebrate your successes and special moments"
          : "Célébrez vos succès et moments spéciaux",
      icon: Gift,
      basePrice: 45,
      themes:
        language === "en"
          ? ["Festive products", "Decoration", "Activities", "Personalized souvenirs"]
          : ["Produits festifs", "Décoration", "Animations", "Souvenirs personnalisés"],
      color: "text-purple-500",
    },
  ];

  // Produits démo (images fiables selon catégorie)
  const productImageByCategory: Record<BoxType["id"], string> = {
    wellbeing: imgHygiene,
    energy: imgAlimentaire,
    coffee: imgAlimentaire,
    celebration: imgSurprise,
  };

  const sampleProducts: Product[] = (language === "en"
    ? [
        { id: "1", name: "Lavender essential oil", price: 12, category: "wellbeing", image: productImageByCategory.wellbeing },
        { id: "2", name: "Relax Organic Infusion", price: 8, category: "wellbeing", image: productImageByCategory.wellbeing },
        { id: "3", name: "Energy bars", price: 15, category: "energy", image: productImageByCategory.energy },
        { id: "4", name: "Guatemala Organic Coffee", price: 18, category: "coffee", image: productImageByCategory.coffee },
        { id: "5", name: "Earl Grey Premium Tea", price: 14, category: "coffee", image: productImageByCategory.coffee },
        { id: "6", name: "Artisanal chocolates", price: 22, category: "celebration", image: productImageByCategory.celebration },
      ]
    : [
        { id: "1", name: "Huile essentielle Lavande", price: 12, category: "wellbeing", image: productImageByCategory.wellbeing },
        { id: "2", name: "Tisane Relaxation Bio", price: 8, category: "wellbeing", image: productImageByCategory.wellbeing },
        { id: "3", name: "Barres énergétiques", price: 15, category: "energy", image: productImageByCategory.energy },
        { id: "4", name: "Café Guatemala Bio", price: 18, category: "coffee", image: productImageByCategory.coffee },
        { id: "5", name: "Thé Earl Grey Premium", price: 14, category: "coffee", image: productImageByCategory.coffee },
        { id: "6", name: "Chocolats artisanaux", price: 22, category: "celebration", image: productImageByCategory.celebration },
      ]) as Product[];

  const [selectedBox, setSelectedBox] = useState<BoxType["id"]>("wellbeing");
  const [teamSize, setTeamSize] = useState<number>(10);
  const [occasion, setOccasion] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const currentBox = boxTypes.find((b) => b.id === selectedBox)!;
  const filteredProducts = sampleProducts.filter((p) => p.category === selectedBox);

  const calculateTotal = () => {
    const safeTeam = Math.max(1, Math.min(500, Math.floor(teamSize || 1)));
    const baseTotal = currentBox.basePrice * safeTeam;
    const productsTotal = selectedProducts.reduce((total, productId) => {
      const product = sampleProducts.find((p) => p.id === productId);
      return total + (product ? product.price * safeTeam : 0);
    }, 0);
    return Math.round((baseTotal + productsTotal) * 100) / 100;
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6" ref={catalogRef}>
      {/* Header */}
      <Card className="border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-inter text-gray-900">
            <Package className="w-6 h-6 text-primary" />
            {L.title}
          </CardTitle>
          <p className="text-gray-700 font-lato">{L.subtitle}</p>
        </CardHeader>

      {/* Choix de thématique */}
        <CardContent className="space-y-6">
          <div>
            <Label className="text-lg font-medium font-inter mb-4 block text-gray-900">
              {L.chooseTheme}
            </Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {boxTypes.map((box) => {
                const IconComponent = box.icon;
                const isActive = selectedBox === box.id;
                return (
                  <Card
                    key={box.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    className={`cursor-pointer transition-all border-2 ${
                      isActive ? "border-primary shadow-primary/20" : "border-gray-200 hover:border-primary/50"
                    } bg-white`}
                    onClick={() => setSelectedBox(box.id)}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedBox(box.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <IconComponent className={`w-8 h-8 mx-auto mb-2 ${box.color}`} />
                      <h3 className="font-medium text-sm font-inter mb-1 text-gray-900">{box.name}</h3>
                      <p className="text-xs text-gray-700 font-lato mb-2">{box.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {L.from} {nf.format(box.basePrice)}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Configuration */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="teamSize" className="font-inter text-gray-900">
                {L.teamSize}
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-4 h-4 text-gray-500" />
                <Input
                  id="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  min={1}
                  max={500}
                  className="bg-white"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="occasion" className="font-inter text-gray-900">
                {L.occasion}
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Input
                  id="occasion"
                  placeholder={L.occasionPh}
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="font-inter text-gray-900">
              {L.message}
            </Label>
            <Textarea
              id="message"
              placeholder={L.messagePh}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="bg-white"
            />
          </div>

          {/* Produits complémentaires */}
          <div>
            <Label className="text-lg font-medium font-inter mb-4 block text-gray-900">
              {L.addProducts}
            </Label>
            <div className="grid md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const checked = selectedProducts.includes(product.id);
                return (
                  <Card
                    key={product.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={checked}
                    className={`cursor-pointer transition-all border-2 ${
                      checked ? "border-secondary shadow-secondary/20" : "border-gray-200 hover:border-secondary/50"
                    } bg-white`}
                    onClick={() => toggleProduct(product.id)}
                    onKeyDown={(e) => e.key === "Enter" && toggleProduct(product.id)}
                  >
                    <CardContent className="p-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded mb-2 border border-gray-200"
                        loading="lazy"
                        decoding="async"
                      />
                      <h4 className="font-medium text-sm font-inter mb-1 text-gray-900">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary font-medium">+{nf.format(product.price)}</span>
                        {checked && (
                          <Badge variant="secondary" className="text-xs">
                            {L.added}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aperçu */}
      <Card className="border border-primary/30 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-inter text-gray-900">
            {/* ✅ correction du bug : on ne peut pas faire <currentBox.icon /> directement */}
            {(() => {
              const Icon = currentBox.icon;
              return <Icon className="w-5 h-5 text-primary" />;
            })()}
            {L.preview}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg p-6 border border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                {(() => {
                  const Icon = currentBox.icon;
                  return <Icon className={`w-6 h-6 ${currentBox.color}`} />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold font-inter text-gray-900">{currentBox.name}</h3>
                <p className="text-gray-700 font-lato">{currentBox.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-lato text-gray-900">
                  {L.teamOf.replace("{n}", String(Math.max(1, Math.min(500, Math.floor(teamSize || 1)))))} 
                </span>
                <Badge variant="outline">
                  {Math.max(1, Math.min(500, Math.floor(teamSize || 1)))} × {nf.format(currentBox.basePrice)}
                </Badge>
              </div>

              {selectedProducts.length > 0 && (
                <div className="space-y-2">
                  <span className="font-medium font-inter text-gray-900">{L.boxContents}</span>
                  {selectedProducts.map((productId) => {
                    const product = sampleProducts.find((p) => p.id === productId)!;
                    const qty = Math.max(1, Math.min(500, Math.floor(teamSize || 1)));
                    return (
                      <div key={productId} className="flex justify-between text-sm">
                        <span className="font-lato text-gray-800">{product.name}</span>
                        <span className="text-secondary">
                          {qty} × {nf.format(product.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {occasion && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-lato text-gray-800">
                    {L.occasionLabel}: {occasion}
                  </span>
                </div>
              )}

              {message && (
                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="text-sm font-lato italic text-gray-800">“{message}”</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <span className="text-2xl font-bold text-primary font-inter">
                {nf.format(calculateTotal())}
              </span>
              <p className="text-sm text-gray-700 font-lato">{L.deliveryIncluded}</p>
            </div>

            <div className="flex gap-3">
              <Link to={withLang("/contact")}>
                <Button variant="outline" className="font-inter">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {L.quote}
                </Button>
              </Link>
              <Link to={withLang("/contact")}>
                <Button className="bg-black text-white hover:bg-black/90 font-inter">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {L.order}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
