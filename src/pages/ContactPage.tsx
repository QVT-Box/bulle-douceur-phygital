// src/pages/ContactPage.tsx
import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

import { Phone, Mail, MapPin, MessageCircle, Send, Building2, Users, Euro, CalendarDays, Truck } from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = {
  nom: string;
  email: string;
  entreprise: string;
  telephone: string;

  taille_effectif: string;
  budget_par_salarie: string;
  frequence: "ponctuelle" | "1 fois/an" | "2 fois/an" | "trimestrielle";
  zones_livraison: "France" | "France + Europe" | "International";
  delai: "urgent" | "sous 1 mois" | "1-3 mois" | "à préciser";
  type_offre: "box-physique" | "licence-saas" | "phygital" | "partenariat" | "information";

  objectifs: string[];
  message: string;
};

const defaultState: FormState = {
  nom: "",
  email: "",
  entreprise: "",
  telephone: "",

  taille_effectif: "",
  budget_par_salarie: "",
  frequence: "1 fois/an",
  zones_livraison: "France",
  delai: "1-3 mois",
  type_offre: "phygital",

  objectifs: [],
  message: "",
};

const objectifsList = [
  "Améliorer la QVCT (bien-être)",
  "Cohésion & reconnaissance",
  "Réduire la pénibilité / récupérer",
  "Accompagner les managers",
  "Événement / cadeau d’équipe",
  "Prévention RPS & pilotage (SaaS)",
];

