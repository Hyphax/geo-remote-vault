
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

export function CartPreview() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const { toast } = useToast();

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    toast({
      description: "Item removed from cart",
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Link to="/">
                <Button onClick={() => {
                  const plansSection = document.getElementById('plans-section');
                  if (plansSection) {
                    setTimeout(() => {
                      plansSection.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 glass-card">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.specs.ram} • {item.specs.cpu}
                    </p>
                    {item.storageUpgrade && (
                      <p className="text-sm text-muted-foreground">
                        +{item.storageUpgrade.additionalGB}GB Storage (+${item.storageUpgrade.price}/mo)
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${((item.price + (item.storageUpgrade?.price || 0)) * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mt-2"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="sticky bottom-0 bg-background/95 backdrop-blur p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span>Total</span>
                  <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <Link to="/checkout">
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
