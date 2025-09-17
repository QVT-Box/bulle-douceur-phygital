// src/components/AdvancedProductFilters.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Filter,
  Search,
  X,
  MapPin,
  Star,
  Euro,
  Tag,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterState {
  search: string;
  priceRange: [number, number];
  regions: string[];
  categories: string[];
  ratings: number[];          // <-- nombres, pas string
  certifications: string[];
  availability: string;
  sortBy: string;
}

interface AdvancedProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  productCount: number;
}

export const AdvancedProductFilters = ({
  onFiltersChange,
  productCount,
}: AdvancedProductFiltersProps) => {
  const { language, t } = useLanguage();
  const tr = (key: string, fr: string, en: string) => {
    const s = t(key);
    return s !== key ? s : language === "fr" ? fr : en;
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: [0, 100],
    regions: [],
    categories: [],
    ratings: [],
    certifications: [],
    availability: "all",
    sortBy: "relevance",
  });

  const regions = [
    "Provence-Alpes-Côte d'Azur",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Normandie",
    "Grand Est",
  ];

  const categories = [
    "Bien-être",
    "Ergonomie",
    "Énergie",
    "Terroir Local",
    "Aromathérapie",
    "Tisanes & Thés",
    "Accessoires",
    "Gourmandises",
  ];

  const certifications = [
    "Bio",
    "Made in France",
    "Artisanal",
    "Commerce Équitable",
    "Éco-conçu",
    "AOP/IGP",
    "Label Rouge",
  ];

  const sortOptions = [
    { value: "relevance", label: tr("filters.sort.relevance", "Pertinence", "Relevance") },
    { value: "price-asc", label: tr("filters.sort.price-asc", "Prix croissant", "Price ↑") },
    { value: "price-desc", label: tr("filters.sort.price-desc", "Prix décroissant", "Price ↓") },
    { value: "rating", label: tr("filters.sort.rating", "Mieux notés", "Top rated") },
    { value: "newest", label: tr("filters.sort.newest", "Nouveautés", "Newest") },
    { value: "distance", label: tr("filters.sort.distance", "Proximité", "Closest") },
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  // Toggle pour string[]
  const toggleStringFilter = (filterType: "regions" | "categories" | "certifications", value: string) => {
    const current = filters[filterType] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [filterType]: updated } as Partial<FilterState>);
  };

  // Toggle pour number[] (ratings)
  const toggleNumberFilter = (filterType: "ratings", value: number) => {
    const current = filters[filterType] as number[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilters({ [filterType]: updated } as Partial<FilterState>);
  };

  const clearFilters = () => {
    const cleared: FilterState = {
      search: "",
      priceRange: [0, 100],
      regions: [],
      categories: [],
      ratings: [],
      certifications: [],
      availability: "all",
      sortBy: "relevance",
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const hasActiveFilters =
    !!filters.search ||
    filters.regions.length > 0 ||
    filters.categories.length > 0 ||
    filters.ratings.length > 0 ||
    filters.certifications.length > 0 ||
    filters.availability !== "all" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100;

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-inter text-gray-900">
            <Filter className="w-5 h-5 text-black" />
            {tr("filters.advanced", "Filtres avancés", "Advanced filters")}
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {productCount} {language === "fr" ? "produits" : "items"}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setIsExpanded((v) => !v)}
            className="font-inter border-gray-900 text-gray-900 hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {isExpanded
              ? tr("filters.collapse", "Réduire", "Collapse")
              : tr("filters.expand", "Développer", "Expand")}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Recherche */}
        <div>
          <Label className="font-inter mb-2 block text-gray-800">
            {tr("filters.search", "Recherche", "Search")}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder={
                language === "fr"
                  ? "Produit, artisan, région..."
                  : "Product, maker, region..."
              }
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10 border-gray-300 focus-visible:ring-gray-900"
            />
          </div>
        </div>

        {/* Tri (contraste fort) */}
        <div className="flex items-center gap-4">
          <Label className="font-inter whitespace-nowrap text-gray-800">
            {tr("filters.sortBy", "Trier par :", "Sort by:")}
          </Label>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => {
              const active = filters.sortBy === option.value;
              return (
                <Button
                  key={option.value}
                  onClick={() => updateFilters({ sortBy: option.value })}
                  size="sm"
                  className={
                    active
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                  }
                  variant={active ? "default" : "outline"}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Prix */}
            <div>
              <Label className="font-inter mb-3 block text-gray-800">
                <Euro className="inline w-4 h-4 mr-1" />
                {tr("filters.price", "Fourchette de prix", "Price range")} : {filters.priceRange[0]}€ - {filters.priceRange[1]}€
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  updateFilters({ priceRange: value as [number, number] })
                }
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Régions */}
            <div>
              <Label className="font-inter mb-3 block text-gray-800">
                <MapPin className="inline w-4 h-4 mr-1" />
                {tr("filters.regions", "Régions", "Regions")}
              </Label>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => {
                  const active = filters.regions.includes(region);
                  return (
                    <Button
                      key={region}
                      onClick={() => toggleStringFilter("regions", region)}
                      size="sm"
                      className={
                        active
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      }
                      variant={active ? "default" : "outline"}
                    >
                      {region}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Catégories */}
            <div>
              <Label className="font-inter mb-3 block text-gray-800">
                <Tag className="inline w-4 h-4 mr-1" />
                {tr("filters.categories", "Catégories", "Categories")}
              </Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = filters.categories.includes(category);
                  return (
                    <Button
                      key={category}
                      onClick={() => toggleStringFilter("categories", category)}
                      size="sm"
                      className={
                        active
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      }
                      variant={active ? "default" : "outline"}
                    >
                      {category}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label className="font-inter mb-3 block text-gray-800">
                <Star className="inline w-4 h-4 mr-1" />
                {tr("filters.ratingMin", "Note minimum", "Minimum rating")}
              </Label>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const active = filters.ratings.includes(rating);
                  return (
                    <Button
                      key={rating}
                      onClick={() => toggleNumberFilter("ratings", rating)}
                      size="sm"
                      className={
                        active
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      }
                      variant={active ? "default" : "outline"}
                    >
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {rating}+
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <Label className="font-inter mb-3 block text-gray-800">
                {tr("filters.labels", "Certifications & Labels", "Certifications & labels")}
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert}
                      checked={filters.certifications.includes(cert)}
                      onCheckedChange={() => toggleStringFilter("certifications", cert)}
                    />
                    <Label htmlFor={cert} className="text-sm font-lato cursor-pointer text-gray-800">
                      {cert}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div>
              <Label className="font-inter mb-3 block text-gray-800">
                {tr("filters.availability", "Disponibilité", "Availability")}
              </Label>
              <div className="flex gap-2">
                {[
                  { value: "all", label: tr("filters.av.all", "Tous", "All") },
                  { value: "in-stock", label: tr("filters.av.stock", "En stock", "In stock") },
                  { value: "pre-order", label: tr("filters.av.pre", "Pré-commande", "Pre-order") },
                  { value: "coming-soon", label: tr("filters.av.soon", "Bientôt disponible", "Coming soon") },
                ].map((option) => {
                  const active = filters.availability === option.value;
                  return (
                    <Button
                      key={option.value}
                      onClick={() => updateFilters({ availability: option.value })}
                      size="sm"
                      className={
                        active
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      }
                      variant={active ? "default" : "outline"}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="text-gray-800 border-gray-300 hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
              {tr("filters.clear", "Effacer les filtres", "Clear filters")}
            </Button>

            <div className="flex gap-2">
              {filters.regions.length > 0 && (
                <Badge variant="secondary">
                  {filters.regions.length} {language === "fr" ? "région" : "region"}
                  {filters.regions.length > 1 ? "s" : ""}
                </Badge>
              )}
              {filters.categories.length > 0 && (
                <Badge variant="secondary">
                  {filters.categories.length} {language === "fr" ? "catégorie" : "category"}
                  {filters.categories.length > 1 ? "s" : ""}
                </Badge>
              )}
              {filters.certifications.length > 0 && (
                <Badge variant="secondary">
                  {filters.certifications.length} {language === "fr" ? "label" : "label"}
                  {filters.certifications.length > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
