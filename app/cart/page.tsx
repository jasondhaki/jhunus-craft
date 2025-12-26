"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Trash, Loader2, CreditCard, Banknote } from "lucide-react";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios"; 

function CartLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
    </div>
  );
}

function CartContent() {
  const cart = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState("cod"); 
  
  // 1. ADDED: Form State for the database
  const [formData, setFormData] = useState({
    address: "",
    phone: ""
  });

  useEffect(() => {
    setIsMounted(true);
    if (searchParams.get("success")) {
      toast.success("Payment completed!");
      cart.removeAll();
    }
  }, [searchParams, cart]);

  if (!isMounted) return <CartLoader />;

  const total = cart.items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    // 2. ADDED: Validation
    if (paymentMethod === "cod" && (!formData.address || !formData.phone)) {
      toast.error("Please provide address and phone number.");
      return;
    }

    setIsLoading(true);

    try {
      if (paymentMethod === "cod") {
        // 3. FIXED: Actually calling your API instead of a timeout
        await axios.post('/api/orders', {
          productIds: cart.items.map((item) => item.id),
          address: formData.address,
          phone: formData.phone
        });

        cart.removeAll();
        toast.success("Order Placed! Check Admin Panel.");
        router.push("/admin/orders"); // Redirect to see the result
      } else {
        // Stripe Logic
        const response = await axios.post('/api/checkout', {
          productIds: cart.items.map((item) => item.id)
        });
        window.location = response.data.url;
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Shopping Cart</h1>
        
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <div className="text-center py-20 bg-stone-50 rounded-lg">
                <p className="text-stone-500 text-lg">Your cart is empty.</p>
                <Link href="/shop" className="underline font-medium">Continue Shopping</Link>
              </div>
            )}

            <ul className="divide-y divide-stone-200">
              {cart.items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                    <Image
                      src={item.image || (item as any).images?.[0] || '/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-stone-500">{(item as any).category?.name || "Item"}</p>
                        <p className="mt-1 text-sm font-bold">${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => cart.removeItem(item.id)} className="text-stone-400 hover:text-red-500">
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-stone-50 p-6 lg:col-span-5 lg:mt-0">
            <h2 className="text-lg font-medium text-stone-900">Order Summary</h2>
            
            {/* 4. ADDED: Input Fields for COD */}
            {paymentMethod === "cod" && (
                <div className="mt-6 space-y-4 border-b border-stone-200 pb-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-500">Phone</label>
                        <input 
                            type="text" 
                            className="mt-1 w-full rounded-md border border-stone-300 p-2 text-sm"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-500">Address</label>
                        <textarea 
                            className="mt-1 w-full rounded-md border border-stone-300 p-2 text-sm"
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                    </div>
                </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
              <div className="text-base font-medium text-stone-900">Order total</div>
              <div className="text-base font-bold text-stone-900">${total.toFixed(2)}</div>
            </div>

            <div className="mt-6 space-y-3">
               <div onClick={() => setPaymentMethod("stripe")} className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === "stripe" ? "border-stone-900 bg-stone-100" : "border-stone-200"}`}>
                  <CreditCard className="h-5 w-5 mr-3"/>
                  <span className="text-sm">Online Payment</span>
               </div>
               <div onClick={() => setPaymentMethod("cod")} className={`flex items-center p-3 border rounded-md cursor-pointer ${paymentMethod === "cod" ? "border-stone-900 bg-stone-100" : "border-stone-200"}`}>
                  <Banknote className="h-5 w-5 mr-3"/>
                  <span className="text-sm">Cash on Delivery</span>
               </div>
            </div>

            <div className="mt-6">
              <button
                onClick={onCheckout}
                disabled={cart.items.length === 0 || isLoading}
                className="w-full flex items-center justify-center rounded-md bg-stone-900 px-6 py-3 text-white hover:bg-stone-700 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (paymentMethod === "cod" ? "Place Order (COD)" : "Proceed to Payment")}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartLoader />}>
      <CartContent />
    </Suspense>
  );
}