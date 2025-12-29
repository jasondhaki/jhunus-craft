"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2, Send, CheckCircle, Leaf, Globe, PenTool, ArrowRight } from "lucide-react";

export default function WholesalePage() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
    country: "",
    productInterest: "Bags & Totes",
    estimatedQty: "",
    message: ""
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/wholesale", formData);
      toast.success("Inquiry sent successfully!");
      setIsSuccess(true);
      setFormData({
        contactName: "",
        companyName: "",
        email: "",
        country: "",
        productInterest: "Bags & Totes",
        estimatedQty: "",
        message: ""
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT COLUMN: THE PITCH --- */}
          <div className="space-y-10 lg:sticky lg:top-24">
            <div>
              <h4 className="text-[#a37a5c] font-bold text-sm tracking-widest uppercase mb-3">B2B Partnership</h4>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
                Take <span className="italic text-stone-500">Nature</span> to Your Market.
              </h1>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed">
                Partner with Jhunu's Craft to access premium, handcrafted jute products. 
                We support retailers, boutiques, and corporate clients with sustainable solutions tailored to your brand.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <Leaf className="h-5 w-5 text-[#a37a5c]" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">100% Sustainable</h3>
                  <p className="text-sm text-stone-500">Zero plastic. Biodegradable materials that appeal to modern eco-conscious consumers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <PenTool className="h-5 w-5 text-[#a37a5c]" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Custom Manufacturing</h3>
                  <p className="text-sm text-stone-500">We can print your logo or modify designs to fit your brand identity.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-[#a37a5c]" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Global Shipping</h3>
                  <p className="text-sm text-stone-500">Reliable logistics via DHL/FedEx or Ocean Freight for large volumes.</p>
                </div>
              </div>
            </div>

            {/* Link to Payment Terms */}
            <div className="pt-6 border-t border-stone-200">
               <p className="text-sm text-stone-500 mb-3">Before applying, please review our policies:</p>
               <Link 
                 href="/payment-terms" 
                 className="inline-flex items-center text-stone-900 font-bold hover:text-[#a37a5c] transition-colors group"
               >
                 Read Wholesale Payment Terms <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
               </Link>
            </div>
          </div>


          {/* --- RIGHT COLUMN: THE FORM (Your Logic) --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="bg-stone-900 p-8 text-white text-center">
              <h2 className="text-2xl font-serif font-bold mb-2">Inquiry Form</h2>
              <p className="text-stone-400 text-sm">Fill out the details below to request a catalog or quote.</p>
            </div>
            
            {isSuccess ? (
              <div className="p-12 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-stone-900">Inquiry Received!</h3>
                 <p className="text-stone-600 mt-2">Thank you, {formData.contactName || "partner"}. We will be in touch shortly.</p>
                 <button 
                   onClick={() => setIsSuccess(false)}
                   className="mt-8 text-sm font-bold text-[#a37a5c] hover:underline"
                 >
                   Send another request
                 </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Contact Name</label>
                    <input 
                      required
                      placeholder="John Doe"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Company Name</label>
                    <input 
                      required
                      placeholder="Your Business Ltd."
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Country</label>
                    <input 
                      required
                      placeholder="USA"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Product Interest</label>
                    <div className="relative">
                      <select 
                        className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                        value={formData.productInterest}
                        onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
                      >
                        <option>Bags & Totes</option>
                        <option>Rugs & Carpets</option>
                        <option>Home Decor</option>
                        <option>Raw Jute / Yarn</option>
                        <option>Custom Design</option>
                      </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Estimated Quantity</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. 500 pcs"
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                      value={formData.estimatedQty}
                      onChange={(e) => setFormData({...formData, estimatedQty: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Message / Requirements</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a37a5c] focus:border-transparent transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-[#a37a5c] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Send className="h-5 w-5" /> Send Inquiry</>}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}