import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white">
      {/* Image Section */}
      <div className="aspect-[4/5] bg-stone-100 sm:aspect-[3/4] relative overflow-hidden">
        {/* We use a placeholder if the image URL is invalid, otherwise Next.js might error */}
        <Image
          src={image.startsWith('http') ? image : '/placeholder.jpg'} 
          alt={name}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-stone-900">
          <Link href={`/product/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        <p className="text-sm text-stone-500">{category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-medium text-stone-900">${price.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Hover Button */}
      <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <button className="flex items-center justify-center rounded-full bg-stone-900 p-2 text-white shadow-md hover:bg-stone-700">
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}