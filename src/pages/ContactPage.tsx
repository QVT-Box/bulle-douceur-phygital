import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Contactez-<span className="text-accent">nous</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Notre équipe est là pour vous accompagner dans votre démarche QVT. 
              N'hésitez pas à nous contacter pour discuter de vos besoins.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-foreground font-kalam text-2xl">
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Prénom *
                    </label>
                    <Input 
                      placeholder="Votre prénom"
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom *
                    </label>
                    <Input 
                      placeholder="Votre nom"
                      className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input 
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Entreprise
                  </label>
                  <Input 
                    placeholder="Nom de votre entreprise"
                    className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </label>
                  <Input 
                    placeholder="Votre numéro de téléphone"
                    className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Décrivez-nous votre projet, vos besoins ou vos questions..."
                    rows={5}
                    className="bg-white/5 border-white/20 text-foreground placeholder:text-foreground/50 resize-none"
                  />
                </div>
                
                <Button className="w-full bg-gradient-accent hover:opacity-90 text-white">
                  Envoyer le message
                </Button>
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