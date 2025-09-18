import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

type QuoteForm = {
  // Identité
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  secteur: string;

  // Dimensions projet
  nb_salaries: number;
  nb_sites: number;
  pays_livraison: string; // ex: FR / EU / Monde
  delai: string;          // ex: <1 mois, 1-3 mois, etc.

  // Budget & cadence
  budget_par_salarie: number; // € / salarié
  cadence: string;            // ponctuel / trimestriel / semestriel / annuel

  // Offres
  offre_box: boolean;
  offre_saas: boolean;
  offre_phygital: boolean;

  // Personnalisation
  personnalisation_logo: boolean;
  produits_locaux: boolean;
  international: boolean;

  // Contenu & besoin
  types_box: string[]; // Focus/Reset, Mobilité, etc.
  message: string;
  consent: boolean;
};

const TYPES_BOX = [
  "Focus & Reset",
  "Mobilité & Terrain",
  "Pénibilité & Récupération",
  "Cohésion & Reconnaissance",
  "Événementielle (retraite, naissance, etc.)",
];

const QuoteRequestForm = () => {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<QuoteForm>({
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    secteur: "",

    nb_salaries: 50,
    nb_sites: 1,
    pays_livraison: "FR",
    delai: "1-3 mois",

    budget_par_salarie: 35,
    cadence: "ponctuel",

    offre_box: true,
    offre_saas: false,
    offre_phygital: false,

    personnalisation_logo: true,
    produits_locaux: true,
    international: false,

    types_box: [],
    message: "",
    consent: true,
  });

  const setNum = (key: keyof QuoteForm) => (v: number) =>
    setForm((f) => ({ ...f, [key]: Number.isNaN(v) ? 0 : v }));

  const toggleArrayVal = (key: keyof QuoteForm, value: string) => {
    const arr = form[key] as string[];
    const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
    setForm((f) => ({ ...f, [key]: next }));
  };

  const canSubmit =
    !!form.nom &&
    !!form.email &&
    !!form.entreprise &&
    form.nb_salaries > 0 &&
    form.budget_par_salarie > 0 &&
    form.consent;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || sending) return;

    setSending(true);
    try {
      // Corps envoyé à /api/contact (Resend) – lisible côté email
      const payload = {
        subject: "Demande de devis – QVT Box",
        nom: form.nom,
        email: form.email,
        telephone: form.telephone,
        entreprise: form.entreprise,
        secteur: form.secteur,
        nb_salaries: form.nb_salaries,
        nb_sites: form.nb_sites,
        pays_livraison: form.pays_livraison,
        delai: form.delai,
        budget_par_salarie: form.budget_par_salarie,
        cadence: form.cadence,
        offre_box: form.offre_box,
        offre_saas: form.offre_saas,
        offre_phygital: form.offre_phygital,
        personnalisation_logo: form.personnalisation_logo,
        produits_locaux: form.produits_locaux,
        international: form.international,
        types_box: form.types_box,
        message: form.message,
        source_page: "/contact",
      };

      // ENVOI EMAIL via /api/contact (que tu as déjà)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Échec de l’envoi");
      }

      toast.success("Demande envoyée ! Nous revenons vers vous sous 48h.");
      setForm((f) => ({ ...f, message: "" })); // on garde le reste pour pouvoir ajuster
    } catch (err: any) {
      toast.error("Erreur lors de l’envoi : " + (err?.message || "réessaye"));
    } finally {
      setSending(false);
    }
  }

  return (
    <Card className="card-professional">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Demande de devis détaillée
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-8" onSubmit={onSubmit}>
          {/* Identité */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nom complet *</Label>
              <Input
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <Label>Email professionnel *</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nom@entreprise.com"
                required
              />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                placeholder="06 XX XX XX XX"
              />
            </div>
            <div>
              <Label>Entreprise *</Label>
              <Input
                value={form.entreprise}
                onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
                placeholder="Nom de l’entreprise"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label>Secteur d’activité</Label>
              <Select
                value={form.secteur}
                onValueChange={(v) => setForm({ ...form, secteur: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industrie">Industrie</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="sante">Santé</SelectItem>
                  <SelectItem value="public">Secteur public</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dimensions projet */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label>Nombre de salariés concernés *</Label>
              <Input
                type="number"
                min={1}
                value={form.nb_salaries}
                onChange={(e) => setNum("nb_salaries")(parseInt(e.target.value, 10))}
              />
            </div>
            <div>
              <Label>Nombre de sites</Label>
              <Input
                type="number"
                min={1}
                value={form.nb_sites}
                onChange={(e) => setNum("nb_sites")(parseInt(e.target.value, 10))}
              />
            </div>
            <div>
              <Label>Pays de livraison</Label>
              <Select
                value={form.pays_livraison}
                onValueChange={(v) => setForm({ ...form, pays_livraison: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="EU">Union Européenne</SelectItem>
                  <SelectItem value="WORLD">Monde</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Horizon / Délai</Label>
              <Select
                value={form.delai}
                onValueChange={(v) => setForm({ ...form, delai: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un délai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1 mois">Moins d’1 mois</SelectItem>
                  <SelectItem value="1-3 mois">1 – 3 mois</SelectItem>
                  <SelectItem value="3-6 mois">3 – 6 mois</SelectItem>
                  <SelectItem value=">6 mois">Plus de 6 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget & cadence */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Budget par salarié (estimatif)</Label>
              <div className="mt-2">
                <Slider
                  value={[form.budget_par_salarie]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(v) => setForm({ ...form, budget_par_salarie: v[0] })}
                />
                <div className="flex justify-between text-sm text-foreground/70 mt-2">
                  <span>10€</span>
                  <span className="font-medium">
                    {form.budget_par_salarie}€ / salarié
                  </span>
                  <span>100€</span>
                </div>
              </div>
            </div>
            <div>
              <Label>Fréquence</Label>
              <Select
                value={form.cadence}
                onValueChange={(v) => setForm({ ...form, cadence: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la fréquence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ponctuel">Ponctuel</SelectItem>
                  <SelectItem value="trimestriel">Trimestriel</SelectItem>
                  <SelectItem value="semestriel">Semestriel</SelectItem>
                  <SelectItem value="annuel">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Offres */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.offre_box}
                onCheckedChange={(v) => setForm({ ...form, offre_box: !!v })}
                id="offre_box"
              />
              <Label htmlFor="offre_box">Box physiques</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.offre_saas}
                onCheckedChange={(v) => setForm({ ...form, offre_saas: !!v })}
                id="offre_saas"
              />
              <Label htmlFor="offre_saas">Licence SaaS</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.offre_phygital}
                onCheckedChange={(v) => setForm({ ...form, offre_phygital: !!v })}
                id="offre_phygital"
              />
              <Label htmlFor="offre_phygital">Solution phygitale (Box + SaaS)</Label>
            </div>
          </div>

          {/* Types de box souhaités */}
          <div>
            <Label>Types de box envisagés</Label>
            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              {TYPES_BOX.map((label) => (
                <label key={label} className="flex items-center gap-2 rounded-lg border p-3">
                  <Checkbox
                    checked={form.types_box.includes(label)}
                    onCheckedChange={() => toggleArrayVal("types_box", label)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personnalisation */}
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 rounded-lg border p-3">
              <Checkbox
                checked={form.personnalisation_logo}
                onCheckedChange={(v) => setForm({ ...form, personnalisation_logo: !!v })}
              />
              <span className="text-sm">Personnalisation (logo/couleurs/message)</span>
            </label>
            <label className="flex items-center gap-2 rounded-lg border p-3">
              <Checkbox
                checked={form.produits_locaux}
                onCheckedChange={(v) => setForm({ ...form, produits_locaux: !!v })}
              />
              <span className="text-sm">Produits locaux (région)</span>
            </label>
            <label className="flex items-center gap-2 rounded-lg border p-3">
              <Checkbox
                checked={form.international}
                onCheckedChange={(v) => setForm({ ...form, international: !!v })}
              />
              <span className="text-sm">Expédition internationale</span>
            </label>
          </div>

          {/* Message */}
          <div>
            <Label>Votre projet (contexte, objectifs, contraintes)</Label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Ex : 200 salariés sur 3 sites ; objectif : cohésion et prévention RPS ; souhait : box personnalisée à 35–40€/salarié, livraison en octobre."
              rows={5}
            />
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <Checkbox
              checked={form.consent}
              onCheckedChange={(v) => setForm({ ...form, consent: !!v })}
              id="consent"
            />
            <Label htmlFor="consent" className="text-sm text-foreground/80">
              J’accepte d’être recontacté(e) dans le cadre de ma demande de devis.
            </Label>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1 btn-primary" disabled={!canSubmit || sending}>
              {sending ? "Envoi en cours…" : "Demander mon devis"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() =>
                setForm({
                  ...form,
                  offre_saas: true,
                  offre_box: true,
                  cadence: "trimestriel",
                  types_box: ["Focus & Reset", "Cohésion & Reconnaissance"],
                  message:
                    "Projet phygital QVT (Box + SaaS) pour 200 salariés sur 2 sites, budget 30–40€/salarié, première livraison sous 2 mois.",
                })
              }
            >
              Préremplir un exemple
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;
