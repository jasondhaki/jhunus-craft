"use client";

import Link from "next/link";
import Image from "next/image"; 
import { ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react"; 
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import SearchBar from "@/components/SearchBar"; 

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
      
      {/* 1. Top Bar */}
      <div className="bg-stone-900 text-stone-50 text-[10px] sm:text-xs py-1.5 px-4 text-center tracking-wide">
        Global Shipping Available | 100% Biodegradable Jute
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* 2. Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700 hover:text-[#a37a5c] transition-colors p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* 3. Logo */}
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

          {/* 4. Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
            {/* NEW HOME LINK */}
            <Link href="/" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Home
            </Link>

            <Link href="/shop" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Shop
            </Link>

            {/* DROPDOWN: ABOUT */}
            <div className="relative group h-16 flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-stone-600 group-hover:text-[#a37a5c] transition-colors focus:outline-none">
                About
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white rounded-lg shadow-xl border border-stone-100 overflow-hidden py-1">
                  <Link 
                    href="/story" 
                    className="block px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 hover:text-[#a37a5c] transition-colors"
                  >
                    Our Story
                  </Link>
                  <Link 
                    href="/sustainability" 
                    className="block px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 hover:text-[#a37a5c] transition-colors border-t border-stone-50"
                  >
                    Sustainability
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/payment-terms" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Wholesale
            </Link>
            <Link href="/contact" className="text-sm font-medium text-stone-600 hover:text-[#a37a5c] transition-colors">
              Contact Us
            </Link>
          </div>

          {/* 5. Right Section: Search, User, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            <div className="hidden sm:block">
               <SearchBar isMobile={false} />
            </div>
            
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

      {/* 6. Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 px-4 pb-6 pt-3">
            
            <div className="mb-4 mt-2">
               <SearchBar isMobile={true} />
            </div>

            {/* NEW MOBILE HOME LINK */}
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Home
            </Link>

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
              href="/payment-terms" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Wholesale Info
            </Link>
             <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-stone-700 hover:bg-stone-200 hover:text-[#a37a5c] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}