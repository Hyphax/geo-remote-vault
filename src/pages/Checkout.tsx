import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const sendTelegramNotification = async (orderDetails: {
  orderRef: string;
  telegramUsername?: string;
  planName: string;
  amount: number;
  specs: string;
}) => {
  const botToken = '7836067134:AAE769m7j3t1qfe1iuX4m8algUzuCI8iKpQ';
  const chatId = '1264599494';
  
  const message = `
🔔 *New Cudo RDP Order*
───────────────
📋 *Order Ref:* ${orderDetails.orderRef}
👤 *Customer:* ${orderDetails.telegramUsername || 'Not provided'}
🖥 *Plan:* ${orderDetails.planName}
💻 *Specs:* ${orderDetails.specs}
💵 *Amount:* $${orderDetails.amount.toFixed(2)}
⏱ *Time:* ${new Date().toLocaleString()}

_Customer has submitted payment confirmation._
  `;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    
    const data = await response.json();
    console.log('Telegram notification sent:', data);
    return data.ok;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};

const OrderConfirmation = ({ 
  referenceNumber,
  telegramUsername 
}: { 
  referenceNumber: string;
  telegramUsername: string;
}) => {
  const { toast } = useToast();
  
  const copyReference = () => {
    navigator.clipboard.writeText(referenceNumber);
    toast({
      description: "Reference number copied to clipboard",
    });
  };

  return (
    <div className="glass-card p-8 max-w-xl mx-auto text-center">
      <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
      <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
      <p className="text-muted-foreground mb-6">
        Your order has been confirmed. Please follow these steps to complete your purchase:
      </p>
      
      <div className="glass p-4 mb-6 flex items-center justify-between gap-4">
        <span className="font-mono text-lg">{referenceNumber}</span>
        <Button variant="ghost" size="icon" onClick={copyReference}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4 text-left mb-8">
        <h3 className="font-semibold">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Copy your reference number</li>
          <li>Contact us on Telegram</li>
          <li>Send payment screenshot and reference</li>
          <li>Receive your RDP credentials (estimated delivery: 30 minutes)</li>
        </ol>
      </div>

      <div className="space-y-4">
        <Button asChild className="w-full">
          <a href={`https://t.me/GeoVFX`} target="_blank" rel="noopener noreferrer">
            Contact on Telegram
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        
        <Link to="/">
          <Button variant="outline" className="w-full">
            Return to Homepage
          </Button>
        </Link>
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Estimated delivery time: 30 minutes</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
          <MessageSquare className="h-4 w-4" />
          <span>Need help? Contact support on Telegram</span>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [total, setTotal] = useState(0);
  const [telegramUsername, setTelegramUsername] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const binancePayId = "289768760";

  useEffect(() => {
    const storeTotal = getTotalPrice();
    const calculatedTotal = items.reduce((sum, item) => {
      const itemPrice = typeof item.price === 'string' 
        ? parseFloat(item.price) 
        : item.price;
      return sum + (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);
    
    const finalTotal = storeTotal > 0 ? storeTotal : calculatedTotal;
    setTotal(finalTotal);
    console.log('Cart total calculation:', { storeTotal, calculatedTotal, finalTotal });
  }, [items, getTotalPrice]);

  const copyBinanceId = () => {
    navigator.clipboard.writeText(binancePayId);
    toast({
      description: "Binance Pay ID copied to clipboard",
    });
  };

  const handleProceedToPayment = async () => {
    if (!telegramUsername || !transactionId) {
      toast({
        variant: "destructive",
        description: "Please provide both Telegram username and transaction ID",
      });
      return;
    }

    setIsSubmitting(true);
    const ref = `GEO-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setReferenceNumber(ref);

    const specs = items.map(item => 
      `${item.specs.ram}, ${item.specs.cpu}, ${item.specs.storage}`
    ).join(' | ');

    try {
      await sendTelegramNotification({
        orderRef: ref,
        telegramUsername,
        planName: items.map(item => item.name).join(', '),
        amount: total,
        specs
      });

      const orderDetails = {
        reference: ref,
        items,
        total,
        telegramUsername,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`order_${ref}`, JSON.stringify(orderDetails));

      clearCart();
      setIsConfirmed(true);
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        variant: "destructive",
        description: "Error processing order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <OrderConfirmation 
            referenceNumber={referenceNumber}
            telegramUsername={telegramUsername}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass-card p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">
                    {item.specs.ram} • {item.specs.cpu} • {item.specs.storage}
                  </p>
                  <p className="text-right font-semibold">${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}</p>
                </div>
              ))}
            </div>
            
            <div className="glass p-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Payment</h2>
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">1. Scan to Pay with Binance</h3>
              <div className="text-center mb-4">
                <img 
                  src="/lovable-uploads/e282f8d7-2b74-490a-b638-f3407e9d51ab.png" 
                  alt="Binance Pay QR Code" 
                  className="mx-auto mb-4 w-48 h-48"
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-muted-foreground">Binance Pay ID:</span>
                  <code className="bg-muted px-2 py-1 rounded">{binancePayId}</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={copyBinanceId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Telegram Username"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Payment Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md"
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleProceedToPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "I've Made the Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
