import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ListOrdered, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  // THE BOUNCER: Replace this with your actual email (and your dad's later)
  const adminEmails = ["jasondhaki05@gmail.com", "yourdadsemail@gmail.com"];

  if (!user || !email || !adminEmails.includes(email)) {
    redirect("/"); // Kick them out to the homepage
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold text-white">Admin Panel</h2>
        </div>
        <nav className="space-y-1 px-3">
          <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium hover:bg-stone-800 rounded-md">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Overview
          </Link>
          <Link href="/admin/products" className="flex items-center px-3 py-2 text-sm font-medium hover:bg-stone-800 rounded-md">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center px-3 py-2 text-sm font-medium hover:bg-stone-800 rounded-md">
            <ListOrdered className="h-5 w-5 mr-3" />
            Orders
          </Link>
          <Link href="/" className="flex items-center px-3 py-2 text-sm font-medium text-stone-500 hover:text-stone-300 mt-10">
            <ArrowLeft className="h-5 w-5 mr-3" />
            Back to Store
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}