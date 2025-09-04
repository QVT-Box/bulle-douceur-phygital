import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Crown, Package, Globe, Award, CheckCircle, Flag, Heart, Leaf } from "lucide-react";

const PartnersPage = () => {
  const [partnerType, setPartnerType] = useState<string>("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    productType: "",
    origin: "",
    description: "",
    ethicalCharter: false,
    qualityCertifications: "",
    annualProduction: "",
    currentClients: ""
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partner application:", { partnerType, ...formData });
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Devenez <span className="text-primary">Partenaire</span> QVT Box
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Rejoignez notre réseau de partenaires engagés pour le bien-être au travail. 
              Ensemble, créons des produits qui ont du sens !
            </p>
            
            {/* OCDE Section */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-kalam font-bold text-foreground">
                    Notre Engagement Éthique
                  </h2>
                </div>
                <p className="text-foreground/80 text-center mb-4">
                  Nos box privilégient le <strong>Made in France</strong> et les producteurs locaux. 
                  Nous sélectionnons aussi des produits issus de pays de l'OCDE, garantissant 
                  qualité, respect des normes sociales et environnementales, et cohérence avec notre démarche éthique.
                </p>
                <div className="flex justify-center gap-4">
                  <Badge className="bg-blue-600 text-white flex items-center gap-1">
                    <Flag className="w-3 h-3" />
                    🇫🇷 France Prioritaire
                  </Badge>
                  <Badge className="bg-green-600 text-white flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    🇪🇺 Europe & OCDE
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Type Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-foreground font-kalam text-2xl text-center">
                Choisissez votre type de partenariat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={partnerType} onValueChange={setPartnerType}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Premium Partner */}
                  <div className="relative">
                    <RadioGroupItem value="premium" id="premium" className="sr-only" />
                    <Label 
                      htmlFor="premium" 
                      className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        partnerType === "premium" 
                          ? "border-yellow-500 bg-yellow-500/10" 
                          : "border-white/20 hover:border-yellow-500/50"
                      }`}
                    >
                      <div className="text-center">
                        <Crown className={`w-12 h-12 mx-auto mb-4 ${
                          partnerType === "premium" ? "text-yellow-500" : "text-foreground/70"
                        }`} />
                        <h3 className="text-xl font-kalam font-bold text-foreground mb-2">
                          Partenaire Premium
                        </h3>
                        <p className="text-foreground/70 text-sm mb-4">
                          Forfait marketing complet, visibilité maximale, envoi d'échantillons prioritaire
                        </p>
                        <div className="space-y-2 text-xs text-foreground/60">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Mise en avant dans nos communications</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Support marketing dédié</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Priorité sur les échantillons</span>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Standard Partner */}
                  <div className="relative">
                    <RadioGroupItem value="standard" id="standard" className="sr-only" />
                    <Label 
                      htmlFor="standard" 
                      className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        partnerType === "standard" 
                          ? "border-primary bg-primary/10" 
                          : "border-white/20 hover:border-primary/50"
                      }`}
                    >
                      <div className="text-center">
                        <Package className={`w-12 h-12 mx-auto mb-4 ${
                          partnerType === "standard" ? "text-primary" : "text-foreground/70"
                        }`} />
                        <h3 className="text-xl font-kalam font-bold text-foreground mb-2">
                          Partenaire Standard
                        </h3>
                        <p className="text-foreground/70 text-sm mb-4">
                          Proposez vos produits dans notre boutique via formulaire et échantillons
                        </p>
                        <div className="space-y-2 text-xs text-foreground/60">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Référencement boutique</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Processus simplifié</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Support produit</span>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Partner Form */}
          {partnerType && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground font-kalam text-2xl">
                  Formulaire de candidature
                  {partnerType === "premium" && (
                    <Crown className="inline w-6 h-6 text-yellow-500 ml-2" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">
                        Nom de l'entreprise *
                      </Label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Votre entreprise"
                        className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground font-medium">
                        Nom du contact *
                      </Label>
                      <Input
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Votre nom"
                        className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">
                        Email *
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="contact@entreprise.com"
                        className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-foreground font-medium">
                        Téléphone
                      </Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="01 23 45 67 89"
                        className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground font-medium">
                      Site web
                    </Label>
                    <Input
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.votre-site.com"
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">
                        Type de produits *
                      </Label>
                      <Select value={formData.productType} onValueChange={(value) => handleInputChange("productType", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-foreground">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wellbeing">Bien-être & Santé</SelectItem>
                          <SelectItem value="ergonomics">Ergonomie & Confort</SelectItem>
                          <SelectItem value="stationery">Papeterie & Organisation</SelectItem>
                          <SelectItem value="cosmetics">Cosmétiques naturels</SelectItem>
                          <SelectItem value="food">Alimentation & Boissons</SelectItem>
                          <SelectItem value="digital">Produits digitaux</SelectItem>
                          <SelectItem value="events">Événementiel</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground font-medium">
                        Origine géographique *
                      </Label>
                      <Select value={formData.origin} onValueChange={(value) => handleInputChange("origin", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-foreground">
                          <SelectValue placeholder="Sélectionnez l'origine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="france">🇫🇷 France</SelectItem>
                          <SelectItem value="europe">🇪🇺 Europe</SelectItem>
                          <SelectItem value="ocde">🌍 Pays OCDE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground font-medium">
                      Description de vos produits *
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Décrivez vos produits, leur fabrication, leurs avantages pour le bien-être au travail..."
                      rows={4}
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50 resize-none"
                      required
                    />
                  </div>

                  {/* Premium Partner Additional Fields */}
                  {partnerType === "premium" && (
                    <div className="space-y-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                      <h3 className="text-lg font-kalam font-bold text-foreground flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        Informations Premium
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-foreground font-medium">
                            Certifications qualité
                          </Label>
                          <Input
                            value={formData.qualityCertifications}
                            onChange={(e) => handleInputChange("qualityCertifications", e.target.value)}
                            placeholder="Bio, Label Rouge, Made in France..."
                            className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                          />
                        </div>
                        <div>
                          <Label className="text-foreground font-medium">
                            Production annuelle
                          </Label>
                          <Select value={formData.annualProduction} onValueChange={(value) => handleInputChange("annualProduction", value)}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-foreground">
                              <SelectValue placeholder="Volume de production" />
                            </SelectTrigger>
                            <SelectContent>
                          <SelectItem value="small">Artisanal (&lt; 1000 unités/an)</SelectItem>
                          <SelectItem value="medium">PME (1000-10000 unités/an)</SelectItem>
                          <SelectItem value="large">Grande production (&gt; 10000 unités/an)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-foreground font-medium">
                          Clients actuels (références)
                        </Label>
                        <Textarea
                          value={formData.currentClients}
                          onChange={(e) => handleInputChange("currentClients", e.target.value)}
                          placeholder="Listez quelques références clients (optionnel)"
                          rows={2}
                          className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50 resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Ethical Charter */}
                  <div className="space-y-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <h3 className="text-lg font-kalam font-bold text-foreground flex items-center gap-2">
                      <Heart className="w-5 h-5 text-green-500" />
                      Engagement Éthique QVT Box
                    </h3>
                    
                    <div className="space-y-3 text-sm text-foreground/80">
                      <div className="flex items-start gap-2">
                        <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Respect de l'environnement et développement durable</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Qualité et sécurité des produits garanties</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Heart className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Contribution positive au bien-être au travail</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Respect des normes sociales et du travail équitable</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ethicalCharter"
                        checked={formData.ethicalCharter}
                        onCheckedChange={(checked) => handleInputChange("ethicalCharter", !!checked)}
                      />
                      <Label htmlFor="ethicalCharter" className="text-foreground font-medium cursor-pointer">
                        J'accepte de respecter la charte éthique QVT Box *
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-accent hover:opacity-90 text-white text-lg py-3"
                    disabled={!formData.ethicalCharter}
                  >
                    {partnerType === "premium" ? "Candidater en Premium" : "Soumettre ma candidature"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PartnersPage;