import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard"; 
import Link from "next/link";
import { X, Search, Filter } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ShopPage(props: Props) {
  const searchParams = await props.searchParams;
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where: any = {};
  if (category) where.category = { name: category };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where: where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = ["Handbags", "Home Decor", "Rugs", "Accessories", "Kitchen"];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDEBAR (Unchanged) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Search</h3>
                <form action="/shop" className="relative">
                  <input 
                    name="search"
                    defaultValue={search}
                    placeholder="Search..." 
                    className="w-full bg-white border border-stone-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#a37a5c]"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                </form>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-1">
                  <Link 
                    href="/shop"
                    className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                      !category 
                        ? "bg-stone-900 text-white font-medium" 
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat}`}
                      className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                        category === cat
                          ? "bg-[#a37a5c] text-white font-medium"
                          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
                 <h4 className="font-serif font-bold text-stone-800 text-sm">Need Custom Orders?</h4>
                 <p className="text-xs text-stone-600 mt-1 mb-2">We accept bulk orders for wholesale.</p>
                 <Link href="/wholesale" className="text-xs font-bold text-[#a37a5c] hover:underline">Contact Sales &rarr;</Link>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            
            {/* Mobile Filters (Unchanged) */}
            <div className="lg:hidden mb-6">
               <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <Link
                    href="/shop"
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${
                      !category ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-600"
                    }`}
                  >
                    All
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat}`}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap ${
                        category === cat ? "bg-[#a37a5c] text-white" : "bg-white border border-stone-200 text-stone-600"
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
               </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-stone-900">
                  {category ? category : search ? `Search: "${search}"` : "All Products"}
                </h1>
                <p className="text-stone-500 text-xs mt-1">
                  Showing {products.length} results
                </p>
              </div>
              
              {(category || search) && (
                <Link 
                  href="/shop"
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center bg-white px-3 py-1.5 rounded-md border border-stone-200 shadow-sm"
                >
                  <X className="w-3 h-3 mr-1" /> Clear
                </Link>
              )}
            </div>

            {/* THE FIX: Tighter Grid Settings */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={Number(product.price)}
                  image={product.images[0]}
                  category={product.category?.name || "Uncategorized"}
                />
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-stone-300">
                <Filter className="mx-auto h-10 w-10 text-stone-300 mb-3" />
                <h3 className="text-lg font-bold text-stone-900">No products found</h3>
                <p className="text-stone-500 text-sm mt-1">Try changing your category or search terms.</p>
                <Link href="/shop" className="mt-4 inline-block text-sm font-bold text-[#a37a5c] hover:underline">
                  Clear all filters
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}