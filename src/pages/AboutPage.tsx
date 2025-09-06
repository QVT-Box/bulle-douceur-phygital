import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingBubbles from "@/components/FloatingBubbles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Lightbulb, Shield, Award, Target } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Bien-être au cœur",
      description: "Le bien-être de vos collaborateurs est notre priorité absolue. Nous croyons qu'un employé épanoui est plus productif et créatif."
    },
    {
      icon: Users,
      title: "Équipe dédiée",
      description: "Une équipe d'experts passionnés travaille chaque jour pour créer des solutions innovantes et personnalisées."
    },
    {
      icon: Lightbulb,
      title: "Innovation continue",
      description: "Nous développons constamment de nouvelles approches pour améliorer la qualité de vie au travail."
    },
    {
      icon: Shield,
      title: "Confiance & Transparence",
      description: "Relations basées sur la confiance, la transparence et le respect mutuel avec nos clients et partenaires."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Création de QVT Box",
      description: "Naissance de l'idée révolutionnaire d'améliorer le bien-être au travail"
    },
    {
      year: "2021",
      title: "Premiers partenaires",
      description: "Collaboration avec des artisans locaux et des entreprises innovantes"
    },
    {
      year: "2023",
      title: "Solution SaaS",
      description: "Lancement de notre plateforme digitale pour les entreprises"
    },
    {
      year: "2024",
      title: "Expansion nationale",
      description: "Développement de notre réseau de partenaires sur tout le territoire"
    }
  ];

  return (
    <>
      <SEOHead 
        title="À propos - QVT Box | Notre mission et nos valeurs"
        description="Découvrez l'histoire de QVT Box, notre équipe passionnée et notre mission d'améliorer la qualité de vie au travail en France."
      />
      <div className="min-h-screen bg-gradient-hero">
        <FloatingBubbles />
        <Navigation />
        
        <main className="pt-24 relative z-10">
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Notre Histoire
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-kalam">
                Réinventer le 
                <span className="text-gradient"> bien-être au travail</span>
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                QVT Box est née de la conviction que chaque entreprise mérite des collaborateurs épanouis 
                et que chaque collaborateur mérite un environnement de travail bienveillant.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam">
                  Notre Mission
                </h2>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  Nous accompagnons les entreprises dans leur démarche QVT en proposant des solutions 
                  concrètes, mesurables et personnalisées. Notre approche combine produits artisanaux, 
                  outils digitaux et expertise humaine.
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Objectif 2025</h3>
                    <p className="text-foreground/70">Accompagner 1000+ entreprises</p>
                  </div>
                </div>
                <Link 
                  to="/contact" 
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Nous contacter
                </Link>
              </div>
              <div className="relative">
                <Card className="card-professional">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Notre Vision</h3>
                      <p className="text-foreground/80">
                        Créer un écosystème où bien-être et performance s'épanouissent ensemble, 
                        transformant chaque lieu de travail en environnement inspirant.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam">
                Nos Valeurs
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Les principes qui guident chacune de nos actions et décisions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="card-professional hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                      <p className="text-foreground/70">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Timeline Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam">
                Notre Parcours
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Les étapes clés de notre développement
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <Card className={`card-professional max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-primary text-white">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-foreground/70">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-6 py-16">
            <Card className="card-professional text-center">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-kalam">
                  Prêt à transformer votre entreprise ?
                </h2>
                <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Rejoignez les entreprises qui ont déjà fait le choix du bien-être 
                  et découvrez comment QVT Box peut vous accompagner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="btn-primary">
                    Nous contacter
                  </Link>
                  <Link to="/box" className="btn-secondary">
                    Découvrir nos Box
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;