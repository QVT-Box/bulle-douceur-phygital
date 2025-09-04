import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    message: '',
    consentement: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consentement: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentement) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter le traitement de vos données pour continuer.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('leads_demo')
        .insert([{
          nom: formData.nom,
          email: formData.email,
          entreprise: formData.entreprise,
          message: formData.message,
          source_page: '/contact'
        }]);

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Message envoyé !",
        description: "Merci ! Nous revenons vers vous sous 24-48h.",
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Merci pour votre message !
              </h1>
              <p className="text-xl text-foreground/70 mb-8">
                Nous avons bien reçu votre demande et revenons vers vous sous 24-48h.
              </p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary-glow text-white"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Demander une <span className="text-accent">démo</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Découvrez comment QVT Box peut transformer la qualité de vie au travail dans votre entreprise. 
              Nos experts vous présenteront une solution personnalisée.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground font-kalam text-2xl">
                  Contactez nos experts
                </CardTitle>
                <CardDescription className="text-foreground/70">
                  Remplissez ce formulaire et nous vous recontactons sous 24-48h
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nom" className="text-foreground">Nom complet *</Label>
                    <Input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={handleInputChange}
                      placeholder="Votre nom et prénom"
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email professionnel *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre.email@entreprise.com"
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="entreprise" className="text-foreground">Entreprise</Label>
                    <Input
                      id="entreprise"
                      name="entreprise"
                      type="text"
                      value={formData.entreprise}
                      onChange={handleInputChange}
                      placeholder="Nom de votre entreprise"
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez-nous votre contexte, vos besoins et vos objectifs en matière de QVT..."
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50 resize-none"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consentement"
                      checked={formData.consentement}
                      onCheckedChange={handleConsentChange}
                    />
                    <Label htmlFor="consentement" className="text-sm leading-relaxed text-foreground/70">
                      J'accepte que mes données soient traitées par QVT Box pour répondre à ma demande 
                      de démonstration conformément à notre politique de confidentialité. *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading || !formData.consentement}
                    className="w-full bg-gradient-accent hover:opacity-90 text-white py-3"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        Demander une démo
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam text-2xl flex items-center gap-3">
                    📞 Nous Contacter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                      📱
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Téléphone</p>
                      <p className="text-foreground/70">
                        <a href="tel:0033223242845" className="hover:text-accent transition-colors">
                          +33 2 23 24 28 45
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                      📍
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Localisation</p>
                      <p className="text-foreground/70">Rennes, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                      ⏰
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Horaires</p>
                      <p className="text-foreground/70">Lundi - Vendredi : 9h - 18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam text-2xl">
                    🎯 Nos Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-primary text-white">SaaS QVT</Badge>
                      <span className="text-foreground/70 text-sm">Plateforme de bien-être</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-secondary text-white">Box</Badge>
                      <span className="text-foreground/70 text-sm">Coffrets cadeaux thématiques</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gradient-accent text-white">Boutique</Badge>
                      <span className="text-foreground/70 text-sm">Produits artisanaux français</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam text-2xl">
                    💬 Pourquoi nous contacter ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      Devis personnalisé pour votre entreprise
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      Démonstration de notre plateforme SaaS
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      Conseil en stratégie QVT
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      Commandes groupées boutique
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-kalam font-bold text-center text-foreground mb-12">
              ❓ Questions Fréquentes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam">
                    Combien coûte votre solution SaaS ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Nos tarifs débutent à 99€/mois pour les petites équipes. 
                    Contactez-nous pour un devis personnalisé selon vos besoins.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam">
                    Proposez-vous une période d'essai ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Oui ! Nous offrons 30 jours d'essai gratuit pour que vous puissiez 
                    tester notre plateforme sans engagement.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam">
                    Livrez-vous dans toute la France ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Oui, nos box et produits boutique sont livrés dans toute la France 
                    métropolitaine. Livraison gratuite dès 80€ d'achat.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-foreground font-kalam">
                    Puis-je personnaliser ma commande ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Absolument ! Nous créons des box sur mesure et personnalisons 
                    nos produits selon vos besoins spécifiques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;