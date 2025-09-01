import React from 'react';
import Navigation from '@/components/Navigation';
import FloatingBubbles from '@/components/FloatingBubbles';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SaasPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <FloatingBubbles />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              🚧 Bientôt disponible
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Plateforme SaaS QVT
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre solution SaaS révolutionnaire pour mesurer et améliorer la qualité de vie au travail 
            arrive bientôt. En attendant, découvrez notre boutique et nos box bien-être.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link to="/contact">Me tenir informé du lancement</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/boutique">Découvrir la boutique</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ce qui vous attend</h2>
            <p className="text-lg text-muted-foreground">
              Un aperçu des fonctionnalités innovantes en développement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full opacity-75 border-dashed">
              <CardHeader>
                <div className="text-4xl mb-4">📊</div>
                <CardTitle className="text-xl">Tableaux de Bord Intelligents</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Visualisation en temps réel des indicateurs de bien-être de votre équipe
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full opacity-75 border-dashed">
              <CardHeader>
                <div className="text-4xl mb-4">🧠</div>
                <CardTitle className="text-xl">IA Prédictive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Anticipation des risques psychosociaux grâce à l'intelligence artificielle
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full opacity-75 border-dashed">
              <CardHeader>
                <div className="text-4xl mb-4">🚨</div>
                <CardTitle className="text-xl">Alertes Préventives</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Détection automatique des signaux de mal-être avant qu'ils ne s'aggravent
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full opacity-75 border-dashed">
              <CardHeader>
                <div className="text-4xl mb-4">📋</div>
                <CardTitle className="text-xl">Plans d'Action</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Recommandations personnalisées pour améliorer la qualité de vie au travail
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full opacity-75 border-dashed">
              <CardHeader>
                <div className="text-4xl mb-4">🔒</div>
                <CardTitle className="text-xl">Sécurité & Confidentialité</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Conformité RGPD et protection maximale des données sensibles
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full opacity-75 border-dashed">
              <CardHeader>
                <div className="text-4xl mb-4">🔗</div>
                <CardTitle className="text-xl">Intégrations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connexion avec vos outils RH et de collaboration existants
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Soyez les premiers informés
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inscrivez-vous pour recevoir les dernières actualités sur le développement 
            de notre plateforme SaaS et être prioritaire lors du lancement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">S'inscrire à la newsletter</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/box">Découvrir nos Box en attendant</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SaasPage;