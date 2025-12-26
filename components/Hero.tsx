import Link from "next/link";
import { Leaf, Globe, Hammer } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-stone-50">
      {/* 1. Main Hero Section */}
      <div className="relative isolate overflow-hidden pt-14">
        
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000&auto=format&fit=crop"
          alt="Jute interior"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
        />
        
        {/* Dark Overlay (Essential for text readability) */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-900/60 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl drop-shadow-md">
              Handcrafted Jute. <br />
              Globally Loved. <br />
              Earth Friendly.
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-100 drop-shadow-sm">
              The golden fiber of Bangladesh, woven into timeless elegance. 
              Sustainable luxury for your home and lifestyle.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/shop"
                className="rounded-md bg-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-all"
              >
                Shop the New Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. The Green Trust Bar */}
      <div className="bg-[#8B9D83] py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-10 text-center">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-white/20 p-3">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <p className="text-base font-medium text-white">Ethically Sourced Materials</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-white/20 p-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <p className="text-base font-medium text-white">Secure International Shipping</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-white/20 p-3">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <p className="text-base font-medium text-white">Artisan Made Quality</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}