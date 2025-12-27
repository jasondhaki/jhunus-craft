export default function PolicyPage() {
  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto prose prose-stone">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8 border-b pb-4">Store Policies</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Shipping & Delivery</h2>
          <p className="text-stone-600 leading-relaxed">
            We provide handcrafted jute products from Dhaka, Bangladesh. Most orders are processed within 3-5 business days. 
            For local orders (Dhaka), delivery typically takes 2-3 days. For international shipping, please allow 10-15 business days.
          </p>
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 mt-4">
            <p className="text-sm font-bold text-stone-700">Note: Cash on Delivery is currently available for domestic orders only.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Returns & Refunds</h2>
          <p className="text-stone-600 leading-relaxed">
            Because our items are handmade, slight variations in color and weave are expected and celebrated. 
            However, if your item arrives damaged (e.g., a tear in your <strong>Sundarban Rug</strong>), please contact us within 48 hours.
          </p>
          <ul className="list-disc pl-5 mt-4 text-stone-600 space-y-2">
            <li>Items must be unused and in original packaging.</li>
            <li>Refunds are processed to the original payment method or via mobile banking for COD orders.</li>
            <li>Wholesale orders are subject to separate contract terms.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Wholesale Terms</h2>
          <p className="text-stone-600 leading-relaxed">
            Business inquiries made through our <a href="/wholesale" className="text-stone-900 font-bold">Wholesale Portal </a> 
            require a 50% deposit before production begins for bulk quantities.
          </p>
        </section>

        <div className="mt-20 text-center border-t pt-8">
          <p className="text-stone-400 text-sm italic">Last Updated: December 2025</p>
        </div>
      </div>
    </div>
  );
}