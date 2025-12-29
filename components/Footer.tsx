import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        
        {/* GRID UPDATE:
            - Mobile: 1 column
            - Tablet: 2 columns
            - Desktop: 5 columns (Brand, Shop, Company, Legal, Contact)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          
          {/* 1. BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">Jhunu's Craft</h2>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Handcrafted sustainable jute products from the heart of Bangladesh. 
              Quality heritage, modern design.
            </p>
            <div className="flex space-x-5 pt-2">
              <Instagram className="h-5 w-5 cursor-pointer hover:text-[#a37a5c] transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-[#a37a5c] transition-colors" />
            </div>
          </div>

          {/* 2. SHOP */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop" className="text-stone-400 hover:text-[#a37a5c] transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=Rugs" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Jute Rugs</Link></li>
              <li><Link href="/shop?category=Handbags" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Bags & Totes</Link></li>
              <li><Link href="/shop?category=Home Decor" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Home Decor</Link></li>
            </ul>
          </div>

          {/* 3. COMPANY (Growth & Info) */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/story" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Our Story</Link></li>
              <li><Link href="/sustainability" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Ethical Sourcing</Link></li>
              <li>
                <Link href="/wholesale" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                  Wholesale & Export
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. LEGAL (The Policies - New Separate Column) */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/policies" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Returns & Shipping</Link></li>
              <li><Link href="/privacy" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-stone-400 hover:text-[#a37a5c] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* 5. CONTACT */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-stone-400">
                <Mail className="h-5 w-5 shrink-0 text-stone-500" /> 
                <span className="hover:text-white transition-colors">info@jhunuscraft.com</span>
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
        <div className="mt-16 border-t border-stone-800 pt-8 text-center text-xs text-stone-500 flex flex-col sm:flex-row justify-center items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Jhunu's Craft. All rights reserved.</p>
          <div className="flex gap-4">
             {/* Optional: Credit cards or payment icons could go here later */}
             {/**<span>Secured by Stripe</span>*/}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;