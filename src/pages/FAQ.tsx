
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqSections = [
  {
    category: "Billing & Pricing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We primarily accept cryptocurrency payments through Binance Pay for enhanced security and faster transactions."
      },
      {
        q: "Can I upgrade my plan later?",
        a: "Yes, you can upgrade your RDP plan at any time. The price difference will be prorated for the remaining period."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "What does Root Access mean?",
        a: "Root access gives you complete administrative control over your RDP environment, allowing you to install any software and make system-level changes."
      },
      {
        q: "How do I connect to my RDP?",
        a: "After purchase, you'll receive connection details including IP address, username, and password. You can connect using any standard RDP client."
      },
      {
        q: "What is the server uptime guarantee?",
        a: "We guarantee 99.9% uptime for Business plans and 99.99% for Premium plans, with monitoring and automatic failover systems in place."
      }
    ]
  },
  {
    category: "Support",
    questions: [
      {
        q: "How do I get technical support?",
        a: "Technical support is available 24/7 through our Telegram channel. Premium plan users get priority support with faster response times."
      },
      {
        q: "What's included in 24/7 support?",
        a: "Our support covers technical issues, connectivity problems, server maintenance, and general inquiries about our services."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold heading-gradient text-center mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Find answers to common questions about our RDP services
          </p>

          <div className="space-y-8">
            {faqSections.map((section) => (
              <div key={section.category} className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4">{section.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
