// src/pages/InternationalPageEN.tsx
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  Package,
  Shield,
  Users,
  CheckCircle,
  Plane,
  Truck,
  Heart,
} from "lucide-react";
import internationalHero from "@/assets/hero-spectacular-impact.jpg";

const InternationalPageEN = () => {
  // helper pour forcer les liens côté anglais
  const withLang = (p: string) => (p.startsWith("/") ? `/en${p}` : `/en/${p}`);

  const services = [
    {
      title: "Premium Export Box",
      description:
        "Exceptional boxes engineered for international shipping with reinforced packaging",
      icon: Package,
      features: [
        "Export-safe packaging",
        "French products with export certification",
        "Customs paperwork included",
        "Worldwide shipment tracking",
      ],
      price: "€49.90 – €89.90",
      color: "primary" as const,
    },
    {
      title: "Global SaaS License",
      description:
        "Multilingual digital platform deployable across all your global offices",
      icon: Globe,
      features: [
        "Multilingual interface",
        "International GDPR compliance",
        "24/7 support across time zones",
        "Consolidated global reports",
      ],
      price: "On request",
      color: "secondary" as const,
    },
    {
      title: "Cultural Adaptation",
      description:
        "Tailoring our solutions to local cultural specificities",
      icon: Users,
      features: [
        "Local needs assessment",
        "Cultural customization",
        "Training for local teams",
        "Multilingual support",
      ],
      price: "Included",
      color: "accent" as const,
    },
  ];

  const deliveryZones = [
    { zone: "Europe", countries: "27 countries", delivery: "3–5 days", customs: "Included", icon: "🇪🇺" },
    { zone: "North America", countries: "USA, Canada", delivery: "5–8 days", customs: "Included", icon: "🇺🇸" },
    { zone: "Asia-Pacific", countries: "Japan, Singapore, Australia", delivery: "7–12 days", customs: "Included", icon: "🌏" },
    { zone: "Middle East & Africa", countries: "UAE, Morocco, South Africa", delivery: "8–15 days", customs: "Included", icon: "🌍" },
  ];

  const steps = [
    { n: "01", title: "Global Consultation", desc: "Assess needs across sites and define your international QWL strategy", icon: Globe },
    { n: "02", title: "Local Personalization", desc: "Adapt boxes and tools to each country’s culture", icon: Heart },
    { n: "03", title: "Worldwide Logistics", desc: "International shipping with customs management", icon: Truck },
    { n: "04", title: "Follow-up & Support", desc: "Continuous guidance, multilingual support, consolidated reports", icon: Shield },
  ];

  const quotes = [
    {
      q: "Our teams in London, Berlin and Tokyo now receive the same caring experience. French quality wins everyone over!",
      a: "Sarah Chen, Global HR Director",
      c: "TechCorp International (2,400 employees, 15 countries)",
      flag: "🌍",
    },
    {
      q: "Impact in the US was immediate. People loved discovering French ‘art de vivre’ at work.",
      a: "Michael Rodriguez, VP Operations",
      c: "French-American Corp (800 employees, USA)",
      flag: "🇺🇸",
    },
    {
      q: "Flawless logistics. Our Singapore and Sydney offices receive boxes in perfect condition.",
      a: "Yuki Tanaka, Regional Manager",
      c: "Asian Solutions Ltd (1,200 employees, APAC)",
      flag: "🇸🇬",
    },
  ];

  // couleurs figées (pas de classes dynamiques)
  const palette = {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    secondary: { bg: "bg-secondary/10", text: "text-secondary" },
    accent: { bg: "bg-accent/10", text: "text-accent" },
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>QVT Box International — French excellence, worldwide</title>
        <meta
          name="description"
          content="QWL gift boxes and multilingual SaaS, shipped to 50+ countries. Export packaging, GDPR compliance, global logistics and follow-the-sun support."
        />
        <meta property="og:title" content="QVT Box International" />
        <meta
          property="og:description"
          content="French excellence for your global teams."
        />
      </Helmet>

      <Navigation />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={internationalHero}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative container mx-auto text-center text-white">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="bg-white/20 text-white border-white/30 mb-6 px-6 py-2 text-lg">
                <Globe className="w-5 h-5 mr-2" />
                Global program
              </Badge>

              <h1 className="font-inter text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="block text-white">QVT Box</span>
                <span className="block text-primary text-3xl md:text-5xl lg:text-6xl mt-4">
                  International
                </span>
              </h1>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-white/90">
              French excellence for your global teams
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-12 font-light max-w-4xl mx-auto leading-relaxed">
              Premium care packages and a multilingual SaaS platform designed for distributed organizations. Ship everywhere, measure impact, and boost engagement.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to={withLang("/contact")}
                className="btn-primary bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg inline-flex items-center"
              >
                <Plane className="w-6 h-6 mr-3" />
                Request an international quote
              </Link>
              <Link
                to={withLang("/contact")}
                className="btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg inline-flex items-center"
              >
                <Users className="w-6 h-6 mr-3" />
                Free consultation
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-white/70 text-sm">Countries served</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-white/70 text-sm">Made in France</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-white/70 text-sm">Languages</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-2xl font-bold text-white">72h</div>
                <div className="text-white/70 text-sm">Avg global lead time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              International <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto font-lato">
              Built for distributed teams across the globe
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((s, i) => {
              const Icon = s.icon;
              const pal = s.color === "primary" ? palette.primary : s.color === "secondary" ? palette.secondary : palette.accent;
              return (
                <Card key={i} className="card-professional p-8 hover:shadow-floating transition-all duration-300">
                  <CardContent className="space-y-6">
                    <div className="flex justify-center mb-6">
                      <div className={`w-20 h-20 ${pal.bg} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-10 h-10 ${pal.text}`} />
                      </div>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-foreground text-center">
                      {s.title}
                    </h3>
                    <p className="text-foreground/70 text-center leading-relaxed font-lato">
                      {s.description}
                    </p>

                    <div className="space-y-3">
                      {s.features.map((f, idx) => (
                        <div key={idx} className="flex items-center text-sm text-foreground/70">
                          <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4 border-t border-border">
                      <div className={`text-lg font-bold ${pal.text}`}>{s.price}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ZONES */}
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Worldwide <span className="text-secondary">Shipping</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              We deliver to 50+ countries with the same care and quality
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {deliveryZones.map((z, i) => (
              <Card key={i} className="card-professional text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent>
                  <div className="text-4xl mb-4" aria-hidden>{z.icon}</div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{z.zone}</h3>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex items-center justify-between">
                      <span>Countries:</span>
                      <span className="font-semibold">{z.countries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Lead time:</span>
                      <span className="font-semibold text-primary">{z.delivery}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customs:</span>
                      <span className="font-semibold text-green-600">{z.customs}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-lato">
              A tailored deployment for your international footprint
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Card key={i} className="card-professional p-8 hover:shadow-lg transition-all duration-300">
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-xs font-bold text-center text-primary">{s.n}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-foreground mb-3">{s.title}</h3>
                        <p className="text-foreground/70 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-inter">
              Global <span className="text-primary">Stories</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {quotes.map((q, i) => (
              <Card key={i} className="card-professional p-6 text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="text-4xl mb-4" aria-hidden>{q.flag}</div>
                  <blockquote className="text-foreground/80 italic leading-relaxed mb-4">
                    “{q.q}”
                  </blockquote>
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-foreground">{q.a}</div>
                    <div className="text-sm text-foreground/60">{q.c}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-inter">
            Ready to go global?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-lato">
            Join companies who trust QVT Box to care for their international teams with French excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to={withLang("/contact")}
              className="btn-primary bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg inline-flex items-center"
            >
              <Globe className="w-6 h-6 mr-3" />
              Start your international project
            </Link>
            <Link
              to={withLang("/contact")}
              className="btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg inline-flex items-center"
            >
              <Users className="w-6 h-6 mr-3" />
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalPageEN;
