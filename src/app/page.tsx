import Image from "next/image";
import { ShoppingBag, Star, Compass, Gem } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Product {
  id: number;
  name: string;
  images: { src: string; alt: string }[];
  permalink: string;
}

async function getLatestProducts(): Promise<Product[]> {
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    const res = await fetch(`${wpUrl}wp-json/wc/store/products?per_page=3`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      console.error("Failed to fetch products");
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getRandomProducts(): Promise<Product[]> {
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    // Fetch a larger pool to pick random items from
    const res = await fetch(`${wpUrl}wp-json/wc/store/products?per_page=20`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      return [];
    }

    const products: Product[] = await res.json();
    // Shuffle and slice
    return products.sort(() => 0.5 - Math.random()).slice(0, 3);
  } catch (error) {
    console.error("Error fetching random products:", error);
    return [];
  }
}

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const randomProducts = await getRandomProducts();

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden">
      
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Top Banner */}
        <div className="bg-[#4a0404] text-center py-2 text-xs md:text-sm tracking-widest text-white border-b border-[#5a1a1a]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="uppercase font-medium">✨ Free shipping on orders over $75 | Blessed & Cleansed before shipping</span>
          <a href="#" className="hidden md:inline-block border border-white/30 px-3 py-1 text-[10px] uppercase hover:bg-white/10 transition">
            [ Explore the Collection ]
          </a>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-[#1c1c1c] overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/1.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-20 h-full flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-4xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-[#f0e6d2] mb-4 md:mb-6 drop-shadow-lg">
            Unlock Ancient Power. <br />
            <span className="text-[#d4af37]">Forge Your Destiny.</span>
          </h1>
          <p className="text-base md:text-xl text-stone-300 max-w-2xl mb-8 md:mb-10 font-light leading-relaxed">
            Sacred Talismans & Mystical Crystals, imbued with the <br className="hidden md:block"/> wisdom of Taoist Sages.
          </p>
          
          {/* Desktop Buttons */}
          <div className="hidden md:flex flex-wrap gap-4">
            <button className="px-8 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition uppercase tracking-widest text-sm font-medium">
              Explore The Collection
            </button>
            <button className="px-8 py-3 bg-[#3a1d1d] text-white hover:bg-[#4a2525] transition uppercase tracking-widest text-sm font-medium flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Taoist Consecration
            </button>
          </div>

          {/* Mobile Buttons & Icons */}
          <div className="flex md:hidden flex-col items-center w-full gap-8 mt-4">
            <button className="w-full max-w-xs bg-[#4a0404]/90 backdrop-blur-sm text-[#d4af37] py-4 rounded-xl uppercase tracking-widest text-sm font-medium shadow-lg border border-[#5a1a1a]">
              Explore Collections
            </button>
            
            <div className="flex justify-center gap-12 text-[#d4af37] text-[10px] tracking-wide font-medium opacity-90">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 border border-[#d4af37]/50 rounded-full bg-black/20 backdrop-blur-md">
                   <Compass className="w-5 h-5" />
                </div>
                <span>Taoist Geomancy</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 border border-[#d4af37]/50 rounded-full bg-black/20 backdrop-blur-md">
                   <Gem className="w-5 h-5" />
                </div>
                <span>Earth-Mined Crystal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Sidebar / Info Column */}
          <div className="lg:col-span-3 space-y-8 md:space-y-12 order-2 lg:order-1">
            {/* Intro Widget */}
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-stone-700 relative">
                <Image src="/img/ren.png" fill className="object-cover" alt="Sage" />
              </div>
              <div>
                <h3 className="text-[#d4af37] font-serif text-lg mb-2">Ancient Wisdom for Modern Living</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            {/* Stamp Widget */}
            <div className="bg-[#151517] p-6 border border-white/5 text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image 
                  src="/img/yin.png" 
                  alt="Seal of the Ancients" 
                  fill 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-serif text-[#d4af37] mb-2">Whispers of the Ancestors</h3>
              <p className="text-xs text-stone-500 mb-6">
                Each piece is marked by the Seal of the Ancients—a promise of authenticity and high vibrational purity.
              </p>
              <div className="font-dancing-script text-2xl text-stone-600 italic">Signature</div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#1a1a1c] p-6 border-t-4 border-[#3a1d1d]">
              <h3 className="text-lg font-serif text-white mb-2">Join the Inner Circle</h3>
              <p className="text-xs text-stone-500 mb-4">Receive monthly cosmic insights & exclusive access.</p>
              <input 
                type="email" 
                placeholder="Newsletter Sign up" 
                className="w-full bg-[#0f0f11] border border-stone-800 p-2 text-sm mb-2 text-stone-300 focus:outline-none focus:border-[#d4af37]"
              />
              <button className="w-full bg-[#4a0404] hover:bg-[#5a0505] text-white text-xs uppercase tracking-widest py-2 transition">
                Medical Disclaimer
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-12 md:space-y-16 order-1 lg:order-2">
            
            {/* Featured Collections */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif text-[#f0e6d2] mb-6 md:mb-8 border-b border-stone-800 pb-2 inline-block">Featured Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                {latestProducts.length > 0 ? (
                  latestProducts.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      <div className="relative aspect-square bg-[#151517] border border-stone-800 group-hover:border-[#d4af37]/50 transition duration-500 overflow-hidden">
                        {product.images[0] ? (
                          <Image 
                            src={product.images[0].src} 
                            alt={product.images[0].alt || product.name} 
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-stone-600">No Image</div>
                        )}
                      </div>
                      <h3 className="mt-2 md:mt-4 text-center font-serif text-stone-300 group-hover:text-[#d4af37] transition text-sm md:text-base">{product.name}</h3>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 md:col-span-3 text-stone-500 text-center">Loading collections...</div>
                )}
              </div>
            </div>

            {/* Featured Artifacts */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif text-[#f0e6d2] mb-6 md:mb-8 border-b border-stone-800 pb-2 inline-block">Featured Artifacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                {randomProducts.length > 0 ? (
                  randomProducts.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      <div className="relative aspect-square bg-[#151517] border border-stone-800 group-hover:border-[#d4af37]/50 transition duration-500 overflow-hidden">
                        {product.images[0] ? (
                          <Image 
                            src={product.images[0].src} 
                            alt={product.images[0].alt || product.name} 
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-stone-600">No Image</div>
                        )}
                      </div>
                      <h3 className="mt-2 md:mt-4 text-xs md:text-sm text-stone-400 group-hover:text-[#d4af37] transition leading-relaxed md:pr-4">
                        {product.name}
                      </h3>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 md:col-span-3 text-stone-500 text-center">Loading artifacts...</div>
                )}
              </div>
            </div>

            {/* Testimonials Footer Area */}
            <div className="pt-8 md:pt-12 border-t border-stone-900">
              <h2 className="text-lg md:text-xl font-serif text-[#f0e6d2] mb-6 text-center md:text-left">Testimonials</h2>
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8">
                <div className="text-center md:text-left">
                  <div className="flex text-[#d4af37] mb-2 gap-1 justify-center md:justify-start">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <ul className="text-xs text-stone-500 space-y-2 mt-4">
                    <li><a href="#" className="hover:text-stone-300">Policies</a></li>
                    <li><a href="#" className="hover:text-stone-300">Contact</a></li>
                    <li><a href="#" className="hover:text-stone-300">FAQ</a></li>
                  </ul>
                </div>
                
                <div className="max-w-md text-center md:text-right">
                  <div className="flex text-[#d4af37] mb-2 gap-1 justify-center md:justify-end">
                     {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm italic text-stone-400">"I can feel the cosmic aura & Bestiality wind packaged"</p>
                </div>
              </div>
              
              <div className="mt-8 md:mt-12 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-600 gap-2">
                <p>© 2026 Prana Heals. All Cosmic Rights Reserved.</p>
                <p>Crafted with Intention in [Your City/Region]</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Floating Sparkle/Decoration */}
      <div className="fixed bottom-8 right-8 text-stone-600 opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
      </div>
      </div>
    </div>
  );
}
