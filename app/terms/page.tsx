import React from "react";
import Link from "next/link";
import { FileText, AlertCircle, Gavel, Globe, ShieldAlert } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-200">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-[#a37a5c]" />
            <h1 className="text-3xl font-serif font-bold text-stone-900">Terms of Service</h1>
          </div>
          <p className="text-stone-500 text-sm">Last Updated: December 29, 2025</p>
        </div>

        {/* Intro */}
        <div className="prose prose-stone max-w-none text-stone-600 space-y-8">
          <p className="leading-relaxed">
            Welcome to <strong>Jhunu's Craft</strong>. By accessing our website and purchasing our products, you agree to be bound by the following terms and conditions. 
            Please read them carefully. If you do not agree with any part of these terms, you must not use our services.
          </p>

          {/* 1. The "Handmade" Disclaimer (CRITICAL) */}
          <section className="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="h-5 w-5 text-[#a37a5c]" />
              <h2 className="text-lg font-bold text-stone-900 m-0">1. Nature of Handcrafted Goods</h2>
            </div>
            <p className="text-sm">
              You acknowledge that our products are <strong>100% handmade</strong> by artisans in Bangladesh using natural jute fibers. 
              Unlike factory-made synthetic items:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li><strong>Variations:</strong> Slight variations in color, weave, texture, and size (up to 5%) are expected and are not considered defects.</li>
              <li><strong>Color:</strong> Natural jute fiber colors may vary depending on the harvest season and your screen display settings.</li>
              <li><strong>Wear:</strong> "Sprouts" (loose fibers) are natural in jute rugs and can be trimmed; they are not a sign of unraveling.</li>
            </ul>
          </section>

          {/* 2. Orders & Pricing */}
          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">2. Orders, Pricing & Availability</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Currency:</strong> All prices are displayed in USD (International) or BDT (Domestic). We reserve the right to change prices at any time without notice.</li>
              <li><strong>Order Acceptance:</strong> We reserve the right to refuse any order. If we cancel an order after you have been charged, we will issue a full refund immediately.</li>
              <li><strong>Errors:</strong> In the event of a pricing error, we reserve the right to cancel orders placed at the incorrect price.</li>
            </ul>
          </section>

          {/* 3. Shipping & Customs (CRITICAL for International) */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-[#a37a5c]" />
              <h2 className="text-xl font-bold text-stone-900 m-0">3. International Shipping & Customs</h2>
            </div>
            <p>
              For orders shipped outside of Bangladesh:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>DDU (Delivered Duty Unpaid):</strong> Our prices <strong>do not</strong> include import duties, VAT, or taxes mandated by your country.</li>
              <li><strong>Responsibility:</strong> You (the buyer) are responsible for paying these fees upon delivery. Refusal to pay customs fees will result in the package being abandoned, and <strong>no refund will be issued</strong>.</li>
              <li><strong>Delays:</strong> We are not responsible for delays caused by customs clearance processes in your country.</li>
            </ul>
          </section>

          {/* 4. Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">4. Intellectual Property</h2>
            <p>
              All content on this site—including the "Jhunu's Craft" logo, product designs, photography, text, and graphics—is the exclusive property of Jhunu's Craft 
              and is protected by Bangladesh copyright laws and international treaties. You may not use our images for commercial purposes without written consent.
            </p>
          </section>

           {/* 5. Limitation of Liability */}
           <section>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="h-5 w-5 text-[#a37a5c]" />
              <h2 className="text-xl font-bold text-stone-900 m-0">5. Limitation of Liability</h2>
            </div>
            <p>
              To the fullest extent permitted by law, Jhunu's Craft shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products. 
              Our total liability for any claim shall not exceed the amount you paid for the product.
            </p>
          </section>

          {/* 6. Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="h-5 w-5 text-[#a37a5c]" />
              <h2 className="text-xl font-bold text-stone-900 m-0">6. Governing Law</h2>
            </div>
            <p>
              These Terms of Service and any separate agreements shall be governed by and construed in accordance with the laws of <strong>Bangladesh</strong>. 
              Any disputes arising shall be subject to the exclusive jurisdiction of the courts in <strong>Dhaka, Bangladesh</strong>.
            </p>
          </section>

          {/* 7. Contact */}
          <section className="border-t border-stone-200 pt-8 mt-8">
            <h2 className="text-xl font-bold text-stone-900 mb-4">7. Contact Information</h2>
            <p>Questions about the Terms of Service should be sent to us at:</p>
            <address className="not-italic mt-4 text-stone-600">
              <strong>Jhunu's Craft</strong><br />
              Email: info@jhunuscraft.com<br />
              Phone: +880 1712-345678<br />
              Address: Monipuripara, Dhaka - 1215, Bangladesh
            </address>
          </section>

        </div>
      </div>
    </div>
  );
}