"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // useParams lets us read the ID from the URL
import axios from "axios";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // Get the productId from the URL
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  // 1. Fetch the existing data when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${params.productId}`);
        const product = response.data;
        
        // Pre-fill the form
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.images[0] || "",
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

  // 2. Handle Update (PATCH)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.patch(`/api/products/${params.productId}`, formData);
      toast.success("Product updated!");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
     return <div className="flex justify-center mt-10"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/products" className="p-2 rounded-full hover:bg-stone-200 transition-colors">
          <ArrowLeft className="h-6 w-6 text-stone-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Edit Product</h1>
          <p className="text-sm text-stone-500">Update product details</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white border border-stone-200 rounded-lg p-8 space-y-6">
        
        {/* IMAGE UPLOAD */}
        <div>
           <label className="block text-sm font-medium text-stone-700 mb-2">Product Image</label>
           <ImageUpload 
             value={formData.image ? [formData.image] : []} 
             disabled={isLoading}
             onChange={(url) => setFormData({ ...formData, image: url })}
             onRemove={() => setFormData({ ...formData, image: "" })}
           />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-stone-700">Product Name</label>
          <input
            required
            type="text"
            className="mt-1 block w-full rounded-md border border-stone-300 px-3 py-2 text-stone-900 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Category */}
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
              Update Product
            </>
          )}
        </button>

      </form>
    </div>
  );
}