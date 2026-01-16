"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#f0e6d2] mb-12 text-center">Your Sacred Collection</h1>

          {cartItems.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-[#1c1c1c] flex items-center justify-center border border-stone-800">
                    <ShoppingBag className="w-10 h-10 text-stone-600" />
                </div>
                <h2 className="text-xl font-serif text-stone-400">Your cart is empty</h2>
                <Link href="/shop" className="px-8 py-3 bg-[#4a0404] hover:bg-[#5a0505] text-white uppercase tracking-widest text-xs transition">
                  Start Collection
                </Link>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-6">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-stone-800 text-sm text-stone-500 uppercase tracking-widest font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="group relative bg-[#151517] border border-stone-800 p-4 md:p-6 rounded-sm flex flex-col md:grid md:grid-cols-12 gap-6 items-center hover:border-[#d4af37]/30 transition duration-300">
                    
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-6 w-full">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#1c1c1c] border border-stone-800 shrink-0">
                         <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                      </div>
                      <div>
                        <h3 className="font-serif text-[#f0e6d2] text-lg mb-1 leading-tight">{item.name}</h3>
                        <p className="text-xs text-stone-500 mb-2">{item.sku}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-[10px] text-[#a81b1b] hover:text-[#c92222] transition uppercase tracking-widest"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-stone-300 font-serif">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                       <div className="flex items-center justify-center border border-stone-700 bg-[#0f0f11] w-24 mx-auto">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-stone-800 text-stone-400 transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-stone-800 text-stone-400 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                       </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-right font-serif text-[#d4af37] text-lg w-full md:w-auto flex justify-between md:block">
                      <span className="md:hidden text-stone-500 text-sm">Subtotal:</span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-[#1a1a1c] p-8 border border-stone-800 sticky top-32">
                  <h2 className="text-xl font-serif text-[#f0e6d2] mb-6 border-b border-stone-800 pb-4">Order Summary</h2>
                  
                  <div className="space-y-4 text-sm text-stone-400 mb-8">
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
                    {shipping === 0 && (
                      <div className="text-[10px] text-[#d4af37] text-right italic">
                        ✨ Free shipping applied
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end border-t border-stone-800 pt-6 mb-8">
                    <span className="uppercase tracking-widest text-xs font-bold text-[#f0e6d2]">Total</span>
                    <span className="text-3xl font-serif text-[#d4af37]">${total.toFixed(2)}</span>
                  </div>

                  <Link 
                    href="/checkout"
                    className="w-full bg-[#a81b1b] hover:bg-[#c92222] text-white py-4 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs font-bold transition shadow-[0_0_20px_rgba(168,27,27,0.3)] hover:shadow-[0_0_30px_rgba(168,27,27,0.5)]"
                  >
                    Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="mt-6 flex items-start gap-3 text-[10px] text-stone-500 leading-relaxed">
                     <ShieldCheck className="w-4 h-4 shrink-0 text-[#d4af37]" />
                     <p>Secure Checkout. All items are spiritually cleansed and blessed before shipping.</p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Importing ShoppingBag locally for the empty state
function ShoppingBag({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
