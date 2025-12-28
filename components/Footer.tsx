import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Container: max-w-7xl ensures it doesn't stretch too wide on huge iMacs */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        
        {/* THE RESPONSIVE MAGIC:
            1. Default (Mobile): grid-cols-1 (Everything stacks in 1 nice column)
            2. sm (Large Phones/Tablets): grid-cols-2 (2 rows of 2 columns)
            3. lg (Laptops/PCs): grid-cols-4 (All 4 sections in one row) 
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          
          {/* 1. BRAND (Takes up full width on tiny phones, 1 slot on others) */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">Jhunu's Craft</h2>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Handcrafted sustainable jute products from the heart of Bangladesh. 
              Quality heritage, modern design.
            </p>
            <div className="flex space-x-5 pt-2">
              <Instagram className="h-5 w-5 cursor-pointer hover:text-white transition-transform hover:scale-110" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-white transition-transform hover:scale-110" />
            </div>
          </div>

          {/* 2. SHOP */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=rugs" className="hover:text-white transition-colors">Jute Rugs</Link></li>
              <li><Link href="/shop?category=bags" className="hover:text-white transition-colors">Bags & Totes</Link></li>
            </ul>
          </div>

          {/* 3. BUSINESS */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Business</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/wholesale" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                  Wholesale & Export
                </Link>
              </li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Panel</Link></li>
              <li><Link href="/policies" className="hover:text-white transition-colors">Returns & Shipping</Link></li>
            </ul>
          </div>

          {/* 4. CONTACT */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-stone-400">
                <Mail className="h-5 w-5 shrink-0 text-stone-500" /> 
                <span>info@jhunuscraft.com</span>
              </li>
              <li className="flex items-start gap-3 text-stone-400">
                <Phone className="h-5 w-5 shrink-0 text-stone-500" /> 
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-start gap-3 text-stone-400">
                <MapPin className="h-5 w-5 shrink-0 text-stone-500" /> 
                <span>Monipuripara, Dhaka</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Copyright Bar */}
        <div className="mt-16 border-t border-stone-800 pt-8 text-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Jhunu's Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;