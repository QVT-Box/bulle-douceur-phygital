import React from 'react';
import Navigation from '@/components/Navigation';
import FloatingBubbles from '@/components/FloatingBubbles';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import InteractiveDemo from '@/components/InteractiveDemo';
import PricingSection from '@/components/PricingSection';
import { Play, BarChart3, Zap, Shield } from 'lucide-react';

const SaasPage = () => {
  const [heroRef, heroVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useStaggeredReveal(4, 200);
  const [demoRef, demoVisible] = useScrollReveal();
  const [pricingRef, pricingVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <FloatingBubbles />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-4" ref={heroRef}>
        <div className={`max-w-4xl mx-auto text-center scroll-reveal ${heroVisible ? 'visible' : ''}`}>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              ✨ Nouvelle génération
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Prévenez les RPS avec l'IA
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            La première plateforme SaaS qui détecte et prévient les risques psychosociaux 
            avant qu'ils n'impactent vos équipes. Conformité réglementaire garantie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="button-hover">
              <Play className="mr-2" size={16} />
              Voir la démo interactive
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="#pricing">Découvrir les tarifs</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <BarChart3 className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold mb-2">Tableaux de bord temps réel</h3>
              <p className="text-sm text-muted-foreground">Visualisez l'état de bien-être de vos équipes instantanément</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <Zap className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold mb-2">IA prédictive</h3>
              <p className="text-sm text-muted-foreground">Anticipez les risques avant qu'ils ne deviennent critiques</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <Shield className="text-primary" size={20} />
              </div>
              <h3 className="font-semibold mb-2">Conformité RGPD</h3>
              <p className="text-sm text-muted-foreground">Respect total de la réglementation française et européenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 px-4" ref={featuresRef}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${featuresVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir notre solution ?</h2>
            <p className="text-lg text-muted-foreground">
              Les entreprises qui utilisent notre plateforme réduisent les RPS de 40% en moyenne
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className={`card-hover stagger-item ${featuresVisible.has(1) ? 'visible' : ''}`}>
              <CardHeader>
                <div className="text-4xl mb-4">⚡</div>
                <CardTitle className="text-xl">Détection précoce automatique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Notre IA analyse en continu les signaux faibles et vous alerte avant que les situations ne dégénèrent. 
                  Réduction de 60% des arrêts maladie liés au stress.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`card-hover stagger-item ${featuresVisible.has(2) ? 'visible' : ''}`}>
              <CardHeader>
                <div className="text-4xl mb-4">📋</div>
                <CardTitle className="text-xl">Conformité réglementaire assurée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Export automatique du DUERP, traçabilité complète des actions, 
                  respect du Code du Travail. Sécurisez vos audits CARSAT.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`card-hover stagger-item ${featuresVisible.has(3) ? 'visible' : ''}`}>
              <CardHeader>
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle className="text-xl">Plans d'action personnalisés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Recommandations contextuelles basées sur votre secteur, taille d'entreprise 
                  et culture. ROI moyen de 350% sur les actions bien-être.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`card-hover stagger-item ${featuresVisible.has(4) ? 'visible' : ''}`}>
              <CardHeader>
                <div className="text-4xl mb-4">🔐</div>
                <CardTitle className="text-xl">Anonymat et confidentialité</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Données anonymisées, chiffrement de bout en bout, hébergement français. 
                  Confiance garantie de vos collaborateurs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-muted/20" ref={demoRef}>
        <div className={`scroll-reveal-scale ${demoVisible ? 'visible' : ''}`}>
          <InteractiveDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4" ref={pricingRef}>
        <div className={`scroll-reveal-scale ${pricingVisible ? 'visible' : ''}`}>
          <PricingSection />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" ref={ctaRef}>
        <div className={`max-w-4xl mx-auto text-center scroll-reveal-scale ${ctaVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl font-bold mb-6">
            Prêt à transformer votre QVT ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Rejoignez les 500+ entreprises qui font confiance à notre plateforme 
            pour protéger le bien-être de leurs collaborateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-hover">
              <Play className="mr-2" size={16} />
              Démarrer l'essai gratuit
            </Button>
            <Button variant="outline" size="lg" className="button-hover" asChild>
              <Link to="/contact">Parler à un expert</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Essai gratuit 14 jours • Aucune carte bancaire requise • Support inclus
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaasPage;