import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">Jhunu's Craft</h2>
            <p className="text-sm leading-6 max-w-xs">
              Handcrafted sustainable jute products from the heart of Bangladesh. 
              Quality heritage, modern design.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Shop</h3>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
                  <li><Link href="/shop?category=rugs" className="hover:text-white">Jute Rugs</Link></li>
                  <li><Link href="/shop?category=bags" className="hover:text-white">Bags & Totes</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Business</h3>
                <ul className="mt-6 space-y-4 text-sm">
                  {/* 👇 THE CRITICAL LINK 👇 */}
                  <li>
                    <Link href="/wholesale" className="text-emerald-400 font-bold hover:text-emerald-300">
                      Wholesale & Export
                    </Link>
                  </li>
                  <li><Link href="/admin" className="hover:text-white">Admin Panel</Link></li>
                  <li>
                    <Link href="/policies" className="hover:text-white transition-colors">
                      Returns & Shipping
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4" /> info@jhunuscraft.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4" /> +880 17...
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-stone-500" /> Monipuripara, Dhaka
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-stone-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Jhunu's Craft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;