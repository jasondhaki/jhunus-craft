"use client";

import Link from "next/link";
import Image from "next/image"; 
import { Search, ShoppingCart, Menu, X } from "lucide-react"; // Added 'X' for close icon
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const cart = useCart();
  const { isSignedIn } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <--- New State for Mobile Menu

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/95 backdrop-blur-md">
      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-50 text-xs py-1 px-4 text-center hidden md:block">
        Global Shipping Available | 100% Biodegradable Jute
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Mobile Menu Button (Toggle) */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700 hover:text-stone-900 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
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

          {/* Desktop Navigation (Hidden on Mobile) */}
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
            <Link href="/contact" className="text-sm font-medium text-stone-700 hover:text-[#a37a5c] transition-colors">
              Contact Us
            </Link>
            <Link href="/admin/products" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
              Admin Panel
            </Link>
          </div>

          {/* Icons (Cart, User, Search) */}
          <div className="flex items-center space-x-4">
            <button className="text-stone-500 hover:text-stone-900 hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="text-stone-500 hover:text-stone-900 cursor-pointer">
                 <SignInButton mode="modal">
                    <span className="text-sm font-medium">Sign In</span>
                 </SignInButton>
              </div>
            )}

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

      {/* MOBILE MENU DROPDOWN (New) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-200"
            >
              Shop Categories
            </Link>
            <Link 
              href="/story" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-200"
            >
              Our Story
            </Link>
            <Link 
              href="/sustainability" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 hover:bg-stone-200"
            >
              Sustainability
            </Link>
            <Link 
              href="/admin/products" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-bold text-red-600 hover:bg-stone-200"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}