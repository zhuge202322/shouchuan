import Navbar from "@/components/Navbar";
import { Star, ChevronDown, Sparkles } from "lucide-react";
import ShopContent from "@/components/ShopContent";

interface Product {
  id: number;
  name: string;
  images: { src: string; alt: string }[];
  prices: { price: string; currency_symbol: string };
  permalink: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
}

interface CategoryWithChildren extends Category {
  children: Category[];
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp-json/wp/v2/product_cat?per_page=100&hide_empty=false`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getShopProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp-json/wc/store/products?per_page=12`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Shop() {
  const [products, allCategories] = await Promise.all([
    getShopProducts(),
    getCategories()
  ]);

  // Organize categories into hierarchy
  const parentCategories = allCategories.filter(cat => cat.parent === 0);
  const categoriesWithChildren: CategoryWithChildren[] = parentCategories.map(parent => ({
    ...parent,
    children: allCategories.filter(cat => cat.parent === parent.id)
  }));

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <ShopContent 
          initialProducts={products} 
          categories={categoriesWithChildren} 
          apiUrl={process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ""} 
        />

        {/* Footer Section (Simplified) */}
        <div className="container mx-auto px-4 md:px-6 mt-auto">
          <div className="mt-24 pt-12 pb-12 border-t border-stone-800 grid grid-cols-1 md:grid-cols-4 gap-12 text-stone-500 text-xs">
            <div>
              <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Project</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#d4af37]">Policies</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Collections</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Forest Laws</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Information</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#d4af37]">Forensic</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Crystal Jewelry</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Personal Talismans</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#d4af37]">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Size Guide</a></li>
                <li><a href="#" className="hover:text-[#d4af37]">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Ratings</h4>
              <div className="flex text-[#d4af37] mb-2 gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="mb-4">"Transformative energy & beauty combined."</p>
              <p>© 2026 Prana Heals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

