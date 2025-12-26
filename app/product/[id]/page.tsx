import AddToCart from "@/components/AddToCart";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Shield, Truck } from "lucide-react";

// This is a Dynamic Page that changes based on the ID in the URL
export default async function ProductPage({ params }: { params: { id: string } }) {
  // 1. Get the ID from the URL (Fix for Next.js 15+ async params)
  const { id } = await params;

  // 2. Fetch the specific product from the database
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  // 3. If product doesn't exist, show 404
  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          
          {/* Left: Image Gallery */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
            <Image
              src={product.images[0].startsWith('http') ? product.images[0] : '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right: Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-900">
              {product.name}
            </h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-stone-900">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-6 flex items-center space-x-3">
              <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-0.5 text-sm font-medium text-stone-800">
                {product.category.name}
              </span>
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-0.5 text-sm font-medium text-green-700">
                In Stock
              </span>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 border-t border-stone-200 pt-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-stone-400" />
                  <span className="text-sm text-stone-500">Fast Global Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-stone-400" />
                  <span className="text-sm text-stone-500">Artisan Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-stone-400" />
                  <span className="text-sm text-stone-500">100% Biodegradable</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-10 flex">
              <AddToCart 
                data={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  image: product.images[0],
                  category: product.category.name
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}