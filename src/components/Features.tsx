
import { Terminal, Clock, Zap, Rocket, HeadsetIcon, Shield } from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Full Root Access",
    description: "Complete administrative control over your remote environment"
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Constant monitoring and guaranteed availability"
  },
  {
    icon: Zap,
    title: "Lightning Speed",
    description: "Optimized performance for lag-free experience"
  },
  {
    icon: Rocket,
    title: "Quick Deployment",
    description: "Get your RDP credentials within minutes of purchase"
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description: "Technical assistance whenever you need it"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Advanced protection for your remote environment"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold heading-gradient text-center mb-12">
          Enterprise-Grade RDP Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <feature.icon className="w-10 h-10 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
