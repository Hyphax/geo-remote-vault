import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, CheckCircle } from "lucide-react";
import QRCode from "qrcode";
import { useToast } from "@/hooks/use-toast";

const OrderConfirmation = ({ referenceNumber }: { referenceNumber: string }) => {
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
          <li>Receive your RDP credentials</li>
        </ol>
      </div>
      
      <Button asChild className="w-full">
        <a href="https://t.me/GeoVFX" target="_blank" rel="noopener noreferrer">
          Contact on Telegram
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

const Checkout = () => {
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const [qrCode, setQrCode] = useState<string>("");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    if (total > 0) {
      const orderRef = `GEO-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      const paymentUrl = `binance://pay?recipient=289768760&amount=${total.toFixed(2)}&currency=USDT&memo=GeoVFX_Order_${orderRef}`;
      
      QRCode.toDataURL(paymentUrl)
        .then(url => setQrCode(url))
        .catch(err => console.error('QR Code generation error:', err));
    }
  }, [total]);

  const handleProceedToPayment = () => {
    const ref = `GEO-${Date.now().toString(36).toUpperCase()}`;
    setReferenceNumber(ref);
    setIsConfirmed(true);
    console.log('Payment processed with reference:', ref);
  };

  if (isConfirmed) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <OrderConfirmation referenceNumber={referenceNumber} />
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
            <div className="glass-card p-6 text-center">
              <h3 className="font-semibold mb-4">Scan to Pay with Binance</h3>
              {qrCode && (
                <img 
                  src={qrCode} 
                  alt="Payment QR Code" 
                  className="mx-auto mb-6 w-48 h-48"
                />
              )}
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleProceedToPayment}
              >
                I've Made the Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
