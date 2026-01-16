import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { Star, ShoppingBag, Shield, Zap, Sun, Wind, Scroll, Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  images: { src: string; alt: string }[];
  prices: { price: string; currency_symbol: string };
  permalink: string;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    const res = await fetch(`${wpUrl}wp-json/wc/store/products/${id}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log("Fetching product with ID:", id);
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] flex justify-center text-[#e5e5e0]">
        <div className="w-full max-w-[1400px] bg-[#0f0f11] min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-serif">Product Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  // Helper to format price
  const price = `${product.prices.currency_symbol}${(parseInt(product.prices.price) / 100).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <main className="pt-32 pb-20 container mx-auto px-4 md:px-8">
          
          {/* Top Section: Image & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            
            {/* Left: Main Image */}
            <div className="lg:col-span-7">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Info & Actions */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-[#f0e6d2] mb-2 leading-tight">
                  {product.name}
                </h1>
                <h2 className="text-xl font-serif text-[#d4af37] mb-4">
                  守护之拥手链
                </h2>
                <div className="text-3xl font-serif text-white mb-6">
                  {price}
                </div>
                
                <AddToCartButton 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.prices.price,
                    image: product.images[0]?.src || "/img/1.png"
                  }} 
                />
              </div>

              {/* Scroll Box (Ancient Power) */}
              <div className="relative bg-[#f5e6d3] text-[#4a3c31] px-8 py-8 rounded-sm shadow-lg border-y-[12px] border-[#d4af37] mx-2 md:mx-4 mt-8">
                {/* Scroll Handles (Wooden Rollers) */}
                <div className="absolute -left-3 -top-4 -bottom-4 w-5 bg-[#5d4037] rounded-full shadow-[2px_0_5px_rgba(0,0,0,0.4)] border-r border-[#3e2723] flex flex-col justify-between py-2">
                   <div className="w-full h-1 bg-[#8d6e63]/30"></div>
                   <div className="w-full h-1 bg-[#8d6e63]/30"></div>
                </div>
                <div className="absolute -right-3 -top-4 -bottom-4 w-5 bg-[#5d4037] rounded-full shadow-[-2px_0_5px_rgba(0,0,0,0.4)] border-l border-[#3e2723] flex flex-col justify-between py-2">
                   <div className="w-full h-1 bg-[#8d6e63]/30"></div>
                   <div className="w-full h-1 bg-[#8d6e63]/30"></div>
                </div>

                <div className="flex gap-8 items-stretch">
                   {/* Vertical Text Column */}
                   <div className="border-r-2 border-[#d7c9b1] pr-6 flex items-center justify-center min-h-[100px]">
                      <div className="flex flex-col gap-2 text-3xl font-serif font-bold text-[#8b5e34] leading-none select-none">
                        <span>古</span>
                        <span>力</span>
                        <span>加</span>
                        <span>持</span>
                      </div>
                   </div>
                   
                   {/* Description Content */}
                   <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-serif font-bold text-xl mb-3 text-[#3e2723]">核心采点</h3>
                      <div 
                        className="text-sm leading-7 opacity-90 font-serif prose prose-p:my-0 prose-p:leading-relaxed text-[#5d4037]"
                        dangerouslySetInnerHTML={{ __html: product.short_description || product.description || `<p>This ${product.name} serves as a vessel for ancient energy, channeling protection and clarity. Handcrafted with precision and consecrated by Taoist masters.</p>` }}
                      />
                      <div className="mt-4 text-right">
                         <div className="inline-flex items-center justify-center w-6 h-6 border border-[#8b5e34] text-[#8b5e34] text-[12px] rounded-sm opacity-80">
                            印
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Material Parameters Table */}
              <div className="border border-stone-800 bg-[#151517] rounded-sm text-sm">
                 <div className="grid grid-cols-2 border-b border-stone-800">
                    <div className="p-3 text-stone-400 border-r border-stone-800 bg-[#1c1c1c]">材质参数</div>
                    <div className="p-3 text-stone-400 bg-[#1c1c1c]">使用指引</div>
                 </div>
                 <div className="grid grid-cols-2 border-b border-stone-800">
                    <div className="p-3 border-r border-stone-800 flex justify-between"><span>Type</span> <span className="text-stone-500">Natural</span></div>
                    <div className="p-3 flex justify-between"><span>Cleanse</span> <span className="text-stone-500">Monthly</span></div>
                 </div>
                 <div className="grid grid-cols-2 border-b border-stone-800">
                    <div className="p-3 border-r border-stone-800 flex justify-between"><span>Origin</span> <span className="text-stone-500">Tibet</span></div>
                    <div className="p-3 flex justify-between"><span>Wear</span> <span className="text-stone-500">Left Hand</span></div>
                 </div>
                 <div className="grid grid-cols-2">
                    <div className="p-3 border-r border-stone-800 flex justify-between"><span>Element</span> <span className="text-stone-500">Earth</span></div>
                    <div className="p-3 flex justify-between"><span>Chakra</span> <span className="text-stone-500">Root</span></div>
                 </div>
              </div>

              {/* Icons Row */}
              <div className="flex justify-between gap-4 pt-4">
                 {[
                    { icon: Sun, label: "Purify" },
                    { icon: Shield, label: "Protect" },
                    { icon: Sparkles, label: "Energy" },
                    { icon: Wind, label: "Flow" }
                 ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                       <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition">
                          <item.icon className="w-6 h-6" />
                       </div>
                    </div>
                 ))}
              </div>

            </div>
          </div>

          {/* Bottom Section: Info Card & Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
             
             {/* Black Info Card */}
             <div className="md:col-span-4 bg-[#1a1a1c] p-6 rounded-sm border border-stone-800 flex items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                   <Scroll className="w-24 h-24" />
                </div>
                <div className="w-20 h-20 rounded-full bg-[#e6dcc3] flex items-center justify-center shrink-0 border-4 border-[#2a2a2c]">
                   <Sparkles className="w-10 h-10 text-[#a81b1b]" />
                </div>
                <div className="relative z-10">
                   <h3 className="text-[#d4af37] font-serif text-lg mb-2">黑玛信息</h3>
                   <p className="text-xs text-stone-500 leading-relaxed">
                      Obsidian is a powerful cleanser of psychic smog created within your aura.
                   </p>
                </div>
             </div>

             {/* Gallery / Related */}
             <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="aspect-[4/3] bg-[#e6dcc3] rounded-sm p-4 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition z-10"></div>
                      {product.images[0] && (
                        <Image 
                          src={product.images[0].src} 
                          alt="gallery" 
                          width={100} 
                          height={100} 
                          className="object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition duration-500" 
                        />
                      )}
                      <div className="absolute bottom-2 right-2 text-[#a81b1b] opacity-50">
                         <div className="w-4 h-4 border border-[#a81b1b] rounded-full text-[8px] flex items-center justify-center">印</div>
                      </div>
                   </div>
                ))}
             </div>

          </div>

        </main>
      </div>
    </div>
  );
}
