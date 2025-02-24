
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartPreview } from "./CartPreview";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-bold text-gradient-primary z-20"
        >
          Cudo RDP
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

        <div className="flex items-center gap-4 z-20">
          <div className="block md:hidden">
            <CartPreview />
          </div>
          <div className="hidden md:block">
            <CartPreview />
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="min-h-[44px] min-w-[44px] touch-manipulation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-[300px] bg-background/95 backdrop-blur-xl">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors px-4 py-2 -mx-4"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
