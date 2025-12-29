"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";

export default function PaymentTermsPage() {
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
      toast.success("Inquiry sent! We will contact you shortly.");
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
    <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        
        {/* --- SECTION 1: THE TERMS (Your Existing Content) --- */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-200">
          
          {/* Header */}
          <div className="border-b border-stone-200 pb-8 mb-8">
            <h1 className="text-3xl font-serif font-bold text-stone-900">Wholesale Payment Terms</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              These terms outline the timeline, method, and policies for bulk orders and wholesale transactions. 
              Payment terms are the same for all buyers from the Pacific to the Atlantic.
            </p>
          </div>

          <div className="space-y-10 text-stone-800">
            
            {/* 1. Ready Goods */}
            <section>
              <h2 className="text-xl font-bold text-[#a37a5c] mb-4">1. Payment Terms for Ready Goods</h2>
              <p className="text-sm text-stone-500 mb-3 italic">(For items currently in stock and ready for urgent shipment)</p>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-6">
                <li><strong>Proforma Acceptance:</strong> After issuing, the Proforma Invoice must be accepted within 24-48 Hours.</li>
                <li><strong>Payment:</strong> 100% Advance Full Payment via <span className="font-bold">SWIFT / INTERNATIONAL WIRE TRANSFER / TELEGRAPHIC TRANSFER</span>.</li>
                <li><strong>Production Lead Time:</strong> Not Applicable for Ready Goods.</li>
                <li><strong>Shipment:</strong> Shipment will be made within 5 – 7 days of receiving payment.</li>
                <li><strong>Partial Shipment:</strong> Part Payments and Partial Shipments are acceptable.</li>
                <li><strong>Tolerance:</strong> Normal Tolerance of +/-2% in Quantity and Weight is acceptable.</li>
                <li><strong>Inspection:</strong> SGS / INTERTEK / BUREAU VERITAS inspection Report provided at buyer's option and cost.</li>
                <li><strong>Charges:</strong> All bank charges outside Bangladesh are from the Applicant's accounts.</li>
              </ul>
            </section>

            {/* 2. New Production */}
            <section>
              <h2 className="text-xl font-bold text-[#a37a5c] mb-4">2. Payment Terms for New Production</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-6">
                <li><strong>Proforma Acceptance:</strong> After issuing, the Proforma Invoice must be accepted within 24-48 Hours.</li>
                <li><strong>Payment:</strong> 50% Advance Payment via SWIFT. Balance due before shipment.</li>
                <li><strong>Production Lead Time:</strong> Generally 7 – 30 Working days required after receiving Minimum 50% Advance Payment.</li>
                <li><strong>Shipment:</strong> Shipment will be made within 5 – 7 days after receiving Outstanding Payments.</li>
                <li><strong>Partial Shipment:</strong> Part Payments and Partial Shipments are not acceptable.</li>
                <li><strong>Tolerance:</strong> Normal Tolerance of +/-2% in Quantity and Weight is acceptable.</li>
              </ul>
            </section>

            {/* 3. Sample Policy */}
            <section>
              <h2 className="text-xl font-bold text-[#a37a5c] mb-4">3. Sample Policy</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-6">
                <li><strong>Lead Time:</strong> Sample Lead time required is usually within 3-7 days.</li>
                <li><strong>Sample Fee:</strong> We charge <span className="font-bold">$250.00</span> per unit for sample development and shipping fees.</li>
              </ul>
            </section>

            {/* 4. Trade Terms */}
            <section>
              <h2 className="text-xl font-bold text-[#a37a5c] mb-4">4. Trade Terms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                  <span className="font-bold block mb-1">FOB</span>
                  Free on Board (Latest INCOTERMS)
                </div>
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                  <span className="font-bold block mb-1">CFR</span>
                  Cost with Freight (Latest INCOTERMS)
                </div>
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                  <span className="font-bold block mb-1">CIF</span>
                  Cost with Insurance & Freight
                </div>
              </div>
            </section>

            {/* 5. Documents */}
            <section>
              <h2 className="text-xl font-bold text-[#a37a5c] mb-4">5. Negotiable Documents</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm leading-6 text-stone-600">
                <li>Commercial Invoice</li>
                <li>Bill of Lading (BL)</li>
                <li>Packing and Weight List</li>
                <li>Shipping Marks</li>
                <li>Country of Origin Certificate</li>
                <li>Other Doc.: (By negotiation, i.e., Insurance Certificate, SGS Certificate, GSP Certificate)</li>
              </ul>
            </section>

            {/* 6. Bank Info */}
            <section className="bg-stone-900 text-stone-300 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-4">6. Bank Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                <div><span className="text-stone-500 block text-xs uppercase tracking-wider">Bank Name</span> Islami Bank Bangladesh PLC</div>
                <div><span className="text-stone-500 block text-xs uppercase tracking-wider">Branch</span> Newmarket, Dhaka</div>
                <div><span className="text-stone-500 block text-xs uppercase tracking-wider">Account Name</span> Asia Jute</div>
                <div><span className="text-stone-500 block text-xs uppercase tracking-wider">Account Number</span> 20501290100370312</div>
                <div><span className="text-stone-500 block text-xs uppercase tracking-wider">Routing Number</span> 125263522</div>
                <div><span className="text-stone-500 block text-xs uppercase tracking-wider">SWIFT Code</span> IBBLBDDH129</div>
              </div>
            </section>
          </div>
        </div>

        {/* --- SECTION 2: THE INQUIRY FORM (New) --- */}
        <div id="apply" className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="bg-[#a37a5c] p-8 text-white text-center">
              <h2 className="text-2xl font-serif font-bold mb-2">Accept Terms & Apply</h2>
              <p className="text-white/90 text-sm">Ready to proceed? Fill out the form below to initiate your wholesale order.</p>
            </div>
            
            {isSuccess ? (
              <div className="p-16 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-stone-900">Application Received</h3>
                 <p className="text-stone-600 mt-2">Thank you, {formData.contactName || "partner"}. We have received your details.</p>
                 <button 
                   onClick={() => setIsSuccess(false)}
                   className="mt-8 text-sm font-bold text-[#a37a5c] hover:underline"
                 >
                   Send another application
                 </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-8 space-y-6">
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
                  className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Send className="h-5 w-5" /> Send Inquiry</>}
                </button>
              </form>
            )}
        </div>

      </div>
    </div>
  );
}