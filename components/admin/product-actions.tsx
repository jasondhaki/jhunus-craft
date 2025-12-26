"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Pencil, Trash, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductActionsProps {
  id: string;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  id
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      // Calls the API route we created in Step 1
      await axios.delete(`/api/products/${id}`);
      
      toast.success("Product deleted.");
      router.refresh(); // Refreshes the list instantly
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end">
      {/* EDIT BUTTON (Navigates to the edit page) */}
      <Link href={`/admin/products/${id}`}>
        <button className="text-stone-400 hover:text-stone-600 mx-2 p-1">
          <Pencil className="h-4 w-4" />
        </button>
      </Link>

      {/* DELETE BUTTON (Triggers the API) */}
      <button 
        onClick={onDelete} 
        disabled={isLoading}
        className="text-stone-400 hover:text-red-600 mx-2 p-1 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};