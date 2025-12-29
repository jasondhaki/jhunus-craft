import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          
          {/* 1. BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">Jhunu's Craft</h2>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Handcrafted sustainable jute products from the heart of Bangladesh. 
              Quality heritage, modern design.
            </p>
            
            {/* SOCIAL ICONS */}
            <div className="flex space-x-5 pt-2 items-center">
              
              {/* Instagram */}
              <a href="#" className="hover:text-[#a37a5c] transition-colors hover:scale-110 transform duration-200" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              
              {/* Facebook */}
              <a href="#" className="hover:text-[#a37a5c] transition-colors hover:scale-110 transform duration-200" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>

              {/* X (formerly Twitter) - Custom SVG */}
              <a href="#" className="hover:text-[#a37a5c] transition-colors hover:scale-110 transform duration-200" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"> {/* X logo is usually slightly smaller visually, so h-4 looks balanced with h-5 icons */}
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>

              {/* WhatsApp - Custom SVG */}
              <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer" className="hover:text-[#a37a5c] transition-colors hover:scale-110 transform duration-200" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.231-.298.347-.497.116-.198.058-.372-.029-.545-.087-.174-.787-1.987-1.078-2.722-.283-.717-.57-.619-.785-.63-.198-.01-.425-.012-.651-.012-.227 0-.594.085-.905.425-.311.34-1.192 1.164-1.192 2.84 0 1.676 1.22 3.294 1.39 3.518.17.224 2.402 3.67 5.82 5.143 2.81 1.213 3.385.972 3.996.912.611-.06 1.758-.718 2.006-1.411.248-.694.248-1.289.174-1.412-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              
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

          {/* 3. COMPANY */}
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

          {/* 4. LEGAL */}
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
        <div className="mt-16 border-t border-stone-800 pt-8 flex flex-col items-center justify-center gap-3 text-center text-xs text-stone-500">
          
          <p>&copy; {new Date().getFullYear()} Jhunu's Craft. All rights reserved.</p>
          
          <div className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity">
            <span>Handcrafted with</span>
            <span className="text-red-500">♥</span>
            <span>in Bangladesh</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;