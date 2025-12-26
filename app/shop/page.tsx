import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ui/product-card";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-2">All Products</h1>
      <p className="text-stone-600 mb-8">Handcrafted jute essentials for your home.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            data={{
              ...product,
              // THE FIX: Convert Decimal to a regular Javascript Number
              price: product.price.toNumber() 
            }} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-500">No products found. Check back later!</p>
        </div>
      )}
    </div>
  );
}