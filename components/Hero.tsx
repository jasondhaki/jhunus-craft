import Link from "next/link";


export default function Hero() {
  return (
    <div className="relative bg-stone-50">
      {/* 1. Main Hero Section */}
      <div className="relative isolate overflow-hidden pt-14">
        
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766953610/igooeqhqnwvzcpjozlnj.png"
          alt="Jute interior"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
        />
        
        {/* Dark Overlay (Essential for text readability) */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-900/60 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl drop-shadow-md">
              Handcrafted Jute. <br />
              Globally Loved. <br />
              Earth Friendly.
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-100 drop-shadow-sm">
              The golden fiber of Bangladesh, woven into timeless elegance. 
              Sustainable luxury for your home and lifestyle.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/shop"
                className="rounded-md bg-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-all"
              >
                Shop the New Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRUST & IMPACT SECTION (USP) */}
      <section className="py-24 bg-[#EAE5D9] border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Feature 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 mb-6">
                <svg className="h-8 w-8 text-[#a37a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">100% Biodegradable</h3>
              <p className="mt-2 text-sm text-stone-600">Our jute is earth-friendly, plastic-free, and returns to nature.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 mb-6">
                 <svg className="h-8 w-8 text-[#a37a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">Handcrafted with Love</h3>
              <p className="mt-2 text-sm text-stone-600">Made by skilled artisans in Bangladesh, preserving heritage techniques.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 mb-6">
                <svg className="h-8 w-8 text-[#a37a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.5-4.171" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">Fair Trade First</h3>
              <p className="mt-2 text-sm text-stone-600">We ensure fair wages and safe working conditions for every weaver.</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 mb-6">
                <svg className="h-8 w-8 text-[#a37a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">Global Shipping</h3>
              <p className="mt-2 text-sm text-stone-600">From Dhaka to your doorstep, we ship worldwide with care.</p>
            </div>

          </div>
        </div>
      </section>

      
    </div>
  );
}