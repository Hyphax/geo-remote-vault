
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useCartStore, type Plan } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic RDP",
    price: 10.00,
    specs: {
      ram: "8GB RAM",
      cpu: "2 vCPU",
      storage: "120GB Storage"
    },
    features: [
      "Root Access",
      "Basic Support",
      "99.5% Uptime",
      "Fixed Storage",
      "Automated Backups",
      "Single IP Address"
    ]
  },
  {
    id: "business",
    name: "Business RDP",
    price: 15.00,
    specs: {
      ram: "16GB RAM",
      cpu: "4 vCPU",
      storage: "120GB Storage"
    },
    features: [
      "Root Access",
      "Priority Support",
      "99.9% Uptime",
      "Upgradable Storage (+50GB for $1/mo)",
      "Daily Backups",
      "Dedicated IP"
    ]
  },
  {
    id: "premium",
    name: "Premium RDP",
    price: 20.00,
    specs: {
      ram: "32GB RAM",
      cpu: "8 vCPU",
      storage: "120GB Storage"
    },
    features: [
      "Root Access",
      "24/7 Dedicated Support",
      "99.99% Uptime",
      "Upgradable Storage (+50GB for $1/mo)",
      "Hourly Backups",
      "Multiple Dedicated IPs",
      "Load Balancing"
    ]
  }
];

export const Plans = () => {
  const addToCart = useCartStore(state => state.addToCart);
  const { toast } = useToast();

  const handleAddToCart = (plan: Plan) => {
    if (typeof plan.price !== 'number' || isNaN(plan.price)) {
      console.error('Invalid price format:', plan.price);
      toast({
        variant: "destructive",
        description: "Error adding plan to cart. Please try again.",
      });
      return;
    }

    addToCart(plan);
    toast({
      description: `${plan.name} added to cart successfully.`,
    });
  };

  return (
    <section className="py-24 px-4 relative" id="plans-section">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold heading-gradient text-center mb-4">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Select the perfect RDP solution for your needs with our flexible plans
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isPopular = plan.id === "business";
            
            return (
              <div
                key={plan.id}
                className={`glass-card p-8 relative ${
                  isPopular ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price.toFixed(2)}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-lg font-semibold">Specifications:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>{plan.specs.ram}</li>
                    <li>{plan.specs.cpu}</li>
                    <li>{plan.specs.storage}</li>
                  </ul>
                </div>
                
                <div className="space-y-4 mb-8">
                  <p className="text-lg font-semibold">Features:</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.id !== "basic" && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Storage upgrades available (+$1/month per 50GB)
                  </p>
                )}
                
                <Button 
                  className="w-full"
                  size="lg"
                  variant={isPopular ? "default" : "outline"}
                  onClick={() => handleAddToCart(plan)}
                >
                  Add to Cart
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
