// src/pages/ContactPage.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin, MessageCircle, Send, BarChart3 } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "",
    telephone: "",
    taille_effectif: "",
    type_offre: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1) Enregistrer le lead en base
      const { error } = await supabase.from("leads_demo").insert([
        {
          nom: formData.nom,
          email: formData.email,
          entreprise: formData.entreprise,
          message: formData.message,
          source_page: "/contact",
        },
      ]);

      if (error) throw error;

      // 2) Envoyer l'email via la route Vercel /api/contact
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const details = await res.json().catch(() => ({}));
        throw new Error(details?.error || "Contact API error");
      }

      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontactons sous 48h pour votre devis ou démo.",
      });

      setFormData({
        nom: "",
        email: "",
        entreprise: "",
        telephone: "",
        taille_effectif: "",
        type_offre: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Demandez votre <span className="text-primary">devis personnalisé</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato leading-relaxed">
              Nos experts QVT vous accompagnent dans la mise en place de solutions sur mesure
              pour améliorer la qualité de vie au travail de vos collaborateurs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Parlons de votre projet QVT</h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Contactez-nous pour recevoir un devis personnalisé, une démonstration de notre licence SaaS
                  ou simplement échanger sur vos besoins en qualité de vie au travail.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-primary font-semibold">
                    ✓ Toutes nos prestations sont sur mesure<br />
                    ✓ Devis gratuit sous 48h<br />
                    ✓ Démo de la licence entreprise disponible
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">Téléphone</h3>
                        <p className="text-foreground/70">+33 (0)6 76 43 55 51/ 02 23 24 28 45</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">Email</h3>
                        <p className="text-foreground/70">contact@qvtbox.fr / lamia.brechet@outlook.fr</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">Adresse</h3>
                        <p className="text-foreground/70">Rennes, France</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Demande de devis / Démo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom complet *</Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="nom@entreprise.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entreprise">Entreprise *</Label>
                      <Input
                        id="entreprise"
                        name="entreprise"
                        value={formData.entreprise}
                        onChange={handleInputChange}
                        required
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="taille_effectif">Taille de l'effectif</Label>
                      <Select
                        value={formData.taille_effectif}
                        onValueChange={(value) => setFormData({ ...formData, taille_effectif: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Nombre de salariés" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1 à 10 salariés</SelectItem>
                          <SelectItem value="11-50">11 à 50 salariés</SelectItem>
                          <SelectItem value="51-200">51 à 200 salariés</SelectItem>
                          <SelectItem value="201-500">201 à 500 salariés</SelectItem>
                          <SelectItem value="500+">Plus de 500 salariés</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type_offre">Type d'offre souhaitée</Label>
                      <Select
                        value={formData.type_offre}
                        onValueChange={(value) => setFormData({ ...formData, type_offre: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une offre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="box-physique">Box physiques uniquement</SelectItem>
                          <SelectItem value="licence-saas">Licence SaaS entreprise</SelectItem>
                          <SelectItem value="phygital">Solution phygitale complète</SelectItem>
                          <SelectItem value="partenariat">Partenariat local</SelectItem>
                          <SelectItem value="information">Demande d'information</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Décrivez votre projet QVT, vos besoins spécifiques ou demandez une démonstration..."
                      rows={5}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="flex-1 btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : <>
                        <Send className="w-4 h-4 mr-2" />
                        Demander un devis
                      </>}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          type_offre: "licence-saas",
                          message:
                            "Je souhaite recevoir une démonstration de la licence SaaS QVT Box pour mon entreprise.",
                        })
                      }
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Recevoir une démo
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
