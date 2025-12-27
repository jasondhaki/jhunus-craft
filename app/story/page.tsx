import Image from "next/image";

export default function OurStoryPage() {
  return (
    <div className="bg-[#fdfcf7] min-h-screen">
      {/* 1. HERO SECTION - Use story-hero.jpg */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827952/story-hero_zrn6nu.png" 
          alt="Weaving Tradition"
          fill
          priority // Added for optimization: loads this "above fold" image first
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 shadow-sm">
            Our Story: Weaving Tradition into Modern Life
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-6">
        {/* 2. ABOUT US SECTION - Use founder-team.jpg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-stone-900 border-b-2 border-stone-200 pb-2 inline-block">About Us</h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              Jhunu’s Craft was born from a vision to preserve the rich heritage of jute 
              craftsmanship in Bangladesh. We connect rural artisans with modern 
              global markets, ensuring that traditional weaving techniques are 
              celebrated and sustained.
            </p>
            <p className="text-stone-700 font-medium italic border-l-4 border-[#a37a5c] pl-4 py-2 bg-stone-50 rounded-r-lg">
              "Every item carries the signature of an artisan who has spent decades perfecting their craft."
            </p>
          </div>
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827952/founder-team_bazdnk.png" 
              alt="Founder, Jhunu and her team"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* 3. OUR ARTISANS SECTION - Use artisan1, artisan2, artisan3 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-stone-900 mb-4">Our Artisans</h2>
          <div className="w-24 h-1 bg-[#a37a5c] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: "Wooten Weaver", role: "Master Artisan", img: "https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827952/artisan1_bznixk.png" },
            { name: "Wahis Weaver", role: "Design Lead", img: "https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827951/artisan2_iaods4.png" },
            { name: "Sheunai Weaver", role: "Quality Specialist", img: "https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827951/artisan3_sdfdyy.png" }
          ].map((artisan, i) => (
            <div key={i} className="text-center group bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-6 border-4 border-stone-50">
                <Image 
                  src={artisan.img} 
                  alt={artisan.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition duration-700"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900">{artisan.name}</h3>
              <p className="text-sm text-[#a37a5c] font-bold uppercase tracking-widest mt-1">{artisan.role}</p>
            </div>
          ))}
        </div>

        {/* 4. SUSTAINABILITY & IMPACT SECTION - Use sustain-img1 and sustain-img2 */}
        <div className="mt-32 bg-[#a37a5c] rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <h2 className="text-3xl font-serif mb-6 border-b border-white/30 pb-4">Sustainability & Impact</h2>
              <p className="opacity-95 leading-relaxed text-lg">
                Eco-friendly practices are woven into our daily routine. From 100% 
                biodegradable jute to reducing waste in the production process, we 
                prioritize the planet alongside our people.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                <Image 
                   src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827951/our-story-sustainable-img1_ydeujk.png" 
                   alt="Eco-friendly raw jute fibers" 
                   fill 
                   className="object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                <Image 
                   src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766827951/our-story-sustainable-img2_sc2ssf.png" 
                   alt="Artisan working on a traditional loom" 
                   fill 
                   className="object-cover hover:scale-110 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}