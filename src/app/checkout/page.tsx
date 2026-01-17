"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems } = useCart();
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
    paymentMethod: "card"
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a demo checkout. Payment processing would happen here.");
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
                  <div className="border border-stone-800 rounded-sm overflow-hidden">
                    <div className="bg-[#1a1a1c] p-4 flex items-center justify-between border-b border-stone-800 cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded-full border-[5px] border-[#d4af37] bg-transparent"></div>
                         <span className="text-sm font-medium">Credit Card</span>
                      </div>
                      <div className="flex gap-2 text-stone-400">
                         <CreditCard className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="bg-[#151517] p-6 grid grid-cols-1 gap-4">
                       <input 
                        type="text" 
                        placeholder="Card number" 
                        className="w-full bg-[#0f0f11] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                       />
                       <input 
                        type="text" 
                        placeholder="Name on card" 
                        className="w-full bg-[#0f0f11] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                       />
                       <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            placeholder="Expiration date (MM / YY)" 
                            className="w-full bg-[#0f0f11] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                           />
                           <input 
                            type="text" 
                            placeholder="Security code" 
                            className="w-full bg-[#0f0f11] border border-stone-800 p-4 text-sm text-stone-200 focus:outline-none focus:border-[#d4af37] transition rounded-sm"
                           />
                       </div>
                    </div>
                  </div>
                </section>

                <button type="submit" className="w-full bg-[#a81b1b] hover:bg-[#c92222] text-white py-5 rounded-sm uppercase tracking-[0.2em] text-sm font-bold transition shadow-[0_0_20px_rgba(168,27,27,0.3)] hover:shadow-[0_0_30px_rgba(168,27,27,0.5)] mt-8">
                  Pay Now
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
        </div>

        <Footer />
      </div>
    </div>
  );
}
