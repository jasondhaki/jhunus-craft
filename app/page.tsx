import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma"; // <--- Importing the bridge

export const dynamic = "force-dynamic"; // Ensures we always get fresh data

export default async function Home() {
  // 1. Fetch products from the database
  const products = await prisma.product.findMany({
    take: 8, // Limit to 8 items for homepage
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />
      
      {/* Product Grid Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-serif font-bold tracking-tight text-stone-900 mb-6">
          Featured Collection
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number(product.price)} // Converting Decimal to Number
              image={product.images[0]}
              category={product.category.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
}