import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap, Crown, Shield } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Parfait pour les petites équipes',
      icon: Zap,
      monthlyPrice: 29,
      annualPrice: 290,
      maxUsers: 25,
      features: [
        'Tableau de bord basique',
        'Sondages bien-être mensuels',
        'Alertes email simples',
        'Rapports standards',
        'Support email'
      ],
      popular: false
    },
    {
      name: 'Professional',
      description: 'Pour les entreprises en croissance',
      icon: Star,
      monthlyPrice: 79,
      annualPrice: 790,
      maxUsers: 100,
      features: [
        'Tableau de bord avancé',
        'IA prédictive',
        'Alertes RPS en temps réel',
        'Analyse par département',
        'Plans d\'action automatisés',
        'Intégrations HR',
        'Support prioritaire'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Solution complète pour grandes organisations',
      icon: Crown,
      monthlyPrice: 199,
      annualPrice: 1990,
      maxUsers: 'Illimité',
      features: [
        'Toutes les fonctionnalités Pro',
        'IA prédictive avancée',
        'Tableaux de bord personnalisés',
        'API complète',
        'Conformité RGPD renforcée',
        'Formation équipes',
        'Support dédié 24/7',
        'Déploiement on-premise'
      ],
      popular: false
    }
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyTotal = monthly * 12;
    const savings = ((monthlyTotal - annual) / monthlyTotal * 100).toFixed(0);
    return savings;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Tarifs Transparents</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Choisissez le plan adapté à la taille de votre organisation
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Mensuel
          </span>
          <Switch 
            checked={isAnnual} 
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-primary"
          />
          <span className={`${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Annuel
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="ml-2">
              Jusqu'à 20% d'économie
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);
          
          return (
            <Card 
              key={index} 
              className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Le plus populaire
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{price}€</span>
                    <span className="text-muted-foreground ml-1">
                      /{isAnnual ? 'an' : 'mois'}
                    </span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Économisez {savings}% vs mensuel
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-2">
                    Jusqu'à {plan.maxUsers} utilisateurs
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Enterprise' ? 'Nous contacter' : 'Essai gratuit 14 jours'}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="text-primary" size={24} />
            <h3 className="text-xl font-semibold">Garanties & Sécurité</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="font-medium mb-1">Essai gratuit</div>
              <div className="text-muted-foreground">14 jours sans engagement</div>
            </div>
            <div className="text-center">
              <div className="font-medium mb-1">Conformité RGPD</div>
              <div className="text-muted-foreground">Données hébergées en France</div>
            </div>
            <div className="text-center">
              <div className="font-medium mb-1">Support inclus</div>
              <div className="text-muted-foreground">Formation & accompagnement</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Besoin d'un devis personnalisé ou d'une démonstration ?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            Calculer mon ROI
          </Button>
          <Button size="lg">
            Parler à un expert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;