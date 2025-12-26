"use client";

import Image from "next/image";
import Link from "next/link"; 
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart"; // <--- 1. Import the brain
import toast from "react-hot-toast";       // <--- 2. Import the notification

interface ProductCardProps {
  data: {
    id: string;
    name: string;
    description: string;
    price: number | string;
    images: string[];
    category?: { name: string };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart(); // <--- 3. Initialize the hook

  // 4. Create the click handler
  const onAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents clicking the button from opening the product details page
    e.preventDefault(); 

    cart.addItem({
      id: data.id,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      image: data.images?.[0] || "" 
    } as any);
    
    toast.success("Added to cart!");
  };

  return (
    <div className="group bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      
      {/* LINK TO DETAILS */}
      <Link href={`/shop/${data.id}`}>
        <div className="aspect-square relative bg-stone-100 cursor-pointer">
          <Image 
            src={data.images?.[0] || '/placeholder.jpg'} 
            alt={data.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-stone-500 mb-1">Jhunus Craft</p>
            <Link href={`/shop/${data.id}`}>
              <h3 className="font-bold text-stone-900 text-lg truncate hover:underline cursor-pointer">
                {data.name}
              </h3>
            </Link>
          </div>
          <p className="font-medium text-stone-900 bg-stone-100 px-2 py-1 rounded">
            ${Number(data.price).toFixed(2)}
          </p>
        </div>
        
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
          {data.description}
        </p>

        {/* 5. WIRE UP THE BUTTON */}
        <button 
          onClick={onAddToCart}
          className="w-full bg-stone-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors active:scale-95"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;