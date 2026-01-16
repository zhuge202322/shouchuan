"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <nav className="relative md:absolute md:top-10 left-0 w-full z-20 py-4 md:py-6">
        <div className="container mx-auto px-6">
          {/* Mobile Header */}
          <div className="flex md:hidden justify-between items-center">
            <button onClick={() => setIsOpen(true)} className="text-[#d4af37] p-1">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <a href="/" className="flex items-center gap-2">
                <Image 
                  src="/img/logo.png" 
                  alt="PRANA HEALS" 
                  width={150} 
                  height={40} 
                  className="object-contain h-8 w-auto"
                />
              </a>
            </div>
            <div className="relative cursor-pointer">
              <Link href="/cart">
                <ShoppingBag className="w-6 h-6 text-[#d4af37]" />
                <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] w-3 h-3 flex items-center justify-center rounded-full">{cartCount}</span>
              </Link>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <a href="/" className="flex items-center gap-2">
                <Image 
                  src="/img/logo.png" 
                  alt="PRANA HEALS" 
                  width={200} 
                  height={50} 
                  className="object-contain h-10 w-auto"
                />
              </a>
            </div>

            <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-stone-300">
              <a href="/shop" className="hover:text-white transition border-b border-transparent hover:border-white pb-1">Shop</a>
              <a href="/shop" className="hover:text-white transition">Collections</a>
              <a href="#" className="hover:text-white transition">Corrections</a>
              <a href="/guide" className="hover:text-white transition">Guide</a>
              <a href="/about" className="hover:text-white transition">Our Story</a>
            </div>

            <div className="flex items-center gap-4 text-stone-300">
              <Search className="w-5 h-5 cursor-pointer hover:text-white" />
              <div className="relative cursor-pointer">
                <Link href="/cart">
                  <ShoppingBag className="w-5 h-5 hover:text-white" />
                  <span className="absolute -top-1 -right-1 bg-red-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-[#0f0f11] transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-serif tracking-wide text-[#f0e6d2]">MENU</div>
            <button onClick={() => setIsOpen(false)} className="text-[#d4af37] p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 text-sm uppercase tracking-widest font-medium text-stone-300">
            <a href="/shop" className="hover:text-white transition py-2 border-b border-white/5">Shop</a>
            <a href="/shop" className="hover:text-white transition py-2 border-b border-white/5">Collections</a>
            <a href="#" className="hover:text-white transition py-2 border-b border-white/5">Corrections</a>
            <a href="/guide" className="hover:text-white transition py-2 border-b border-white/5">Guide</a>
            <a href="/about" className="hover:text-white transition py-2 border-b border-white/5">Our Story</a>
          </div>
        </div>
      </div>
    </>
  );
}
