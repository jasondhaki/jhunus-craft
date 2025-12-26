"use client";

import { useCart, CartItem } from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import toast from "react-hot-toast"; // <--- Import the toast tool

interface AddToCartProps {
  data: CartItem;
}

export default function AddToCart({ data }: AddToCartProps) {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    
    // Add to state
    cart.addItem(data);
    
    // Fire the modern popup
    toast.success(`${data.name} added to cart!`, {
      style: {
        background: '#333', // Dark background (Stone-900 look)
        color: '#fff',      // White text
      },
      iconTheme: {
        primary: '#4ade80', // Bright green checkmark
        secondary: '#fff',
      },
      duration: 2000, // Disappears in 2 seconds
    });
  };

  return (
    <button
      onClick={onAddToCart}
      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-stone-900 px-8 py-3 text-base font-medium text-white hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 sm:w-full transition-colors"
    >
      Add to Cart
    </button>
  );
}