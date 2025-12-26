"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Trash, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import axios from "axios"; 

export default function CartPage() {
  const cart = useCart();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (searchParams.get("success")) {
      toast.success("Payment completed! Thank you for your order.");
      cart.removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Order canceled.");
    }
  }, [searchParams, cart.removeAll]);

  if (!isMounted) return null;

  const total = cart.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onRemove = (id: string) => {
    cart.removeItem(id);
    toast.error("Item removed.");
  };

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      // This connects to the API route we made
      const response = await axios.post('/api/checkout', {
        productIds: cart.items.map((item) => item.id)
      });
      
      // This jumps to the Stripe Payment Page
      window.location = response.data.url;
    } catch (error) {
      console.error(error); // Log error to console to see what happened
      toast.error("Something went wrong with checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Shopping Cart</h1>
        
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <div className="text-center py-20 bg-stone-50 rounded-lg">
                <p className="text-stone-500 text-lg">Your cart is currently empty.</p>
                <Link href="/shop" className="mt-4 inline-block text-sm font-medium text-stone-900 underline underline-offset-4">
                  Continue Shopping
                </Link>
              </div>
            )}

            <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
              {cart.items.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 border border-stone-200">
                      <Image
                        src={item.image.startsWith('http') ? item.image : '/placeholder.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link href={`/product/${item.id}`} className="font-medium text-stone-700 hover:text-stone-900">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-stone-500">{item.category}</p>
                        <p className="mt-1 text-sm font-medium text-stone-900">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="absolute right-0 top-0 text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-stone-900">Order summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                <div className="text-base font-medium text-stone-900">Order total</div>
                <div className="text-base font-medium text-stone-900">${total.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onCheckout}
                disabled={cart.items.length === 0 || isLoading}
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-stone-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Checkout"}
              </button>
            </div>
            
            <div className="mt-6 text-center text-xs text-stone-500">
              <p>Secure Checkout powered by Stripe</p>
              <p className="mt-1">Free shipping on international orders over $500</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}