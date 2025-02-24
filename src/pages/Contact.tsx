
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold heading-gradient mb-4">
            We're Here to Help
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Get in touch with our support team for assistance with your RDP services
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          {/* Primary Contact Method */}
          <div className="glass-card p-8 text-center">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Contact via Telegram</h2>
            <p className="text-muted-foreground mb-6">
              Fastest response through our Telegram channel
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a 
                href="https://t.me/GeoVFX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Open Telegram
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Support Hours */}
          <div className="glass-card p-8">
            <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-center mb-4">Support Hours</h2>
            <div className="space-y-2 text-center">
              <p className="text-muted-foreground">
                24/7 Support Available
              </p>
              <p className="text-muted-foreground">
                Average Response Time: &lt; 30 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
