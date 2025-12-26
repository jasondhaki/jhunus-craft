"use client";

import Link from "next/link";
import Image from "next/image"; 
import { Search, ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs"; // <--- Import Clerk tools

export default function Navbar() {
  const cart = useCart();
  const { isSignedIn } = useUser(); // <--- Check if user is logged in
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/95 backdrop-blur-md">
      <div className="bg-stone-900 text-stone-50 text-xs py-1 px-4 text-center hidden md:block">
        Global Shipping Available | 100% Biodegradable Jute
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex md:hidden">
            <button className="text-stone-700 hover:text-stone-900">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image 
                src="/brand-logo.png"       
                alt="Jhunu's Craft" 
                width={180}           
                height={50}           
                className="h-10 w-auto object-contain"
                priority              
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/shop" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              Shop Categories
            </Link>
            <Link href="/story" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              Our Story
            </Link>
            <Link href="/sustainability" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
              Sustainability
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-stone-500 hover:text-stone-900 hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            
            {/* CLERK LOGIC START */}
            {isSignedIn ? (
              // If logged in, show the User Profile Circle
              <UserButton afterSignOutUrl="/" />
            ) : (
              // If logged out, show a clean Sign In button
              <div className="text-stone-500 hover:text-stone-900 cursor-pointer">
                 <SignInButton mode="modal">
                    <span className="text-sm font-medium">Sign In</span>
                 </SignInButton>
              </div>
            )}
            {/* CLERK LOGIC END */}

            <Link href="/cart" className="group -m-2 flex items-center p-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-stone-500 group-hover:text-stone-900" />
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                    {cart.items.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}