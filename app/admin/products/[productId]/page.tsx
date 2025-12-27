"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import axios from "axios";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); 
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "", // This needs to stay a string URL
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${params.productId}`);
        const product = response.data;
        
        // FIX: Extract the .url from the image object
        const imageUrl = product.images?.[0]?.url || product.images?.[0] || "";
        
        setFormData({
            name: product.name,
            price: product.price.toString(), // Ensure price is a string for the input
            description: product.description,
            image: imageUrl, 
            category: product.category?.name || "",
        });
      } catch (error) {
        toast.error("Could not load product.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error("Please upload a product image.");
      return;
    }

    try {
      setIsLoading(true);
      // We send the data. Note: your API might expect an 'images' array 
      // rather than a single 'image' string depending on your route setup.
      await axios.patch(`/api/products/${params.productId}`, {
        ...formData,
        price: parseFloat(formData.price) // Convert back to number for DB
      });
      
      toast.success("Product updated!");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong during update.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2">
        <Loader2 className="animate-spin h-10 w-10 text-stone-500" />
        <p className="text-stone-500 text-sm">Loading product data...</p>
      </div>
     );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/products" className="p-2 rounded-full hover:bg-stone-200 transition-colors">
          <ArrowLeft className="h-6 w-6 text-stone-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Edit Product</h1>
          <p className="text-sm text-stone-500">Update your handcrafted jute details</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white border border-stone-200 rounded-xl shadow-sm p-8 space-y-8">
        
        {/* IMAGE UPLOAD SECTION */}
        <div className="space-y-2">
           <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider">
             Product Visual
           </label>
           <ImageUpload 
             value={formData.image ? [formData.image] : []} 
             disabled={isLoading}
             onChange={(url) => setFormData({ ...formData, image: url })}
             onRemove={() => setFormData({ ...formData, image: "" })}
           />
           <p className="text-[10px] text-stone-400">This image will appear in the shop and cart.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Product Name</label>
            <input
              required
              type="text"
              placeholder="e.g. The Bengal Tote"
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:ring-2 focus:ring-stone-900 outline-none transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Category</label>
            <select
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:ring-2 focus:ring-stone-900 outline-none transition bg-white"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="" disabled>Select a Category</option>
              <option value="Handbags">Handbags</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Rugs">Rugs</option>
              <option value="Accessories">Accessories</option>
              <option value="Kitchen">Kitchen</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-stone-400">$</span>
            <input
              required
              type="number"
              step="0.01"
              className="w-full rounded-md border border-stone-300 pl-7 pr-3 py-2 text-stone-900 focus:ring-2 focus:ring-stone-900 outline-none transition"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Product Story / Description</label>
          <textarea
            required
            rows={5}
            placeholder="Describe the weave, materials, and artisan story..."
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:ring-2 focus:ring-stone-900 outline-none transition"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-stone-900 text-white py-4 rounded-lg hover:bg-stone-800 transition-all shadow-md disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}