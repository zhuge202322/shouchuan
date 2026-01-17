import Link from "next/link";
import { Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f0f11] mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="pt-12 pb-12 border-t border-stone-800 grid grid-cols-1 md:grid-cols-4 gap-12 text-stone-500 text-xs">
          <div>
            <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Project</h4>
            <ul className="space-y-2">
              <li><Link href="/policies" className="hover:text-[#d4af37]">Policies</Link></li>
              <li><Link href="/shop" className="hover:text-[#d4af37]">Collections</Link></li>
              <li><Link href="/forest-laws" className="hover:text-[#d4af37]">Forest Laws</Link></li>
              <li><Link href="/sitemap" className="hover:text-[#d4af37]">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Information</h4>
            <ul className="space-y-2">
              <li><Link href="/forensic" className="hover:text-[#d4af37]">Forensic</Link></li>
              <li><Link href="/shop?category=crystal-jewelry" className="hover:text-[#d4af37]">Crystal Jewelry</Link></li>
              <li><Link href="/shop?category=personal-talismans" className="hover:text-[#d4af37]">Personal Talismans</Link></li>
              <li><Link href="/maintenance" className="hover:text-[#d4af37]">Maintenance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#f0e6d2] font-serif text-lg mb-6">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/shipping-returns" className="hover:text-[#d4af37]">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-[#d4af37]">Size Guide</Link></li>
              <li><Link href="/contact" className="hover:text-[#d4af37]">Contact Us</Link></li>
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
    </footer>
  );
}
