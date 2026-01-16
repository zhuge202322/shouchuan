"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  images: { src: string; alt: string }[];
  prices: { price: string; currency_symbol: string };
  permalink: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
}

export interface CategoryWithChildren extends Category {
  children: Category[];
}

interface ShopContentProps {
  initialProducts: Product[];
  categories: CategoryWithChildren[];
  apiUrl: string;
}

export default function ShopContent({ initialProducts, categories, apiUrl }: ShopContentProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper to decode HTML entities
  const decodeHtml = (html: string) => {
    return html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#038;/g, "&");
  };

  const handleCategoryClick = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    setLoading(true);

    try {
      // Use the local API proxy to avoid CORS issues
      const res = await fetch(`/api/products?category=${categoryId}&per_page=12`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products for category");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
      
      {/* Collections Header & Filters */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-8 border-b border-stone-800 pb-4">
          <h1 className="text-3xl font-serif text-[#f0e6d2]">Collections</h1>
          <div className="relative">
            <button className="flex items-center gap-2 text-stone-400 hover:text-[#d4af37] transition text-sm uppercase tracking-widest border border-stone-800 px-4 py-2">
              Collections <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Categories Grid */}
        <div className="space-y-12 mb-16">
          {categories.map((parent) => (
            <div key={parent.id}>
              {/* Parent Category Header with Separator */}
              <div className="flex items-center gap-4 mb-6">
                 <h2 className="text-xl font-serif text-[#d4af37] whitespace-nowrap">{decodeHtml(parent.name)}</h2>
                 <div className="h-px bg-stone-800 w-full"></div>
              </div>

              {/* Children Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {parent.children.length > 0 ? (
                  parent.children.map((child) => (
                    <button 
                      key={child.id} 
                      onClick={() => handleCategoryClick(child.id)}
                      className={`flex items-center gap-3 cursor-pointer transition group p-3 border text-left ${
                        selectedCategory === child.id 
                          ? "border-[#d4af37] bg-[#1a1a1c]" 
                          : "border-stone-800/50 bg-[#151517] hover:border-[#d4af37]/30 hover:text-[#d4af37]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition shrink-0 ${selectedCategory === child.id ? "bg-[#d4af37]" : "bg-stone-700 group-hover:bg-[#d4af37]"}`}></span>
                      <span className={`text-sm font-medium transition ${selectedCategory === child.id ? "text-[#d4af37]" : "text-stone-300 group-hover:text-[#f0e6d2]"}`}>
                        {decodeHtml(child.name)}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full text-stone-600 italic text-sm">No collections available yet.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
        </div>
      )}

      {/* Product Grid */}
      {!loading && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-[#1c1c1c] border border-stone-800 p-1 group-hover:border-[#d4af37]/30 transition duration-500">
                    <div className="absolute top-3 left-3 z-10 text-[#d4af37]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="relative w-full h-full overflow-hidden bg-black/50">
                      {product.images[0] ? (
                        <Image 
                          src={product.images[0].src} 
                          alt={product.images[0].alt || product.name} 
                          fill
                          className="object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100" 
                        />
                      ) : (
                         <div className="flex items-center justify-center h-full w-full text-stone-600">No Image</div>
                      )}
                    </div>
                  </div>

                  {/* Info Container */}
                  <div className="bg-[#f0e6d2] text-[#1c1c1c] p-4 text-center flex flex-col items-center gap-2 relative mt-[-1px] border border-stone-800/0">
                    <h3 className="font-serif text-lg leading-tight line-clamp-1">{product.name}</h3>
                    <p className="text-sm font-medium text-[#8b5e34] mb-2">
                      {product.prices.currency_symbol}{parseInt(product.prices.price) / 100}
                    </p>
                    <button className="bg-[#4a0404] text-white text-xs uppercase tracking-widest px-6 py-2 hover:bg-[#5a0505] transition w-full md:w-auto">
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <div className="text-stone-500 font-serif text-lg">No sacred artifacts found in this collection.</div>
               <button onClick={() => { setSelectedCategory(null); setProducts(initialProducts); }} className="mt-4 text-[#d4af37] text-sm hover:underline">
                  View all collections
               </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
