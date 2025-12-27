"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    // secure_url ensures the image is served over HTTPS
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border border-stone-200 shadow-sm">
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition shadow-md"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
            <Image 
              fill 
              className="object-cover transition-transform hover:scale-105 duration-300" 
              alt="Product preview" 
              src={url} 
            />
          </div>
        ))}
      </div>
      
      <CldUploadWidget 
        onSuccess={onUpload} // For newer versions
        onUpload={onUpload}  // Fallback for older versions
        uploadPreset="jhunus_craft" 
        options={{
          maxFiles: 5,
          clientAllowedFormats: ["webp", "png", "jpg", "jpeg"],
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <button
              type="button"
              disabled={disabled}
              onClick={onClick}
              className="flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-3 rounded-lg border-2 border-dashed border-stone-300 hover:border-stone-900 hover:text-stone-900 transition-all disabled:opacity-50"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="text-sm font-semibold">Add Product Images</span>
            </button>
          );
        }}
      </CldUploadWidget>
      <p className="mt-2 text-[10px] text-stone-400 uppercase font-bold tracking-widest">
        Recommended: Square WebP or JPG (1000x1000px)
      </p>
    </div>
  );
};

export default ImageUpload;