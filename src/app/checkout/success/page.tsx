"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the user lands on the success page
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 flex-1 flex flex-col items-center justify-center text-center">
            
            <div className="w-24 h-24 rounded-full bg-[#1a1a1c] border border-[#d4af37] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <CheckCircle className="w-12 h-12 text-[#d4af37]" />
            </div>

            <h1 className="text-3xl md:text-4xl font-serif text-[#f0e6d2] mb-4">Payment Successful</h1>
            <p className="text-stone-400 max-w-md mx-auto mb-12">
                Thank you for your purchase. Your order has been confirmed and is being prepared with spiritual intention.
            </p>

            <Link 
                href="/shop" 
                className="inline-block bg-[#a81b1b] hover:bg-[#c92222] text-white px-8 py-3 rounded-sm uppercase tracking-[0.2em] text-xs font-bold transition"
            >
                Continue Shopping
            </Link>

        </div>

        <Footer />
      </div>
    </div>
  );
}
