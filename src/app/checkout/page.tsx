"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

// Initialize Stripe outside of component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 15;
  const total = subtotal + shipping;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (total > 0) {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems, amount: Math.round(total * 100) }), // Amount in cents
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [total, cartItems]);

  const appearance = {
    theme: 'night' as const,
    variables: {
        colorPrimary: '#d4af37',
        colorBackground: '#1a1a1c',
        colorText: '#e5e5e0',
        colorDanger: '#df1b41',
        fontFamily: 'serif',
        spacingUnit: '4px',
        borderRadius: '2px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link href="/cart" className="text-stone-500 hover:text-[#d4af37] text-sm flex items-center gap-2 transition w-fit">
              <ArrowLeft className="w-4 h-4" /> Return to Cart
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-[#f0e6d2] mb-12 text-center">Secure Checkout</h1>

          {cartItems.length === 0 ? (
             <div className="text-center py-20">
                <p className="text-stone-500 mb-4">Your cart is empty.</p>
                <Link href="/shop" className="text-[#d4af37] underline">Return to Shop</Link>
             </div>
          ) : (
             <>
                {clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" />
                        <p className="text-stone-500 text-sm">Initializing secure payment...</p>
                    </div>
                )}
             </>
          )}

        </div>

        <Footer />
      </div>
    </div>
  );
}
