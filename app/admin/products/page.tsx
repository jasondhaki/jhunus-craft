import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
// Import the component we just made
import { ProductActions } from "@/components/admin/product-actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Products</h1>
          <p className="text-stone-600 mt-2">Manage your inventory ({products.length})</p>
        </div>
        
        <Link 
          href="/admin/products/new" 
          className="bg-stone-900 text-white px-4 py-2 rounded-md flex items-center hover:bg-stone-800 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Category</th> 
              <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-10 relative rounded overflow-hidden border border-stone-200">
                    <Image 
                      src={product.images[0] || '/placeholder.jpg'} 
                      alt={product.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                  {product.category?.name || "Uncategorized"} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">
                  ${Number(product.price).toFixed(2)}
                </td>
                
                {/* HERE IS THE CHANGE: We used the new component */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ProductActions id={product.id} />
                </td>
              </tr>
            ))}
            
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                  No products found. Click "Add Product" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}