"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // If no images, render placeholder
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full bg-[#1c1c1c] border border-stone-800 p-8 rounded-sm overflow-hidden flex items-center justify-center text-stone-600">
        No Image
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-[#1c1c1c] border border-stone-800 p-8 rounded-sm overflow-hidden group">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Image src="/img/1.png" alt="bg" fill className="object-cover" />
        </div>
        
        <div className="relative w-full h-full drop-shadow-2xl">
          <Image 
            src={selectedImage.src} 
            alt={selectedImage.alt || productName} 
            fill
            className="object-contain group-hover:scale-105 transition duration-700" 
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square bg-[#1c1c1c] border cursor-pointer overflow-hidden transition duration-300 ${
                selectedIndex === idx 
                  ? "border-[#d4af37] opacity-100" 
                  : "border-stone-800 opacity-60 hover:opacity-100 hover:border-[#d4af37]/50"
              }`}
            >
              <Image 
                src={img.src} 
                alt={img.alt || `${productName} thumbnail ${idx + 1}`} 
                fill
                className="object-contain p-2" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
