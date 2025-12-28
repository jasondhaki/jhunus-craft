import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Globe, Hammer } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 1. Fetch products from the database
  const products = await prisma.product.findMany({
    take: 8,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />
      
      {/* 1. FEATURED COLLECTION */}
      <div id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-stone-900">
            Featured Collection
            </h2>
            <Link href="/shop" className="text-sm font-medium text-[#a37a5c] hover:text-[#8c6b5d] transition-colors hidden sm:block">
                View all products &rarr;
            </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)}
              image={product.images[0]}
              category={product.category.name}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
            <Link href="/shop" className="text-sm font-medium text-[#a37a5c] hover:text-[#8c6b5d] transition-colors">
                View all products &rarr;
            </Link>
        </div>
      </div>

      {/* 2. The Green Trust Bar */}
      <div className="bg-[#2F4F4F] py-8">
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

      {/* 3. SHOP BY CATEGORY (Bento Grid Layout) */}
      <section className="bg-stone-100 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-serif text-stone-900">Curated Categories</h2>
              <p className="mt-4 text-stone-600">Explore our sustainable collections, designed for modern living.</p>
            </div>

            {/* THE GRID: 1 column on mobile, 6 columns on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8">
            
            {/* --- ROW 1: Two Large Items (Each takes 3/6 columns) --- */}

            {/* 1. Handbags */}
            <Link href="/shop?category=Handbags" className="md:col-span-3 group relative h-96 overflow-hidden rounded-2xl shadow-lg">
                <Image
                src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766866173/fi0irbgqczhgjqkk8stj.png" // REPLACE WITH HANDBAG IMG
                alt="Handbags"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white font-serif">Handbags</h3>
                </div>
            </Link>

            {/* 2. Home Decor */}
            <Link href="/shop?category=Home Decor" className="md:col-span-3 group relative h-96 overflow-hidden rounded-2xl shadow-lg">
                <Image
                src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766865775/dcpvjasmp3giaqwomgqr.png" // REPLACE WITH DECOR IMG
                alt="Home Decor"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white font-serif">Home Decor</h3>
                </div>
            </Link>


            {/* --- ROW 2: Three Smaller Items (Each takes 2/6 columns) --- */}

            {/* 3. Rugs */}
            <Link href="/shop?category=Rugs" className="md:col-span-2 group relative h-80 overflow-hidden rounded-2xl shadow-lg">
                <Image
                src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766832977/iooz8jrlqpuwbsm2kkpw.png" // REPLACE WITH RUG IMG
                alt="Rugs"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white font-serif">Rugs</h3>
                </div>
            </Link>

            {/* 4. Accessories */}
            <Link href="/shop?category=Accessories" className="md:col-span-2 group relative h-80 overflow-hidden rounded-2xl shadow-lg">
                <Image
                src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766865810/qs6wtixt4kr6upkpdu7u.png" // REPLACE WITH ACCESSORY IMG
                alt="Accessories"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white font-serif">Accessories</h3>
                </div>
            </Link>

            {/* 5. Kitchen */}
            <Link href="/shop?category=Kitchen" className="md:col-span-2 group relative h-80 overflow-hidden rounded-2xl shadow-lg">
                <Image
                src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766832657/brlhuvrgktpnx2btzx9o.png" // REPLACE WITH KITCHEN IMG
                alt="Kitchen"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white font-serif">Kitchen</h3>
                </div>
            </Link>

            </div>
        </div>
      </section>

      

      {/* 4. OUR STORY / MISSION SECTION */}
      <section className="relative py-24 bg-stone-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Side */}
            <div className="lg:w-1/2 z-10">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                    From the Golden Fiber <br/> to Your Home.
                </h2>
                <p className="text-stone-300 text-lg leading-relaxed mb-8">
                    Jhunu's Craft began with a simple mission: to revive the golden heritage of Bangladeshi jute. 
                    Every bag, rug, and basket is hand-woven by skilled artisans, carrying a story of tradition, 
                    sustainability, and empowerment.
                </p>
                <Link href="/story" className="inline-block bg-[#a37a5c] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8c6b5d] transition-colors">
                    Read Our Full Story
                </Link>
            </div>

            {/* Image Side */}
            <div className="lg:w-1/2 relative h-96 w-full rounded-2xl overflow-hidden border border-stone-700">
                <Image
                    src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766955250/vxvcepm4nljicgphdfjg.png" // TIP: Use a picture of an artisan working here
                    alt="Artisan weaving jute"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                />
            </div>
        </div>
      </section>
    </main>
  );
}