export default function ContactPage() {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState<FormState>(defaultState);

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((p) => ({ ...p, [key]: value }));

  const toggleObjectif = (label: string) =>
    setData((p) => {
      const exists = p.objectifs.includes(label);
      return { ...p, objectifs: exists ? p.objectifs.filter((x) => x !== label) : [...p.objectifs, label] };
    });

  const canGoStep2 =
    data.nom.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(data.email) &&
    data.entreprise.trim().length > 1;

  const canGoStep3 =
    data.taille_effectif.length > 0 &&
    data.budget_par_salarie.trim().length > 0 &&
    data.type_offre !== undefined;

  const canSend = data.objectifs.length > 0 || data.message.trim().length > 5;

  async function handleSend() {
    if (!canSend) {
      toast({
        title: "Détaillez un peu votre besoin",
        description: "Sélectionnez au moins un objectif ou ajoutez un message.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const objectifsText = data.objectifs.join(", ") || "—";
      const payload = {
        site_domain: "qvtbox.com",
        nom: data.nom,
        email: data.email,
        entreprise: data.entreprise,
        telephone: data.telephone || "—",
        taille_effectif: data.taille_effectif || "—",
        budget_par_salarie: data.budget_par_salarie || "—",
        frequence: data.frequence,
        zones_livraison: data.zones_livraison,
        delai: data.delai,
        type_offre: data.type_offre,
        objectifs: objectifsText,
        message: data.message || "—",
        request_type: "DEVIS",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({ title: "Demande envoyée ✅", description: "Merci ! Nous revenons sous 48h avec un devis." });
      setData(defaultState);
      setStep(1);
    } catch (err: any) {
      toast({ title: "Envoi impossible", description: err?.message || "Un problème est survenu.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

  // Envoi direct pour DEMO (sans questionnaire)
  async function handleSendDemo() {
    if (!canGoStep2) {
      toast({
        title: "Complétez vos coordonnées",
        description: "Nom, email pro et entreprise sont requis.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const payload = {
        site_domain: "qvtbox.com",
        nom: data.nom,
        email: data.email,
        entreprise: data.entreprise,
        telephone: data.telephone || "—",
        type_offre: "licence-saas",
        message: data.message || "Demande de démo de la licence SaaS QVT Box.",
        request_type: "DEMO",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({ title: "Demande de démo envoyée ✅", description: "On vous recontacte très vite pour planifier la démo." });
      setData(defaultState);
      setStep(1);
    } catch (err: any) {
      toast({ title: "Envoi impossible", description: err?.message || "Un problème est survenu.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-inter">
              Demandez votre <span className="text-primary">devis personnalisé</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-lato">
              Box phygitales 🇫🇷 + Licence SaaS entreprise. Pour une démo rapide, utilisez le bouton dédié.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">+33 (0)6 76 43 55 51 / 02 23 24 28 45</p>
                </CardContent>
              </Card>

              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">contact@qvtbox.com</p>
                </CardContent>
              </Card>

              <Card className="card-professional">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Rennes, France</p>
                </CardContent>
              </Card>

              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-sm text-primary font-semibold">
                  ✓ Devis sous 48h • ✓ Made in France • ✓ Phygital (Box + SaaS) • ✓ International possible
                </p>
              </div>
            </div>

            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Demande de devis / Démo
                  <Badge variant="secondary" className="ml-2">Étape {step}/3</Badge>
                </CardTitle>
                <div className="mt-2">
                  <Progress value={progress} className="h-2 w-full" />
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">1) Vos coordonnées</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom">Nom complet *</Label>
                        <Input id="nom" name="nom" value={data.nom} onChange={onChange} placeholder="Votre nom" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input id="email" name="email" type="email" value={data.email} onChange={onChange} placeholder="nom@entreprise.com" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="entreprise">Entreprise *</Label>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <Input id="entreprise" name="entreprise" value={data.entreprise} onChange={onChange} placeholder="Nom de votre entreprise" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input id="telephone" name="telephone" type="tel" value={data.telephone} onChange={onChange} placeholder="06 XX XX XX XX" />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                      <Button
                        className="btn-primary"
                        type="button"
                        onClick={() => {
                          if (!canGoStep2) {
                            toast({
                              title: "Complétez vos coordonnées",
                              description: "Nom, email pro et entreprise sont requis.",
                              variant: "destructive",
                            });
                            return;
                          }
                          setStep(2);
                        }}
                      >
                        Continuer (devis guidé)
                      </Button>

                      {/* Envoi direct démo (pas de questionnaire) */}
                      <Button
                        type="button"
                        variant="outline"
                        disabled={sending}
                        onClick={handleSendDemo}
                        title="Envoi immédiat sans questionnaire"
                      >
                        {sending ? "Envoi…" : "Demander une démo (envoi direct)"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">2) Paramètres du devis</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Taille de l’effectif *</Label>
                        <Select value={data.taille_effectif} onValueChange={(v) => setField("taille_effectif", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Nombre de salariés" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1 à 10</SelectItem>
                            <SelectItem value="11-50">11 à 50</SelectItem>
                            <SelectItem value="51-200">51 à 200</SelectItem>
                            <SelectItem value="201-500">201 à 500</SelectItem>
                            <SelectItem value="500+">500+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Budget / salarié (indicatif) *</Label>
                        <div className="flex items-center gap-2">
                          <Euro className="w-4 h-4 text-muted-foreground" />
                          <Input
                            name="budget_par_salarie"
                            value={data.budget_par_salarie}
                            onChange={onChange}
                            placeholder="ex: 30–40 €"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Fréquence</Label>
                        <Select value={data.frequence} onValueChange={(v: any) => setField("frequence", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Fréquence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ponctuelle">Ponctuelle</SelectItem>
                            <SelectItem value="1 fois/an">1 fois/an</SelectItem>
                            <SelectItem value="2 fois/an">2 fois/an</SelectItem>
                            <SelectItem value="trimestrielle">Trimestrielle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Zones de livraison</Label>
                        <Select value={data.zones_livraison} onValueChange={(v: any) => setField("zones_livraison", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Zones" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="France + Europe">France + Europe</SelectItem>
                            <SelectItem value="International">International</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Échéance / Délai</Label>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-muted-foreground" />
                          <Select value={data.delai} onValueChange={(v: any) => setField("delai", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Quand ?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="sous 1 mois">Sous 1 mois</SelectItem>
                              <SelectItem value="1-3 mois">1–3 mois</SelectItem>
                              <SelectItem value="à préciser">À préciser</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Type d’offre</Label>
                        <Select value={data.type_offre} onValueChange={(v: any) => setField("type_offre", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une offre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="box-physique">Box physiques uniquement</SelectItem>
                            <SelectItem value="licence-saas">Licence SaaS entreprise</SelectItem>
                            <SelectItem value="phygital">Solution phygitale (Box + SaaS)</SelectItem>
                            <SelectItem value="partenariat">Partenariat local</SelectItem>
                            <SelectItem value="information">Demande d’information</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button
                        className="btn-primary"
                        type="button"
                        onClick={() => {
                          if (!canGoStep3) {
                            toast({
                              title: "Complétez le devis",
                              description: "Taille d’effectif et budget / salarié sont requis.",
                              variant: "destructive",
                            });
                            return;
                          }
                          setStep(3);
                        }}
                      >
                        Continuer
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">3) Objectifs & précisions</h3>

                    <div>
                      <Label className="mb-2 block">Objectifs principaux (choisir 1+)</Label>
                      <div className="flex flex-wrap gap-2">
                        {objectifsList.map((o) => {
                          const active = data.objectifs.includes(o);
                          return (
                            <Button
                              key={o}
                              type="button"
                              variant={active ? "default" : "outline"}
                              className={active ? "bg-primary text-white" : ""}
                              onClick={() => toggleObjectif(o)}
                              size="sm"
                            >
                              {o}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Contexte / attentes (facultatif)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={data.message}
                        onChange={onChange}
                        placeholder="Décrivez votre projet : équipes ciblées, contraintes, idées de thématiques, logistique…"
                        rows={5}
                      />
                    </div>

                    <div className="bg-muted/40 rounded-lg p-4 text-sm">
                      <div className="grid md:grid-cols-2 gap-3">
                        <p><Users className="inline w-4 h-4 mr-1" /> Effectif : <b>{data.taille_effectif || "—"}</b></p>
                        <p><Euro className="inline w-4 h-4 mr-1" /> Budget/Salarié : <b>{data.budget_par_salarie || "—"}</b></p>
                        <p><Truck className="inline w-4 h-4 mr-1" /> Zones : <b>{data.zones_livraison}</b></p>
                        <p><CalendarDays className="inline w-4 h-4 mr-1" /> Délai : <b>{data.delai}</b></p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setStep(2)}>
                        Retour
                      </Button>
                      <Button className="btn-primary" type="button" disabled={sending} onClick={handleSend}>
                        {sending ? "Envoi…" : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer la demande de devis
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
