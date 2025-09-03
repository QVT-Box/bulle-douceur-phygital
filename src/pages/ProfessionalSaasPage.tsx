import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AlertDashboard from "@/components/AlertDashboard";
import EvaluationForm from "@/components/EvaluationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { 
  Shield, 
  BarChart3, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Download,
  Clock,
  Eye,
  UserCheck,
  Activity
} from "lucide-react";
import saasDashboard from "@/assets/saas-dashboard-pro.jpg";
import workplaceWellness from "@/assets/workplace-wellness.jpg";

const ProfessionalSaasPage = () => {
  const { user } = useAuth();
  
  const [heroRef, heroVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useStaggeredReveal(4, 200);
  const [useCasesRef, useCasesVisible] = useStaggeredReveal(3, 250);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const features = [
    {
      title: "Tableaux de bord anonymisés",
      description: "Visualisation des tendances d'équipe sans exposer les données individuelles, conforme RGPD",
      icon: BarChart3,
      compliance: "RGPD • INRS",
      details: [
        "Agrégation automatique des données",
        "Seuil minimum de participants",
        "Visualisations par axes RPS",
        "Évolution temporelle des indicateurs"
      ]
    },
    {
      title: "Alertes précoces RPS",
      description: "Détection automatique des signaux faibles selon les critères INRS et recommandations officielles",
      icon: AlertTriangle,
      compliance: "INRS • ANI QVT",
      details: [
        "Algorithme basé sur les 5 axes RPS",
        "Seuils paramétrables par l'entreprise",
        "Notifications graduelles",
        "Respect du consentement utilisateur"
      ]
    },
    {
      title: "Export DUERP automatisé",
      description: "Génération des rapports réglementaires pour l'inspection du travail et les obligations légales",
      icon: FileText,
      compliance: "Code du Travail • L4121-1",
      details: [
        "Format conforme aux exigences légales",
        "Données anonymisées par défaut",
        "Historique des actions QVT",
        "Prêt pour contrôle DIRECCTE"
      ]
    },
    {
      title: "Suivi des actions QVT",
      description: "Pilotage et mesure de l'efficacité des mesures mises en place, avec indicateurs d'impact",
      icon: TrendingUp,
      compliance: "ANI QVT • ANACT",
      details: [
        "Tableau de bord des actions",
        "Mesure d'impact quantifiée",
        "Suivi budgétaire CSE",
        "ROI des investissements bien-être"
      ]
    }
  ];

  const useCases = [
    {
      role: "Direction / DRH",
      avatar: "👩‍💼",
      needs: "Vision stratégique et conformité réglementaire",
      benefits: [
        "Tableaux de bord exécutifs",
        "Indicateurs clés de performance",
        "Conformité DUERP automatisée",
        "Aide à la décision basée sur les données"
      ],
      testimonial: "Nous avons enfin une vision claire des RPS avec des données objectives pour agir."
    },
    {
      role: "CSE / Représentants du personnel",
      avatar: "🤝",
      needs: "Représentation des salariés et dialogue social",
      benefits: [
        "Données anonymisées et objectives", 
        "Respect de la confidentialité",
        "Arguments factuels pour négociations",
        "Suivi des engagements patronaux"
      ],
      testimonial: "L'outil nous donne des éléments concrets pour défendre les salariés en toute transparence."
    },
    {
      role: "Managers / Encadrement",
      avatar: "👨‍💻",
      needs: "Management bienveillant et prévention d'équipe",
      benefits: [
        "Signaux d'alerte anonymisés",
        "Ressources d'accompagnement",
        "Formation continue intégrée",
        "Outils de dialogue individuel"
      ],
      testimonial: "Je peux maintenant anticiper les difficultés de mon équipe tout en respectant la vie privée."
    }
  ];

  const complianceItems = [
    {
      law: "Code du Travail L4121-1",
      description: "Document Unique d'Évaluation des Risques Professionnels",
      status: "Conforme",
      icon: FileText
    },
    {
      law: "Accord National Interprofessionnel QVT",
      description: "Qualité de Vie et Conditions de Travail",
      status: "Aligné",
      icon: CheckCircle
    },
    {
      law: "RGPD Article 6 & 9",
      description: "Protection des données personnelles de santé",
      status: "Certifié",
      icon: Shield
    },
    {
      law: "Recommandations INRS",
      description: "Prévention des risques psychosociaux",
      status: "Validé",
      icon: UserCheck
    }
  ];

  const stats = [
    { value: "33%", label: "des salariés exposés aux RPS", source: "INRS 2023" },
    { value: "2x", label: "plus d'arrêts avec prévention", source: "Étude Malakoff Humanis" },
    { value: "€500M", label: "coût annuel des RPS en France", source: "DARES" },
    { value: "85%", label: "d'entreprises non conformes DUERP", source: "Inspection du Travail" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-hero" ref={heroRef}>
        <div className="container mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center scroll-reveal ${heroVisible ? 'visible' : ''}`}>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <Badge variant="outline">Conforme INRS • RGPD • Code du Travail</Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-inter">
                SaaS <span className="text-primary">Prévention RPS</span>
              </h1>
              
              <div className="card-professional p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-lato mb-4">
                  <span className="text-primary font-medium">Prévenir les risques, ce n'est pas une option mais une obligation légale.</span>
                </p>
                <p className="text-foreground/70 font-lato">
                  QVT Box donne aux RH, CSE et managers des outils fiables : tableaux de bord anonymisés, 
                  alertes précoces, export DUERP. Simples à déployer, pensés pour agir en conformité avec les études INRS.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button className="btn-primary text-lg px-8 py-4 font-inter button-hover">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Demander une démo SaaS
                  </Button>
                </Link>
                <Link to="/engagements">
                  <Button variant="outline" className="text-lg px-8 py-4 font-inter button-hover">
                    Voir les références légales
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img 
                src={saasDashboard} 
                alt="Tableau de bord SaaS RPS professionnel"
                className="rounded-lg shadow-floating w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques RPS */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-inter">
              L'urgence des <span className="text-primary">Risques Psychosociaux</span>
            </h2>
            <p className="text-lg text-foreground/70 font-lato">
              Données officielles qui justifient l'obligation de prévention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="card-professional text-center p-6">
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-primary font-inter">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground font-lato leading-tight">
                    {stat.label}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {stat.source}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-20 px-6 section-professional" ref={featuresRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${featuresVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Fonctionnalités <span className="text-secondary">Professionnelles</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Outils conformes aux obligations légales et recommandations INRS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className={`card-professional overflow-hidden card-hover stagger-item ${featuresVisible.has(index + 1) ? 'visible' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.compliance}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-inter text-foreground">
                      {feature.title}
                    </CardTitle>
                    <p className="text-foreground/70 font-lato">
                      {feature.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm font-lato">
                          <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cas d'usage par rôle */}
      <section className="py-20 px-6 bg-background" ref={useCasesRef}>
        <div className="container mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${useCasesVisible.has(0) ? 'visible' : ''}`}>
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Pour chaque <span className="text-secondary">acteur de l'entreprise</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {useCases.map((useCase, index) => (
              <Card key={index} className={`card-professional overflow-hidden card-hover stagger-item ${useCasesVisible.has(index + 1) ? 'visible' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4">{useCase.avatar}</div>
                  <CardTitle className="text-xl font-inter text-primary">
                    {useCase.role}
                  </CardTitle>
                  <p className="text-sm text-foreground/70 font-lato">
                    {useCase.needs}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-lato">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t pt-4">
                    <blockquote className="text-sm italic text-foreground/80 font-lato">
                      "{useCase.testimonial}"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conformité réglementaire */}
      <section className="py-20 px-6 section-professional">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
              Conformité <span className="text-primary">Réglementaire</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              100% aligné avec les obligations légales et recommandations officielles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {complianceItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="card-professional p-6 text-center">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <Badge className="mb-2 bg-green-100 text-green-800">
                        {item.status}
                      </Badge>
                      <h3 className="font-bold text-sm font-inter mb-2">
                        {item.law}
                      </h3>
                      <p className="text-xs text-foreground/70 font-lato">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Démo interactive */}
      {user && (
        <section className="py-20 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6 font-inter">
                Testez la <span className="text-primary">plateforme</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
                Découvrez les fonctionnalités avec vos propres données
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="evaluation" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Évaluation
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-8">
                <AlertDashboard />
              </TabsContent>
              
              <TabsContent value="evaluation" className="mt-8">
                <EvaluationForm />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Témoignage */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src={workplaceWellness} 
              alt="Environnement de travail sain et ergonomique"
              className="rounded-lg shadow-floating object-cover w-full h-96"
            />
            
            <div className="space-y-6">
              <div className="card-professional p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <Badge variant="outline">Témoignage client</Badge>
                </div>
                <blockquote className="text-lg italic text-foreground/80 mb-6 font-lato">
                  "QVT Box SaaS nous a permis de passer d'une approche réactive à une véritable prévention. 
                  L'export DUERP automatique nous fait gagner des semaines de travail et la conformité RGPD nous rassure totalement."
                </blockquote>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground font-inter">Dr. Michel Bertrand</p>
                  <p className="text-sm text-foreground/60 font-lato">Médecin du Travail, Groupe Industriel (1200 salariés)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-inter">
            Sécurisez votre conformité RPS dès aujourd'hui
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto font-lato">
            Respectez vos obligations légales tout en protégeant efficacement vos collaborateurs 
            avec une solution pensée par des experts RPS et validée par des professionnels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-inter">
                <BarChart3 className="w-5 h-5 mr-2" />
                Demander une démo personnalisée
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-inter">
                <FileText className="w-5 h-5 mr-2" />
                Audit de conformité gratuit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfessionalSaasPage;