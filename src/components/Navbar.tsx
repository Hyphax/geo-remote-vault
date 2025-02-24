
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/lib/store";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useCartStore(state => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "py-6"}`}>
      <nav className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-gradient-primary">
          GeoVFX RDP
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/checkout">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
