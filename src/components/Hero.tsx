
import { ParticleBg } from "./ParticleBg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <ParticleBg />
      <div className="container mx-auto text-center relative z-10">
        <h1 className="heading-gradient font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto">
          Premium RDP With Root Access
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          High-performance remote desktop solutions with 24/7 uptime and full administrative control
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8">
            View Plans
          </Button>
          <Button size="lg" variant="ghost" className="text-lg group">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
