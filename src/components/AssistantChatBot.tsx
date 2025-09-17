// src/components/AssistantChatBot.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Minimize2,
  Maximize2,
  HelpCircle,
  Package,
  ShoppingCart,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type MsgType = "user" | "bot";

interface Message {
  id: string;
  type: MsgType;
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AssistantChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const nowId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const AssistantChatBot = ({ isOpen, onToggle }: AssistantChatBotProps) => {
  const { language } = useLanguage();

  // Réponses & libellés i18n
  const L = useMemo(() => {
    if (language === "en") {
      return {
        online: "Online",
        title: "QVT Box Assistant",
        placeholder: "Type your message…",
        sendAria: "Send message",
        minimizeAria: "Minimize",
        maximizeAria: "Maximize",
        closeAria: "Close",
        quickProducts: "Products",
        quickBox: "Box",
        quickHelp: "Help",
        fabAria: "Open assistant",
        greeting:
          "Hello! I'm your QVT Box assistant. How can I help you today?",
        greetSug: ["Recommend products", "Configure a box", "Delivery info", "Tech support"],
        buckets: {
          products: [
            "Our main categories: Wellness, Ergonomics, Energy, Local Terroir. Which one interests you?",
            "For tailored picks, tell me your team size and preferences.",
          ],
          box: [
            "Our themed boxes are great for team bonding! Would you like a Wellness, Energy, Coffee & Treats, or Event box?",
            "I can help you configure a custom box. How many people are in your team?",
          ],
          delivery: [
            "We deliver within ~48h in mainland France. Free shipping from €50!",
            "Our logistics partners favor short supply chains and low-carbon transport.",
          ],
          price: [
            "Products range from €8 to €45. Boxes start at €32 per person. Would you like a quote?",
            "For an accurate estimate, use our box configurator or ask me specific recommendations.",
          ],
          support: [
            "For immediate technical support, ask here or contact our team. What issue are you facing?",
            "Tell me your problem and I’ll route you to the right solution.",
          ],
          fallback: [
            "I’m not sure I got that. Could you rephrase?",
            "I can help with: product recommendations, box configuration, delivery info, or technical support.",
            "Feel free to be as specific as you can!",
          ],
          suggestions: {
            products: ["Wellness", "Ergonomics", "Energy", "Local Terroir"],
            box: ["Wellness Box", "Energy Box", "Coffee Box", "Event Box"],
            delivery: ["Delivery zones", "Shipping fees", "Order tracking"],
            price: ["Custom quote", "Team discounts", "Payment options"],
            support: ["Phone contact", "Support email", "FAQ"],
            default: ["Recommend products", "Configure a box", "Delivery info", "Tech support"],
          },
        },
      };
    }
    // FR par défaut
    return {
      online: "En ligne",
      title: "Assistant QVT Box",
      placeholder: "Tapez votre message…",
      sendAria: "Envoyer le message",
      minimizeAria: "Réduire",
      maximizeAria: "Agrandir",
      closeAria: "Fermer",
      quickProducts: "Produits",
      quickBox: "Box",
      quickHelp: "Aide",
      fabAria: "Ouvrir l’assistant",
      greeting:
        "Bonjour ! Je suis votre assistant QVT Box. Comment puis-je vous aider aujourd’hui ?",
      greetSug: [
        "Recommander des produits",
        "Configurer une box",
        "Informations livraison",
        "Support technique",
      ],
      buckets: {
        products: [
          "Voici nos catégories principales : Bien-être, Ergonomie, Énergie, et Terroir Local. Quelle catégorie vous intéresse ?",
          "Pour des recommandations personnalisées, indiquez la taille de votre équipe et vos préférences.",
        ],
        box: [
          "Nos box thématiques sont parfaites pour créer du lien ! Souhaitez-vous une box Bien-être, Énergie, Café & Gourmandises, ou Événementielle ?",
          "Je peux vous aider à configurer une box sur-mesure. Combien êtes-vous dans l’équipe ?",
        ],
        delivery: [
          "Nous livrons en ~48h en France métropolitaine. Livraison offerte dès 50€ d’achat !",
          "Nos partenaires logistiques privilégient les circuits courts et les modes de transport décarbonés.",
        ],
        price: [
          "Nos produits vont de 8€ à 45€. Les box démarrent à 32€ / personne. Souhaitez-vous un devis ?",
          "Pour une estimation précise, utilisez le configurateur de box ou demandez-moi des recommandations.",
        ],
        support: [
          "Pour un support technique immédiat, posez votre question ici. Quel problème rencontrez-vous ?",
          "Décrivez votre souci et je vous oriente vers la bonne solution.",
        ],
        fallback: [
          "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ?",
          "Je peux vous aider à : recommander des produits, configurer une box, livraisons, ou support technique.",
          "N’hésitez pas à préciser votre demande.",
        ],
        suggestions: {
          products: ["Bien-être", "Ergonomie", "Énergie", "Terroir Local"],
          box: ["Box Bien-être", "Box Énergie", "Box Café", "Box Événementielle"],
          delivery: ["Zones de livraison", "Frais de port", "Suivi commande"],
          price: ["Devis personnalisé", "Remises équipes", "Options paiement"],
          support: ["Contact téléphone", "Email support", "FAQ"],
          default: [
            "Recommander des produits",
            "Configurer une box",
            "Informations livraison",
            "Support technique",
          ],
        },
      },
    };
  }, [language]);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Message d’accueil dépendant de la langue
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: nowId(),
      type: "bot",
      content: L.greeting,
      timestamp: new Date(),
      suggestions: L.greetSug,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  // Regénère le message d’accueil si la langue change et qu’on est au tout début
  useEffect(() => {
    if (messages.length <= 1 && messages[0]?.type === "bot") {
      setMessages([
        {
          id: nowId(),
          type: "bot",
          content: L.greeting,
          timestamp: new Date(),
          suggestions: L.greetSug,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [L.greeting]);

  function classify(userText: string) {
    const m = userText.toLowerCase();
    if (/(produit|recommand|product|recommend)/.test(m)) return "products" as const;
    if (/(box|configur)/.test(m)) return "box" as const;
    if (/(livr|d.lai|deliv)/.test(m)) return "delivery" as const;
    if (/(prix|co.t|tarif|price|cost)/.test(m)) return "price" as const;
    if (/(aide|support|probl.m|help)/.test(m)) return "support" as const;
    return "fallback" as const;
  }

  function botAnswer(userText: string): Message {
    const bucket = classify(userText);
    const variants = L.buckets[bucket as keyof typeof L.buckets] as unknown as string[];
    const response = variants[Math.floor(Math.random() * variants.length)];
    const sugMap = L.buckets.suggestions as Record<string, string[]>;
    const suggestions = sugMap[bucket] ?? sugMap.default;

    return {
      id: nowId(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      suggestions,
    };
  }

  // Fonction d’envoi robuste (utilisée aussi par les suggestions)
  function send(text: string) {
    const clean = text.trim();
    if (!clean || isTyping) return;

    const userMsg: Message = {
      id: nowId(),
      type: "user",
      content: clean,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = botAnswer(clean);
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // On envoie directement ce texte (sans dépendre de setState async)
    send(suggestion);
  };

  // FAB fermé
  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full z-50 shadow-lg bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        aria-label={L.fabAria}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-96 transition-all duration-300 border border-gray-200 shadow-xl bg-white ${
          isMinimized ? "h-16" : "h-[500px]"
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
            <Bot className="w-5 h-5" />
            {L.title}
            <Badge variant="secondary" className="text-xs">
              {L.online}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized((v) => !v)}
              aria-label={isMinimized ? L.maximizeAria : L.minimizeAria}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle} aria-label={L.closeAria}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4 h-80">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "bot" && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <Bot className="w-4 h-4 text-gray-900" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.type === "user"
                          ? "bg-black text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <p>{message.content}</p>

                      {message.suggestions && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={`${message.id}-${idx}`}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-auto py-1 px-2 border-gray-300 text-gray-900 hover:bg-gray-50"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <User className="w-4 h-4 text-gray-900" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                      <Bot className="w-4 h-4 text-gray-900" />
                    </div>
                    <div className="bg-white text-gray-900 border border-gray-200 p-3 rounded-lg">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={L.placeholder}
                  className="flex-1"
                />
                <Button
                  onClick={() => send(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 bg-black text-white hover:bg-black/90"
                  aria-label={L.sendAria}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex justify-center gap-1 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick(L.language === "en" ? "Recommend products" : "Recommander des produits")}
                  className="text-xs"
                >
                  <Package className="w-3 h-3 mr-1" />
                  {L.quickProducts}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick(L.language === "en" ? "Configure a box" : "Configurer une box")}
                  className="text-xs"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  {L.quickBox}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick(L.language === "en" ? "Tech support" : "Support technique")}
                  className="text-xs"
                >
                  <HelpCircle className="w-3 h-3 mr-1" />
                  {L.quickHelp}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Typing indicator CSS local */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .typing-indicator { display: flex; gap: 4px; }
          .typing-indicator span {
            width: 6px; height: 6px; background: #9CA3AF;
            border-radius: 9999px; animation: typing 1.2s infinite ease-in-out;
          }
          .typing-indicator span:nth-child(1) { animation-delay: -0.24s; }
          .typing-indicator span:nth-child(2) { animation-delay: -0.12s; }
          .typing-indicator span:nth-child(3) { animation-delay: 0s; }

          @keyframes typing {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.6; }
            40% { transform: scale(1); opacity: 1; }
          }
        `,
        }}
      />
    </div>
  );
};

export default AssistantChatBot;
