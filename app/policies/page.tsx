import Link from "next/link";
import { Truck, RefreshCw, ShieldCheck, HelpCircle, Globe, MapPin } from "lucide-react";

export default function PolicyPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Shipping & Returns</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            At Jhunu's Craft, we believe in transparency. Here is everything you need to know about getting our products to your doorstep and what to do if you change your mind.
          </p>
        </div>

        <div className="grid gap-10">
          
          {/* SECTION 1: SHIPPING */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center text-[#a37a5c]">
                <Truck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Global Shipping Policy</h2>
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              Every item is packed with care in Dhaka, Bangladesh. Since our products are handcrafted, please allow 
              <span className="font-semibold text-stone-900"> 2-3 business days</span> for order processing before shipment.
            </p>

            <div className="overflow-hidden rounded-lg border border-stone-200 mb-6">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Estimated Delivery</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Carrier</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-200 text-sm text-stone-600">
                  <tr>
                    <td className="px-6 py-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-[#a37a5c]"/> Dhaka (Local)</td>
                    <td className="px-6 py-4">2 - 3 Business Days</td>
                    <td className="px-6 py-4">Pathao / RedX</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-[#a37a5c]"/> Bangladesh (Nationwide)</td>
                    <td className="px-6 py-4">3 - 5 Business Days</td>
                    <td className="px-6 py-4">SA Paribahan / Sundarban</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 flex items-center gap-2"><Globe className="h-4 w-4 text-[#a37a5c]"/> International (USA, EU, UK)</td>
                    <td className="px-6 py-4">10 - 15 Business Days</td>
                    <td className="px-6 py-4">DHL Express / FedEx</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-stone-50 p-4 rounded-lg flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#a37a5c] shrink-0 mt-0.5" />
              <div className="text-sm text-stone-700">
                <strong>Customs & Duties:</strong> For international orders, customs duties and taxes are not included in the shipping price. 
                These are the responsibility of the customer upon delivery.
              </div>
            </div>
          </section>

          {/* SECTION 2: RETURNS */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center text-[#a37a5c]">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">Returns & Refunds</h2>
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              We stand by the quality of our jute. However, as these are natural fibers woven by hand, slight variations in color and texture 
              are a mark of authenticity, not a defect. If you are not completely satisfied, here is how we can help:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-stone-900 mb-3">Eligibility Window</h3>
                <ul className="space-y-3 text-stone-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a37a5c] mt-1.5 shrink-0"></span>
                    <span><strong>Damaged Items:</strong> Report within 48 hours of delivery for a full replacement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a37a5c] mt-1.5 shrink-0"></span>
                    <span><strong>Change of Mind:</strong> Returns accepted within 14 days of delivery.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 mb-3">Conditions</h3>
                <ul className="space-y-3 text-stone-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a37a5c] mt-1.5 shrink-0"></span>
                    <span>Item must be unused, unwashed, and in original packaging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a37a5c] mt-1.5 shrink-0"></span>
                    <span>Return shipping costs are the responsibility of the customer (unless the item arrived damaged).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-stone-100 pt-6">
              <h3 className="font-bold text-stone-900 mb-4">How to Initiate a Return</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-stone-600">
                <li>Email us at <strong className="text-stone-900">info@jhunuscraft.com</strong> with your Order ID and a photo of the item.</li>
                <li>Our team will approve the return request within 24 hours.</li>
                <li>Ship the item to our Dhaka warehouse (address provided upon approval).</li>
                <li>Refunds are processed to your original payment method within 5-7 days of receipt.</li>
              </ol>
            </div>
          </section>

          {/* SECTION 3: WHOLESALE (Linked) */}
          <section className="bg-stone-900 rounded-2xl p-8 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Buying in Bulk?</h2>
              <p className="text-stone-400 text-sm max-w-lg">
                We offer specialized terms for wholesale partners, including FOB/CIF pricing and SWIFT payment options.
              </p>
            </div>
            <Link 
              href="/payment-terms" 
              className="whitespace-nowrap bg-[#a37a5c] hover:bg-[#8c6b5d] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Wholesale Terms
            </Link>
          </section>

        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center border-t border-stone-200 pt-8">
          <div className="flex items-center justify-center gap-2 text-stone-400 mb-4">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Still have questions?</span>
          </div>
          <p className="text-stone-500 text-sm">
            Contact our support team at <a href="mailto:info@jhunuscraft.com" className="text-[#a37a5c] hover:underline">info@jhunuscraft.com</a> or call +880 1712-345678.
          </p>
          <p className="text-stone-400 text-xs mt-6 italic">Last Updated: December 2025</p>
        </div>

      </div>
    </div>
  );
}