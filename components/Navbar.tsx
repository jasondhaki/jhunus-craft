"use client";

import Link from "next/link";
import Image from "next/image"; 
import { Search, ShoppingCart, Menu, X, User } from "lucide-react"; 
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const cart = useCart();
  const { isSignedIn } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/95 backdrop-blur-md">
      
      {/* 1. Top Bar - Hides on tiny phones to save space, shows on larger screens */}
      <div className="bg-stone-900 text-stone-50 text-[10px] sm:text-xs py-1.5 px-4 text-center tracking-wide">
        Global Shipping Available | 100% Biodegradable Jute
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* 2. Mobile Menu Trigger (Visible only on Mobile/Tablet) */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700 hover:text-[#a37a5c] transition-colors p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* 3. Logo - Centered on Mobile, Left on Desktop */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute md:relative left-0 right-0 pointer-events-none md:pointer-events-auto">
            <Link href="/" className="pointer-events-auto">
              <Image 
                src="/brand-logo.png"       
                alt="Jhunu's Craft" 
                width={160}           
                height={45}           
                className="h-8 w-auto sm:h-10 object-contain"
                priority              
              />
            </Link>
          </div>

          {/* 4. Desktop Navigation - Hidden on Mobile, Flex on Tablet+ */}
          {/* Gaps: md:gap-6 (Tablet), lg:gap-8 (Laptop) */}
          <div className="hidden md:flex md:items-center md:gap-6 lg:gap-10">
            <Link href="/shop" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Shop
            </Link>
            <Link href="/story" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Our Story
            </Link>
            <Link href="/sustainability" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Sustainability
            </Link>
            <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Contact
            </Link>
            {/* Admin Link - kept distinct */}
            <Link href="/admin/products" className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 hover:underline underline-offset-4 transition-all">
              Admin
            </Link>
          </div>

          {/* 5. Icons Section (Cart, User, Search) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Desktop Search */}
            <button className="text-stone-500 hover:text-[#a37a5c] transition-colors hidden sm:block p-2">
              <Search className="h-5 w-5" />
            </button>
            
            {/* User Auth */}
            <div className="flex items-center">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                   <button className="p-2 text-stone-500 hover:text-[#a37a5c] transition-colors">
                      <User className="h-5 w-5" />
                   </button>
                </SignInButton>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="group flex items-center p-2 relative">
              <ShoppingCart className="h-5 w-5 text-stone-500 group-hover:text-[#a37a5c] transition-colors" />
              {cart.items.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#a37a5c] text-[10px] font-bold text-white shadow-sm">
                  {cart.items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 6. Optimized Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-4 pb-6 pt-3">
            
            {/* Mobile Search Bar (Since the icon is hidden on tiny screens) */}
            <div className="relative mb-4 mt-2">
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full bg-stone-100 border border-stone-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#a37a5c]"
               />
               <Search className="absolute right-3 top-2.5 h-4 w-4 text-stone-400" />
            </div>

            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Shop Categories
            </Link>
            <Link 
              href="/story" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Our Story
            </Link>
            <Link 
              href="/sustainability" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Sustainability
            </Link>
             <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Contact Us
            </Link>
            <div className="border-t border-stone-200 my-2 pt-2">
              <Link 
                href="/admin/products" 
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}