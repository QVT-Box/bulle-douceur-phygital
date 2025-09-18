// src/pages/ContactPage.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle, Building2, Users, BarChart3 } from "lucide-react";
import QuoteRequestForm from "@/components/QuoteRequestForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Demandez votre <span className="text-primary">devis personnalisé</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato leading-relaxed">
              Nos experts QVT vous accompagnent pour une solution sur mesure (Box, SaaS ou Phygital)
              afin d’améliorer concrètement la qualité de vie au travail de vos collaborateurs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Colonne gauche : pitch + coordonnées */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Parlons de votre projet QVT
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Expliquez-nous vos objectifs (cohésion, prévention RPS, reconnaissance, pénibilité…).
                  Nous revenons vers vous très rapidement avec une proposition adaptée à votre budget,
                  votre effectif et vos contraintes opérationnelles.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-primary font-semibold">
                    ✓ Devis gratuit sous 48h <br />
                    ✓ Démo de la licence entreprise possible <br />
                    ✓ Personnalisation (logo, message, couleurs) • Livraison France & International
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                <Card className="card-professional">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">Téléphone</h3>
                        <p className="text-foreground/70">+33 (0)6 76 43 55 51 • 02 23 24 28 45</p>
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
                        <p className="text-foreground/70">
                          contact@qvtbox.fr • lamia.brechet@outlook.fr
                        </p>
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

              {/* Mini repères visuels */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-foreground/70" />
                  <p className="text-xs text-foreground/70">TPE → Grands groupes</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-foreground/70" />
                  <p className="text-xs text-foreground/70">10 à 1000+ salariés</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <BarChart3 className="w-5 h-5 mx-auto mb-1 text-foreground/70" />
                  <p className="text-xs text-foreground/70">Impact mesurable</p>
                </div>
              </div>
            </div>

            {/* Colonne droite : Formulaire devis détaillé */}
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Demande de devis / Démo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuoteRequestForm />
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
