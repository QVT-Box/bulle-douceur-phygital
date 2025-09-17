// src/components/BoxCatalog.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, Package, Gift, Globe, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// 🔧 Import d'images fiables (évite /images cassées en prod)
import imgHygiene from "@/assets/products-hygiene.jpg";
import imgAlimentaire from "@/assets/products-alimentaire.jpg";
import imgCosmetique from "@/assets/products-cosmetique.jpg";
import imgSurprise from "@/assets/products-surprise.jpg";

type ThematicBox = {
  name: string;
  price: string;
  description: string;
  image: string;
  contents: string[];
  benefits: string[];
  madeInFrance?: boolean;
  customizable?: boolean;
  premium?: boolean;
};

type EventBox = {
  name: string;
  price: string;
  description: string;
  image: string;
  contents: string[];
};

const BoxCatalog = () => {
  const [catalogRef, catalogVisible] = useScrollReveal();
  const { language } = useLanguage();

  const L = language === "en"
    ? {
        title: (
          <>
            Our <span className="text-primary">Exceptional Boxes</span>
          </>
        ),
        intro1:
          "Offer your teams an exceptional gift: a French box shipped directly to your company.",
        intro2:
          "Designed to mark important moments, once or twice a year.",
        banner: "🇫🇷 100% Made in France • Local Craftsmanship • Measurable Impact",
        thematicTitle: (
          <>
            <span className="text-primary">Thematic</span> Boxes
          </>
        ),
        eventTitle: (
          <>
            <span className="text-secondary">Event</span> Boxes
          </>
        ),
        contents: "Box contents:",
        benefits: "Benefits:",
        quoteBtn: "Request a quote for this box",
        orderBtn: "Order this box",
        customTitle: (
          <>
            <span className="text-primary">Customization</span> Options
          </>
        ),
        intlTitle: "Exceptional International Gift",
        intlDesc:
          "Offer French excellence to your international teams. Our boxes are shipped worldwide with the same quality and care.",
        intlBtn: "Request international quote",
        madeIn: "Made in France",
        customizable: "Customizable",
        premium: "Premium",

        thematicBoxes: [
          {
            name: "Focus & Reset",
            price: "€29.90",
            description: "Focus, stress management and mental clarity",
            image: imgHygiene,
            contents: [
              "Eco-designed notebook & pen",
              "Premium organic relaxing tea",
              "Natural anti-stress ball",
              "Anti-fatigue essential oil spray",
              "Personalized focus ritual card",
            ],
            benefits: ["Boosts focus", "Reduces stress", "Promotes relaxation"],
            madeInFrance: true,
            customizable: true,
          },
          {
            name: "Mobility & Field",
            price: "€34.90",
            description: "Support for nomadic and field employees",
            image: imgAlimentaire,
            contents: [
              "French insulated bottle/mug",
              "Biodegradable wipes",
              "Healthy energy snack",
              "Protective hand cream",
              "Mobility break card",
            ],
            benefits: ["On-the-go comfort", "Optimal hydration", "Skin protection"],
            madeInFrance: true,
            customizable: true,
          },
          {
            name: "Strain & Recovery",
            price: "€34.90",
            description: "Post-effort recovery and relief",
            image: imgCosmetique,
            contents: [
              "Natural heating patch",
              "Joints & muscles cream",
              "Relaxing organic infusion",
              "Ergonomic massage ball",
              "Recovery ritual card",
            ],
            benefits: ["Relieves tension", "Improves recovery", "Muscle relaxation"],
            madeInFrance: true,
            customizable: true,
          },
          {
            name: "Cohesion & Recognition",
            price: "€89.90",
            description: "Build team bonding and recognition",
            image: imgSurprise,
            contents: [
              "French collaborative mini-game",
              "Local artisan treats",
              "Personalized Thanks/Bravo booklet",
              "Eco-friendly fun goodies",
              "Team cohesion ritual card",
            ],
            benefits: ["Strengthens cohesion", "Values achievements", "Improves atmosphere"],
            madeInFrance: true,
            customizable: true,
            premium: true,
          },
        ] as ThematicBox[],

        eventBoxes: [
          {
            name: "Retirement Box",
            price: "€59.90",
            description: "Celebrate a career and wish the best",
            image: imgSurprise,
            contents: [
              "Personalized guest book",
              "French artisanal products",
              "Thank you card",
              "Engraved keepsake gift",
              "Premium presentation box",
            ],
          },
          {
            name: "Newborn Box",
            price: "€49.90",
            description: "Share the joy of a new life",
            image: imgSurprise,
            contents: [
              "Organic baby products",
              "Congratulations card",
              "Symbolic gift",
              "Treats for parents",
            ],
          },
          {
            name: "Birthday Box",
            price: "€39.90",
            description: "Mark an important date",
            image: imgSurprise,
            contents: [
              "Artisanal treats",
              "Personalized card",
              "Little surprise gift",
              "Festive wrapping",
            ],
          },
          {
            name: "Promotion/Success Box",
            price: "€49.90",
            description: "Celebrate achievements and progress",
            image: imgSurprise,
            contents: [
              "Professional accessory",
              "Wellness products",
              "Congratulations card",
              "Symbol of success",
            ],
          },
          {
            name: "Wedding/Event Box",
            price: "€59.90",
            description: "Share happy moments",
            image: imgSurprise,
            contents: [
              "Refined French products",
              "Personalized card",
              "Memorable gift",
              "Elegant presentation",
            ],
          },
        ] as EventBox[],

        customOptions: [
          { title: "Full Customization", desc: "Company logo, colors, personalized message", icon: Star },
          { title: "Local Products", desc: "Selection of producers from your region", icon: Globe },
          { title: "Flexible Quantities", desc: "From 10 to 1000+ boxes", icon: Package },
          { title: "International Delivery", desc: "Worldwide shipping", icon: Globe },
        ],
      }
    : {
        title: (
          <>
            Nos <span className="text-primary">Box Exceptionnelles</span>
          </>
        ),
        intro1:
          "Offrez à vos équipes un cadeau exceptionnel : une box française expédiée directement dans votre entreprise.",
        intro2: "Conçues pour marquer les moments importants, une à deux fois par an.",
        banner: "🇫🇷 100% Made in France • Artisanat Local • Impact Mesurable",
        thematicTitle: (
          <>
            Box <span className="text-primary">Thématiques</span>
          </>
        ),
        eventTitle: (
          <>
            Box <span className="text-secondary">Événementielles</span>
          </>
        ),
        contents: "Contenu de la box :",
        benefits: "Bénéfices :",
        quoteBtn: "Demander un devis pour cette box",
        orderBtn: "Commander cette box",
        customTitle: (
          <>
            Options de <span className="text-primary">Personnalisation</span>
          </>
        ),
        intlTitle: "Cadeau Exceptionnel International",
        intlDesc:
          "Offrez l’excellence française à vos équipes internationales. Nos box sont expédiées dans le monde entier avec le même niveau de qualité et d’attention.",
        intlBtn: "Demander un devis international",
        madeIn: "Made in France",
        customizable: "Personnalisable",
        premium: "Premium",

        thematicBoxes: [
          {
            name: "Focus & Reset",
            price: "29,90 €",
            description: "Concentration, gestion du stress et clarté mentale",
            image: imgHygiene,
            contents: [
              "Carnet & stylo éco-conçu",
              "Tisane bio relax premium",
              "Balle anti-stress naturelle",
              "Spray anti-fatigue aux huiles essentielles",
              "Carte rituel focus personnalisée",
            ],
            benefits: ["Améliore la concentration", "Réduit le stress", "Favorise la détente"],
            madeInFrance: true,
            customizable: true,
          },
          {
            name: "Mobilité & Terrain",
            price: "34,90 €",
            description: "Soutien pour les salariés nomades et terrain",
            image: imgAlimentaire,
            contents: [
              "Gourde/mug isotherme français",
              "Lingettes biodégradables",
              "Snack sain et énergétique",
              "Crème mains protection",
              "Carte pause mobilité",
            ],
            benefits: ["Confort en déplacement", "Hydratation optimale", "Protection cutanée"],
            madeInFrance: true,
            customizable: true,
          },
          {
            name: "Pénibilité & Récupération",
            price: "34,90 €",
            description: "Récupération après effort et soulagement",
            image: imgCosmetique,
            contents: [
              "Patch chauffant naturel",
              "Crème articulations & muscles",
              "Infusion détente bio",
              "Balle de massage ergonomique",
              "Carte rituel récupération",
            ],
            benefits: ["Soulage les tensions", "Améliore la récupération", "Détente musculaire"],
            madeInFrance: true,
            customizable: true,
          },
          {
            name: "Cohésion & Reconnaissance",
            price: "89,90 €",
            description: "Créer du lien d’équipe et valoriser",
            image: imgSurprise,
            contents: [
              "Mini-jeu collaboratif français",
              "Friandises locales artisanales",
              "Carnet Merci/Bravo personnalisé",
              "Goodies ludiques éco-responsables",
              "Carte rituel cohésion d’équipe",
            ],
            benefits: ["Renforce la cohésion", "Valorise les réussites", "Améliore l’ambiance"],
            madeInFrance: true,
            customizable: true,
            premium: true,
          },
        ] as ThematicBox[],

        eventBoxes: [
          {
            name: "Box Retraite",
            price: "59,90 €",
            description: "Célébrer une carrière et souhaiter le meilleur",
            image: imgSurprise,
            contents: [
              "Livre d’or personnalisé",
              "Produits artisanaux français",
              "Carte de remerciements",
              "Cadeau souvenir gravé",
              "Coffret présentation premium",
            ],
          },
          {
            name: "Box Naissance",
            price: "49,90 €",
            description: "Partager la joie d’une nouvelle vie",
            image: imgSurprise,
            contents: [
              "Produits bio pour bébé",
              "Carte félicitations",
              "Cadeau symbolique",
              "Douceurs pour les parents",
            ],
          },
          {
            name: "Box Anniversaire",
            price: "39,90 €",
            description: "Marquer une date importante",
            image: imgSurprise,
            contents: [
              "Friandises artisanales",
              "Carte personnalisée",
              "Petit cadeau surprise",
              "Emballage festif",
            ],
          },
          {
            name: "Box Promotion/Réussite",
            price: "49,90 €",
            description: "Célébrer les succès et évolutions",
            image: imgSurprise,
            contents: [
              "Accessoire professionnel",
              "Produits de bien-être",
              "Carte de félicitations",
              "Symbole de réussite",
            ],
          },
          {
            name: "Box Mariage/Événement",
            price: "59,90 €",
            description: "Partager les moments de bonheur",
            image: imgSurprise,
            contents: [
              "Produits raffinés français",
              "Carte personnalisée",
              "Cadeau mémorable",
              "Présentation élégante",
            ],
          },
        ] as EventBox[],

        customOptions: [
          { title: "Personnalisation complète", desc: "Logo, couleurs, message personnalisé", icon: Star },
          { title: "Produits locaux", desc: "Sélection de producteurs de votre région", icon: Globe },
          { title: "Quantités flexibles", desc: "De 10 à 1000+ box", icon: Package },
          { title: "Livraison internationale", desc: "Expédition partout dans le monde", icon: Globe },
        ],
      };

  // Préfixe de langue pour rester en /fr ou /en
  const root = language === "en" ? "/en" : "/fr";
  const withLang = (p: string) => `${root}${p.startsWith("/") ? p : `/${p}`}`;

  return (
    <section
      className="py-20 px-6 bg-white"
      ref={catalogRef}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${catalogVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700`}>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-inter">
            {L.title}
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed">
            {L.intro1} <br className="hidden md:block" />
            {L.intro2}
          </p>
          <div className="mt-8 rounded-2xl p-6 max-w-3xl mx-auto border border-gray-200 bg-gray-50">
            <p className="text-lg font-semibold text-gray-900">{L.banner}</p>
          </div>
        </div>

        {/* Thematic Boxes */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter text-gray-900">
            {L.thematicTitle}
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {L.thematicBoxes.map((box, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={box.image}
                    alt={`${language === "en" ? "Box" : "Box"} ${box.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {box.madeInFrance && <Badge className="bg-primary text-white">{L.madeIn}</Badge>}
                    {box.customizable && (
                      <Badge variant="outline" className="bg-white/90 border-white/70 text-gray-900">
                        {L.customizable}
                      </Badge>
                    )}
                    {box.premium && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white">
                        {L.premium}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-xl font-bold text-white mb-1 drop-shadow">{box.name}</h4>
                    <p className="text-white/90 text-sm">{box.description}</p>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white/95 px-3 py-1 rounded-full border border-gray-200">
                      <span className="font-bold text-primary">{box.price}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-gray-900">{L.contents}</h5>
                    <div className="grid gap-2">
                      {box.contents.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold mb-2 text-gray-900">{L.benefits}</h5>
                    <div className="flex flex-wrap gap-2">
                      {box.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link to={withLang("/contact")}>
                    <Button
                      className="w-full bg-black text-white hover:bg-black/90"
                      aria-label={`${L.quoteBtn} — ${box.name}`}
                    >
                      {L.quoteBtn}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Boxes */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter text-gray-900">
            {L.eventTitle}
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {L.eventBoxes.map((box, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-white/95 px-2 py-1 rounded border border-gray-200">
                      <span className="font-bold text-secondary text-sm">{box.price}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{box.name}</h4>
                  <p className="text-gray-700 text-sm mb-4">{box.description}</p>

                  <div className="mb-4">
                    <div className="grid gap-1">
                      {box.contents.map((item, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                          <Gift className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={withLang("/contact")}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
                      aria-label={`${L.orderBtn} — ${box.name}`}
                    >
                      {L.orderBtn}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customization Options */}
        <div className="rounded-3xl p-12 border border-gray-200 bg-gray-50">
          <h3 className="text-3xl font-bold text-center mb-12 font-inter text-gray-900">
            {L.customTitle}
          </h3>

          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {L.customOptions.map((opt, index) => {
              const Icon = opt.icon;
              return (
                <Card key={index} className="text-center p-6 border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{opt.title}</h4>
                    <p className="text-gray-700 text-sm">{opt.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">{L.intlTitle}</h4>
            <p className="text-lg text-gray-800 mb-6 max-w-2xl mx-auto">{L.intlDesc}</p>
            <Link to={withLang("/contact")}>
              <Button size="lg" className="bg-black text-white hover:bg-black/90">
                <Globe className="w-5 h-5 mr-2" />
                {L.intlBtn}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxCatalog;
