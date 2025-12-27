import Image from "next/image";
import { Download, FileText } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="bg-[#fdfcf7] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image 
          src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766867105/k55nxw5u3zirk9azuokc.png" 
          alt="Raw Jute Field"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-md">
            Sustainability at Heart
          </h1>
          <p className="text-white/90 text-lg max-w-2xl font-light">
            We don't just sell products; we champion a greener planet through the Golden Fiber.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-20 px-6 space-y-24">
        
        {/* Section 1: The Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl font-serif text-stone-900">Why Jute?</h2>
            <div className="w-16 h-1 bg-[#a37a5c]"></div>
            <p className="text-stone-600 leading-relaxed text-lg">
              Known as the "Golden Fiber," jute is one of the most affordable natural fibers 
              and is second only to cotton in amount produced. It is <strong>100% biodegradable</strong> 
              and recyclable and thus environmentally friendly.
            </p>
            <ul className="space-y-3 mt-4">
              {['Zero Waste Production', 'Low Water Footprint', 'Carbon Negative'].map((item) => (
                <li key={item} className="flex items-center text-stone-700 font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-lg transform rotate-2 hover:rotate-0 transition duration-500">
             {/* Use your raw jute/fiber image */}
            <Image 
              src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766867105/zwsl4zxveapr5mt7xkga.png" 
              alt="Golden Jute Fiber"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 2: The Process */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
              {/* Use your weaving/loom image */}
              <Image 
                src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766867104/cnlfsszlzfmos6fwelys.png" 
                alt="Ethical Production"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-stone-900">Ethical Production</h2>
              <div className="w-16 h-1 bg-[#a37a5c]"></div>
              <p className="text-stone-600 leading-relaxed text-lg">
                Our artisans use traditional handlooms that require zero electricity, 
                significantly reducing our carbon footprint compared to machine-made textiles.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg">
                We ensure fair wages and safe working conditions, proving that sustainability 
                is about both the planet and its people.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Biodegradable", value: "100%" },
            { label: "Plastic Free", value: "100%" },
            { label: "Artisans Supported", value: "50+" },
            { label: "Years of Tradition", value: "40+" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#a37a5c]/10 p-6 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-[#a37a5c] mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-stone-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section 4: Download Impact Report CTA */}
        <div className="mt-24 mb-12">
          <div className="bg-[#1c1917] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background decoration using your existing Fiber image */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <Image 
                 src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766867105/zwsl4zxveapr5mt7xkga.png" 
                 alt="Texture" 
                 fill 
                 className="object-cover grayscale"
               />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <FileText className="text-[#a37a5c] w-6 h-6" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                Transparency Verification
              </h2>
              
              <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                For our wholesale partners and conscious consumers, we maintain an open book policy. 
                Download the official <strong>Jhunu&apos;s Craft</strong> annual report for detailed breakdowns of our supply chain audits, 
                artisan wage structures, and carbon footprint calculations.
              </p>

              <a 
                href="/Jhunus-Craft-Impact-Report-2025.pdf" 
                download="Jhunus-Craft-Impact-Report-2025.pdf"
                className="inline-flex items-center gap-3 bg-[#a37a5c] hover:bg-[#8c6b5d] text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                <Download className="w-5 h-5" />
                Download 2025 Impact Report
              </a>
              
              <p className="mt-6 text-xs text-stone-500 uppercase tracking-widest">
                PDF Format • 2.4 MB • Updated Dec 2024
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}