"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
// This imports the image upload component you created
import ImageUpload from "@/components/ui/image-upload";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "", 
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // NOTE: Make sure your API route is actually at /api/products
      await axios.post("/api/products", formData);
      toast.success("Product created!");
      router.push("/admin/products"); 
      router.refresh(); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/products" className="p-2 rounded-full hover:bg-stone-200 transition-colors">
          <ArrowLeft className="h-6 w-6 text-stone-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Add New Product</h1>
          <p className="text-sm text-stone-500">Add a new item to your store</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white border border-stone-200 rounded-lg p-8 space-y-6">
        
        {/* IMAGE UPLOAD BUTTON */}
        <div>
           <label className="block text-sm font-medium text-stone-700 mb-2">Product Image</label>
           <ImageUpload 
             value={formData.image ? [formData.image] : []} 
             disabled={isLoading}
             onChange={(url) => setFormData({ ...formData, image: url })}
             onRemove={() => setFormData({ ...formData, image: "" })}
           />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-stone-700">Product Name</label>
          <input
            required
            type="text"
            placeholder="e.g. The Bengal Tote"
            className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-700">Category</label>
          <select
            required
            className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500 bg-white"
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

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-stone-700">Price (USD)</label>
          <input
            required
            type="number"
            step="0.01"
            placeholder="0.00"
            className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-stone-700">Description</label>
          <textarea
            required
            rows={4}
            placeholder="Describe the product..."
            className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-stone-900 text-white py-3 rounded-md hover:bg-stone-800 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Product
            </>
          )}
        </button>

      </form>
    </div>
  );
}