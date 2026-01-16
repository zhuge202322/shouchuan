"use client";

import { useCart, CartItem } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price) / 100, // Assuming price is in cents
      quantity: 1,
      image: product.image,
      sku: `SKU-${product.id}` // Mock SKU
    };

    addToCart(item);
    router.push("/cart");
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-[#a81b1b] hover:bg-[#c92222] text-white px-10 py-3 rounded-full text-sm font-medium uppercase tracking-widest shadow-[0_0_20px_rgba(168,27,27,0.4)] transition transform hover:-translate-y-1"
    >
      Add to Cart
    </button>
  );
}
