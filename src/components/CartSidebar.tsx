// src/components/CartSidebar.tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FREE_SHIPPING = 80;

function parsePriceEUR(input: string | number): number {
  if (typeof input === "number") return input;
  // Nettoie "29,90 €", "29.90€", " 29 € "
  const cleaned = input
    .replace(/[^\d,.\-]/g, "") // garde chiffres, , . et -
    .replace(",", "."); // virgule -> point pour décimales
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatEUR(n: number, locale = "fr-FR") {
  return n.toLocaleString(locale, { style: "currency", currency: "EUR" });
}

const CartSidebar = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalItems } = useCart();
  const { language, t } = useLanguage();
  const base = language === "en" ? "/en" : "/fr";
  const locale = language === "en" ? "en-GB" : "fr-FR";

  const total = items.reduce((sum, item) => {
    const price = parsePriceEUR(item.price as any);
    return sum + price * item.quantity;
  }, 0);

  const remaining = Math.max(0, FREE_SHIPPING - total);

  const L = language === "en"
    ? {
        title: "My Cart",
        empty: "Your cart is empty",
        keep: "Continue shopping",
        total: "Total:",
        checkout: "Checkout",
        freeNow: "🎉 Free shipping!",
        freeLeft: (n: number) => `Only ${formatEUR(n, locale)} left for free shipping`,
      }
    : {
        title: "Mon Panier",
        empty: "Votre panier est vide",
        keep: "Continuer mes achats",
        total: "Total :",
        checkout: "Finaliser la commande",
        freeNow: "🎉 Livraison gratuite !",
        freeLeft: (n: number) => `Plus que ${formatEUR(n, locale)} pour la livraison gratuite`,
      };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-gradient-hero border-white/20 text-foreground">
        <SheetHeader>
          <SheetTitle className="text-foreground font-kalam flex items-center gap-2">
            🛒 {L.title}
            {totalItems > 0 && (
              <Badge className="bg-gradient-accent text-white">{totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-foreground/70 mb-4">{L.empty}</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-black text-white hover:bg-black/90"
              >
                {L.keep}
              </Button>
            </div>
          ) : (
            <>
              {/* Liste des articles */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/10 rounded-lg p-4 backdrop-blur-md"
                    aria-label={item.name}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground text-sm">
                        {item.name}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-foreground/70 hover:text-foreground p-1 h-auto"
                        aria-label="Retirer l'article"
                      >
                        ✕
                      </Button>
                    </div>

                    {item.origin && (
                      <p className="text-xs text-foreground/60 mb-2">{item.origin}</p>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-8 h-8 p-0 bg-white/10 border-white/20 text-foreground"
                          aria-label="Diminuer la quantité"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-sm text-foreground" aria-live="polite">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 bg-white/10 border-white/20 text-foreground"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </Button>
                      </div>

                      <span className="font-medium text-accent">
                        {formatEUR(parsePriceEUR(item.price as any), locale)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-foreground">{L.total}</span>
                  <span className="font-bold text-xl text-accent">
                    {formatEUR(total, locale)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link to={`${base}/checkout`} onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-black text-white hover:bg-black/90">
                      {L.checkout}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-white/10 border-white/20 text-foreground hover:bg-white/20"
                  >
                    {L.keep}
                  </Button>
                </div>

                {total >= FREE_SHIPPING ? (
                  <p className="text-xs text-center text-accent mt-2">{L.freeNow}</p>
                ) : (
                  <p className="text-xs text-center text-foreground/70 mt-2">
                    {L.freeLeft(remaining)}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
