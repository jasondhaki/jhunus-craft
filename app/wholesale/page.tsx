"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Send } from "lucide-react";

export default function WholesalePage() {
  const [loading, setLoading] = useState(false);
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
      toast.success("Inquiry sent! Our team will contact you soon.");
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
    <div className="bg-stone-50 min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="bg-stone-900 p-8 text-white text-center">
          <h1 className="text-3xl font-serif font-bold mb-2">Wholesale & Export</h1>
          <p className="text-stone-400">Partner with Jhunu's Craft for sustainable jute solutions.</p>
        </div>
        
        <form onSubmit={onSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Contact Name</label>
              <input 
                required
                className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Company Name</label>
              <input 
                required
                className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
              <input 
                type="email"
                required
                className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Country</label>
              <input 
                required
                className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Product Interest</label>
              <select 
                className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
                value={formData.productInterest}
                onChange={(e) => setFormData({...formData, productInterest: e.target.value})}
              >
                <option>Bags & Totes</option>
                <option>Rugs & Carpets</option>
                <option>Home Decor</option>
                <option>Custom Design</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Estimated Quantity</label>
              <input 
                type="number"
                required
                placeholder="e.g. 100"
                className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
                value={formData.estimatedQty}
                onChange={(e) => setFormData({...formData, estimatedQty: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2">Message / Special Requirements</label>
            <textarea 
              rows={4}
              className="w-full border-stone-200 rounded-lg p-3 text-sm focus:ring-stone-900 focus:border-stone-900"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Send className="h-4 w-4" /> Send Inquiry</>}
          </button>
        </form>
      </div>
    </div>
  );
}