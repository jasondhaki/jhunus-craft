"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { getSearchSuggestions } from "@/actions/get-search-suggestions";
import Link from "next/link";

export default function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 1. Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. The "Live Search" Logic (Debounced)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const results = await getSearchSuggestions(query);
        setSuggestions(results);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300); // Wait 300ms after typing stops

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // 3. Handle "Enter" Key (Go to full search results)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsOpen(false);
    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${isMobile ? "w-full" : "w-64 lg:w-80"}`}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className={`w-full rounded-full border border-stone-200 bg-stone-100 py-2 pl-10 pr-4 text-sm outline-none focus:border-[#a37a5c] focus:ring-1 focus:ring-[#a37a5c] transition-all ${
            isMobile ? "bg-white" : ""
          }`}
        />
        <div className="absolute left-3 top-2.5 text-stone-400">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </div>
      </form>

      {/* 4. The Magic Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-stone-100 bg-white py-2 shadow-xl z-50">
          <div className="px-3 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Suggestions
          </div>
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={`/shop/${item.id}`} // Clicking a suggestion goes straight to the product
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-stone-900">{item.name}</span>
                <span className="text-xs text-stone-500">in {item.category.name}</span>
              </div>
            </Link>
          ))}
          {/* Option to view all results */}
          <button
            onClick={handleSearch}
            className="w-full border-t border-stone-100 px-4 py-2 text-left text-xs font-bold text-[#a37a5c] hover:bg-stone-50"
          >
            View all results for "{query}"
          </button>
        </div>
      )}
    </div>
  );
}