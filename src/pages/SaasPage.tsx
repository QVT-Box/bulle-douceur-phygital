import Navigation from "@/components/Navigation";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SaasPage = () => {
  const features = [
    {
      title: "Tableau de Bord Émotionnel",
      description: "Visualisez le bien-être de vos équipes en temps réel avec des bulles colorées intuitives",
      icon: "🫧",
      benefits: ["Vue d'ensemble instantanée", "Indicateurs visuels", "Alertes précoces"]
    },
    {
      title: "Heatmap du Bien-être",
      description: "Identifiez les zones de stress et les équipes épanouies d'un seul coup d'œil",
      icon: "🗺️",
      benefits: ["Cartographie visuelle", "Zones d'attention", "Évolution temporelle"]
    },
    {
      title: "Alertes RPS Intelligentes",
      description: "Recevez des notifications bienveillantes pour prévenir les risques psychosociaux",
      icon: "🚨",
      benefits: ["Prévention automatique", "Accompagnement personnalisé", "Confidentialité garantie"]
    },
    {
      title: "Export DUERP Simplifié",
      description: "Générez automatiquement vos documents réglementaires avec nos données",
      icon: "📋",
      benefits: ["Conformité automatique", "Mise à jour continue", "Gain de temps"]
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "99€",
      period: "/mois",
      description: "Parfait pour les petites équipes",
      features: ["Jusqu'à 50 collaborateurs", "Dashboard de base", "Support email", "Export mensuel"],
      color: "primary"
    },
    {
      name: "Professional",
      price: "199€",
      period: "/mois",
      description: "Idéal pour les entreprises en croissance",
      features: ["Jusqu'à 200 collaborateurs", "Dashboard avancé", "Alertes RPS", "Support prioritaire", "Export illimité"],
      color: "secondary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      period: "",
      description: "Solution complète pour les grandes organisations",
      features: ["Collaborateurs illimités", "Fonctionnalités sur mesure", "Intégrations API", "Support dédié", "Formation incluse"],
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <FloatingBubbles />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-6">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-kalam font-bold text-foreground mb-6">
              Le <span className="text-secondary">SaaS</span> qui prend soin
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
              Prenez le pouls de vos équipes, sans intrusion, avec bienveillance. 
              Notre plateforme transforme la QVT en expérience poétique et humaine.
            </p>
            <Button className="bg-gradient-secondary hover:opacity-90 text-white font-medium px-8 py-3 text-lg">
              Demander une Démo Gratuite
            </Button>
          </div>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-kalam font-bold text-center text-foreground mb-12">
              ✨ Fonctionnalités Clés
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                  <CardHeader>
                    <CardTitle className="text-foreground font-kalam flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className="w-2 h-2 rounded-full bg-secondary"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-kalam font-bold text-center text-foreground mb-12">
              💎 Nos Formules
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all ${plan.popular ? 'ring-2 ring-secondary' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-secondary text-white">
                      Le plus populaire
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-foreground font-kalam text-xl text-center">
                      {plan.name}
                    </CardTitle>
                    <div className="text-center">
                      <span className={`text-3xl font-bold text-${plan.color}`}>{plan.price}</span>
                      <span className="text-foreground/70">{plan.period}</span>
                    </div>
                    <p className="text-foreground/70 text-center text-sm">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className={`w-2 h-2 rounded-full bg-${plan.color}`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full bg-gradient-${plan.color} hover:opacity-90 text-white`}>
                      {plan.name === 'Enterprise' ? 'Nous contacter' : 'Essayer gratuitement'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-white/5 rounded-3xl backdrop-blur-md">
            <h2 className="text-3xl font-kalam font-bold text-foreground mb-4">
              Prêt à transformer votre QVT ?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Rejoignez les entreprises qui ont choisi la bienveillance comme moteur de performance. 
              Essayez notre solution pendant 30 jours, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-secondary hover:opacity-90 text-white">
                Démarrer l'essai gratuit
              </Button>
              <Button variant="outline" className="bg-white/20 border-white/30 text-foreground hover:bg-white/30">
                Voir la démo
              </Button>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SaasPage;