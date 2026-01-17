import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scroll, Sparkles, Gem, Compass } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <main className="pt-32 pb-20 container mx-auto px-4 md:px-8">
          
          {/* Hero Section */}
          <section className="text-center max-w-4xl mx-auto mb-20 relative py-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-30">
              <Image 
                src="/img/about.png" 
                alt="About Background" 
                fill 
                className="object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11]/80 via-[#0f0f11]/50 to-[#0f0f11] z-10"></div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-[#f0e6d2] mb-6 leading-tight relative z-10 drop-shadow-lg">
              Weaving Ancient Energy <br />
              <span className="text-[#d4af37]">Into Modern Life</span>
            </h1>
            <p className="text-lg text-stone-300 font-light leading-relaxed max-w-2xl mx-auto relative z-10 drop-shadow-md">
              Prana Heals is not just a jewelry brand. It is a bridge between the mystical traditions of the East and the spiritual needs of the contemporary soul.
            </p>
          </section>

          {/* Our Story Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div className="relative aspect-[4/5] bg-[#1c1c1c] border border-stone-800 p-2 rounded-sm group">
               <div className="absolute inset-0 bg-[url('/img/1.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
               <div className="relative w-full h-full overflow-hidden border border-stone-800/50">
                  <Image 
                    src="/img/1.png" 
                    alt="Our Studio" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition duration-700 ease-in-out" 
                  />
               </div>
               {/* Decorative stamp */}
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0f0f11] rounded-full flex items-center justify-center border border-stone-800 z-10">
                  <div className="w-20 h-20 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-serif italic text-xs text-center p-2">
                    Est. <br/> 1985
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <h2 className="text-3xl font-serif text-[#f0e6d2] flex items-center gap-4">
                  <Scroll className="w-8 h-8 text-[#d4af37]" />
                  The Origin
               </h2>
               <div className="space-y-6 text-stone-400 leading-relaxed font-serif text-lg">
                  <p>
                    Our journey began in the high altitudes of the Himalayas, where the air is thin and the spirit is strong. It was here that we discovered the profound impact of <strong>Taoist geomancy</strong> and crystal healing.
                  </p>
                  <p>
                    We realized that in the rush of the modern world, people have lost their connection to the earth's natural rhythms. Our mission became clear: to craft vessels of energy—talismans that ground, protect, and empower.
                  </p>
                  <p className="text-[#f0e6d2] border-l-4 border-[#a81b1b] pl-6 py-2 italic">
                    "Every stone has a voice. We simply listen to it and give it a form to sing."
                  </p>
               </div>
            </div>
          </section>

          {/* Values / Pillars */}
          <section className="mb-32">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-serif text-[#f0e6d2] mb-4">Our Sacred Pillars</h2>
                <div className="w-24 h-1 bg-[#d4af37] mx-auto"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pillar 1 */}
                <div className="bg-[#151517] border border-stone-800 p-8 text-center group hover:border-[#d4af37]/30 transition duration-500">
                   <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1c1c1c] flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition duration-500">
                      <Gem className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-serif text-[#f0e6d2] mb-4">Ethical Origins</h3>
                   <p className="text-stone-500 text-sm leading-relaxed">
                      We source our crystals directly from miners who respect the earth. No exploitation, only reverence for the gifts of nature.
                   </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-[#151517] border border-stone-800 p-8 text-center group hover:border-[#d4af37]/30 transition duration-500">
                   <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1c1c1c] flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition duration-500">
                      <Sparkles className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-serif text-[#f0e6d2] mb-4">Ritual Consecration</h3>
                   <p className="text-stone-500 text-sm leading-relaxed">
                      Every piece is cleansed with sage and blessed in a traditional ceremony before it leaves our sanctuary, locking in high-vibrational intent.
                   </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-[#151517] border border-stone-800 p-8 text-center group hover:border-[#d4af37]/30 transition duration-500">
                   <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1c1c1c] flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition duration-500">
                      <Compass className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-serif text-[#f0e6d2] mb-4">Taoist Design</h3>
                   <p className="text-stone-500 text-sm leading-relaxed">
                      Our designs follow the principles of Feng Shui and Bagua, ensuring that each artifact harmonizes with your personal energy field.
                   </p>
                </div>
             </div>
          </section>

          {/* CTA Section */}
          <section className="relative bg-[#1a1a1c] border-y border-stone-800 py-20 px-4 text-center overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                   <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="#d4af37" />
                   </pattern>
                   <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
                </svg>
             </div>

             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-serif text-[#f0e6d2] mb-6">Ready to Find Your Talisman?</h2>
                <p className="text-stone-400 mb-8 font-light">
                   Let intuition guide you. The crystal that calls to you is the one you need most right now.
                </p>
                <Link 
                   href="/shop" 
                   className="inline-block bg-[#a81b1b] hover:bg-[#c92222] text-white px-12 py-4 rounded-sm uppercase tracking-[0.2em] text-sm font-bold transition shadow-[0_0_30px_rgba(168,27,27,0.3)] hover:shadow-[0_0_50px_rgba(168,27,27,0.6)]"
                >
                   Explore Collection
                </Link>
             </div>
          </section>

        </main>
        
        <Footer />
      </div>
    </div>
  );
}
