import React from "react";
import Link from "next/link";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-200">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-8 mb-8">
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Privacy Policy</h1>
          <p className="text-stone-500 text-sm">Effective Date: December 28, 2025</p>
        </div>

        {/* Intro */}
        <div className="prose prose-stone max-w-none text-stone-600 space-y-8">
          <p className="leading-relaxed">
            At <strong>Jhunu's Craft</strong> ("we," "our," or "us"), we value the trust you place in us when you purchase our handcrafted jute products. 
            This Privacy Policy details how we collect, use, and protect your personal information in compliance with the laws of Bangladesh, 
            the General Data Protection Regulation (GDPR) for our European customers, and the California Consumer Privacy Act (CCPA) for our US customers.
          </p>

          {/* 1. What We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-stone-100 rounded-lg"><Database className="h-5 w-5 text-[#a37a5c]" /></div>
              <h2 className="text-xl font-bold text-stone-900 m-0">1. Information We Collect</h2>
            </div>
            <p>We collect only the information necessary to process your order and improve your experience:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Personal Identification:</strong> Name, email address, phone number, and shipping address.</li>
              <li><strong>Payment Information:</strong> We do not store your credit card details. All transactions are processed via secure third-party gateways (e.g., Stripe, SSLCommerz).</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information to prevent fraud and optimize our website.</li>
            </ul>
          </section>

          {/* 2. How We Use It */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-stone-100 rounded-lg"><Eye className="h-5 w-5 text-[#a37a5c]" /></div>
              <h2 className="text-xl font-bold text-stone-900 m-0">2. How We Use Your Data</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and deliver your orders (sharing address details with carriers like DHL, FedEx, or Pathao).</li>
              <li>To send order confirmations, shipping updates, and invoices.</li>
              <li>To provide customer support and handle returns.</li>
              <li>For fraud prevention and legal compliance.</li>
            </ul>
          </section>

          {/* 3. Data Protection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-stone-100 rounded-lg"><Lock className="h-5 w-5 text-[#a37a5c]" /></div>
              <h2 className="text-xl font-bold text-stone-900 m-0">3. Data Security</h2>
            </div>
            <p>
              We implement industry-standard security measures, including SSL encryption, to protect your personal data during transmission. 
              Access to your personal information is restricted to authorized personnel only.
            </p>
          </section>

          {/* 4. Third-Party Sharing */}
          <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">4. Sharing with Third Parties</h2>
            <p>We strictly <strong>do not sell</strong> your personal data. We only share data with trusted partners essential to our operations:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Logistics Partners:</strong> DHL, FedEx, RedX, Pathao (for delivery purposes).</li>
              <li><strong>Payment Processors:</strong> Stripe, BKash, SSLCommerz (for secure payments).</li>
              <li><strong>Analytics:</strong> Google Analytics (anonymized data for site performance).</li>
            </ul>
          </section>

           {/* 5. International Transfers */}
           <section>
            <h2 className="text-xl font-bold text-stone-900 mb-4">5. International Data Transfers</h2>
            <p>
              Jhunu's Craft is based in Bangladesh. If you are accessing our site from the EU, USA, or other regions, please note that your information 
              will be transferred to and processed in Bangladesh. By using our services, you consent to this transfer. We ensure appropriate safeguards 
              are in place to protect your data during this transfer.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-stone-100 rounded-lg"><Shield className="h-5 w-5 text-[#a37a5c]" /></div>
              <h2 className="text-xl font-bold text-stone-900 m-0">6. Your Rights (GDPR & CCPA)</h2>
            </div>
            <p>Depending on your location, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data ("Right to be Forgotten").</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
            </ul>
            <p className="mt-4 text-sm bg-stone-50 p-4 rounded border border-stone-200">
              To exercise these rights, please contact our Data Protection Officer at: <br/>
              <a href="mailto:privacy@jhunuscraft.com" className="text-[#a37a5c] font-bold hover:underline">privacy@jhunuscraft.com</a>
            </p>
          </section>

          {/* 7. Contact */}
          <section className="border-t border-stone-200 pt-8 mt-8">
            <h2 className="text-xl font-bold text-stone-900 mb-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <address className="not-italic mt-4 text-stone-600">
              <strong>Jhunu's Craft</strong><br />
              Attn: Legal Department<br />
              Monipuripara, Tejgaon<br />
              Dhaka - 1215, Bangladesh<br />
              Email: info@jhunuscraft.com
            </address>
          </section>

        </div>
      </div>
    </div>
  );
}