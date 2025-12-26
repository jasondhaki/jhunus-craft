import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/ui/add-to-cart-button";

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: { productId: string } 
}) {
  // 1. Fetch the single product
  const { productId } = await params; // Await params for Next.js 15+
  
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true }
  });

  // 2. Safety check: If product doesn't exist, show 404
  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/shop" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT: Image */}
        <div className="aspect-square relative bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
          <Image 
            src={product.images[0] || '/placeholder.jpg'} 
            alt={product.name} 
            fill 
            className="object-cover"
            priority // Loads this image instantly since it's the main star
          />
        </div>

        {/* RIGHT: Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-stone-900 mb-2">{product.name}</h1>
            <p className="text-xl font-medium text-stone-500">
              {product.category?.name || "Handcrafted"}
            </p>
          </div>

          <div className="text-3xl font-bold text-stone-900 mb-8">
            ${Number(product.price).toFixed(2)}
          </div>

          <div className="prose prose-stone mb-10 text-stone-600 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* THE NEW LIVE BUTTON */}
          <AddToCartButton 
            data={{
              ...product,
              price: Number(product.price), // Convert Decimal to Number for the cart
              image: product.images[0]
            }} 
          />
          
          <p className="mt-6 text-xs text-stone-400 text-center md:text-left">
            Free shipping on all orders over $100
          </p>
        </div>
      </div>
    </div>
  );
}