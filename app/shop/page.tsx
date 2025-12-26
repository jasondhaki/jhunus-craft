import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

// Always fetch fresh data so new products appear instantly
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  // 1. Fetch ALL products from the database
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }, // Newest items first
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">
            All Collections
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-stone-500">
            Explore our complete range of handcrafted jute products. 
            From the Sundarbans to your living room.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
      </div>
    </div>
  );
}