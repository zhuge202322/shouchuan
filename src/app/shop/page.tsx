import Navbar from "@/components/Navbar";
import { ChevronDown, Sparkles } from "lucide-react";
import ShopContent from "@/components/ShopContent";
import Footer from "@/components/Footer";

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
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    const res = await fetch(`${wpUrl}wp-json/wp/v2/product_cat?per_page=100&hide_empty=false`, {
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
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    const res = await fetch(`${wpUrl}wp-json/wc/store/products?per_page=12`, {
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

        <Footer />
      </div>
    </div>
  );
}

