"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Lock, CreditCard, AlertCircle } from "lucide-react";
import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart();
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // 1. Confirm Payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
            billing_details: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                address: {
                    city: formData.city,
                    country: "US", // Simplified for now
                    line1: formData.address,
                    line2: formData.apartment,
                    postal_code: formData.zipCode,
                    state: formData.state,
                }
            }
        }
      },
      redirect: "if_required", // Important: We want to handle success manually
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
      return;
    }

    // 2. If Payment Succeeded, Create Order in WooCommerce
    if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    items: cartItems,
                    billingDetails: formData
                }),
            });

            if (!res.ok) {
                console.error("Order creation failed but payment succeeded");
                // Optional: You might want to log this to a monitoring service
                // or show a specific message. For now, we still consider it a "success"
                // from the user's perspective as they paid.
            }

            // 3. Redirect to Success Page
            window.location.href = "/checkout/success";

        } catch (err) {
            console.error("Error creating order:", err);
            // Still redirect to success because payment was taken
            window.location.href = "/checkout/success";
        }
    } else {
        setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
    {/* Left Column: Checkout Form */}
    <div className="lg:col-span-7">
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Contact Info */}
        <section>
          <h2 className="text-xl font-serif text-[#f0e6d2] mb-6 border-b border-stone-800 pb-2 flex justify-between items-center">
            Contact Information
            <span className="text-xs text-stone-500 font-sans tracking-wide">Already have an account? Log in</span>
          </h2>
          <div className="space-y-4">
            <input 
              type="email" 
              name="email"
              placeholder="Email address" 
              className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="newsletter" className="accent-[#d4af37]" />
              <label htmlFor="newsletter" className="text-xs text-stone-500 cursor-pointer select-none">Email me with news and offers</label>
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section>
          <h2 className="text-xl font-serif text-[#f0e6d2] mb-6 border-b border-stone-800 pb-2">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
               <select 
                name="country" 
                className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm appearance-none"
                value={formData.country}
                onChange={handleInputChange}
               >
                 <option value="United States">United States</option>
                 <option value="Canada">Canada</option>
                 <option value="United Kingdom">United Kingdom</option>
               </select>
            </div>
            <input 
              type="text" 
              name="firstName"
              placeholder="First name" 
              className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="lastName"
              placeholder="Last name" 
              className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <div className="col-span-2">
              <input 
                type="text" 
                name="address"
                placeholder="Address" 
                className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <input 
                type="text" 
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)" 
                className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>
            <input 
              type="text" 
              name="city"
              placeholder="City" 
              className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
              required
              value={formData.city}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="state"
                placeholder="State" 
                className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                required
                value={formData.state}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="zipCode"
                placeholder="ZIP code" 
                className="w-full bg-[#151517] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                required
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-xl font-serif text-[#f0e6d2] mb-6 border-b border-stone-800 pb-2">Payment</h2>
          <div className="border border-stone-800 rounded-sm overflow-hidden bg-[#1a1a1c] p-6">
            <PaymentElement 
                options={{
                    layout: "tabs",
                }}
            />
          </div>
        </section>

        {errorMessage && (
            <div className="bg-red-900/20 border border-red-900/50 p-4 text-red-200 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
            </div>
        )}

        <button 
            type="submit" 
            disabled={!stripe || isProcessing}
            className="w-full bg-[#a81b1b] hover:bg-[#c92222] disabled:bg-[#a81b1b]/50 disabled:cursor-not-allowed text-white py-5 rounded-sm uppercase tracking-[0.2em] text-sm font-bold transition shadow-[0_0_20px_rgba(168,27,27,0.3)] hover:shadow-[0_0_30px_rgba(168,27,27,0.5)] mt-8"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>

      </form>
    </div>

    {/* Right Column: Order Summary */}
    <div className="lg:col-span-5">
       <div className="bg-[#1a1a1c] p-8 border border-stone-800 rounded-sm sticky top-32">
         <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6 mb-8 custom-scrollbar">
            {cartItems.map((item) => (
               <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 bg-[#1c1c1c] border border-stone-800 shrink-0">
                     <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#555] rounded-full text-white text-[10px] flex items-center justify-center z-10 border border-[#1a1a1c]">
                        {item.quantity}
                     </div>
                     <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h4 className="font-serif text-[#f0e6d2] text-sm leading-tight truncate">{item.name}</h4>
                     <p className="text-xs text-stone-500 mt-1">{item.sku}</p>
                  </div>
                  <div className="text-stone-300 font-serif text-sm">
                     ${(item.price * item.quantity).toFixed(2)}
                  </div>
               </div>
            ))}
         </div>

         <div className="space-y-4 text-sm text-stone-400 border-t border-stone-800 pt-6 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-stone-200 font-serif">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-stone-200 font-serif">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-stone-800 pt-6">
            <span className="uppercase tracking-widest text-xs font-bold text-[#f0e6d2]">Total</span>
            <div className="text-right">
               <span className="text-xs text-stone-500 mr-2">USD</span>
               <span className="text-3xl font-serif text-[#d4af37]">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[#d4af37]/60 text-xs">
             <Lock className="w-3 h-3" />
             Secure SSL Encryption
          </div>
       </div>
    </div>

  </div>
  );
}
