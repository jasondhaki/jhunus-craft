"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart"; // Ensure this path is correct
import toast from "react-hot-toast";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
  const cart = useCart();

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. STOP the click from triggering the Link wrapper
    e.stopPropagation();
    e.preventDefault();

    // 2. Add to cart using the data passed as props
    cart.addItem({ id, name, price, image, category });
    
    // 3. User feedback
    toast.success(`${name} added to cart!`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      {/* Image Section */}
      <div className="aspect-[4/5] bg-stone-100 sm:aspect-[3/4] relative overflow-hidden">
        <Image
          src={image.startsWith('http') ? image : '/placeholder.jpg'} 
          alt={name}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-stone-900">
          <Link href={`/product/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        <p className="text-sm text-stone-500">{category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-stone-900">${Number(price).toFixed(2)}</p>
        </div>
      </div>
      
      {/* Hover Button - Now Functional */}
      <div className="absolute bottom-4 right-4 z-20">
        <button 
          onClick={onAddToCart}
          className="flex items-center justify-center rounded-full bg-stone-900 p-2.5 text-white shadow-lg hover:bg-stone-700 transition-all hover:scale-110 active:scale-95 sm:opacity-0 group-hover:opacity-100"
        >
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}