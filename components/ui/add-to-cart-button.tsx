"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart"; // Using your existing hook
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  data: any; // We'll pass the full product object here
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data); // This adds it to your global state
    toast.success("Added to cart!");
  };

  return (
    <button 
      onClick={onAddToCart}
      className="w-full md:w-auto px-8 py-4 bg-stone-900 text-white rounded-full flex items-center justify-center gap-3 hover:bg-stone-800 transition-all hover:scale-105 active:scale-95"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="font-bold">Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;