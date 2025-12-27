"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // DEBUG: Prove the function is running
    console.log("1. Submit button clicked. collecting data...");

    // 1. Gather form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      // 2. Send data to our backend API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // 3. Parse the JSON response from the server
      const result = await response.json();
      
      // DEBUG: Log exactly what the server said (Success or Error)
      console.log("2. Server Response:", result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send');
      }

      // 4. Success Feedback
      toast.success("Message sent! We'll reply within 24 hours.");
      (e.target as HTMLFormElement).reset(); // Clear the form
    } catch (error) {
      console.error("Frontend Error:", error);
      toast.error("Failed to send message. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fdfcf7] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image 
          // Using a known working image from your sustainability page
          src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766872382/hrjk3dbbi2ryasftlfnu.png" 
          alt="Contact Jhunu's Craft"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 shadow-sm">
            Get in Touch
          </h1>
          <p className="text-white/90 text-lg max-w-xl font-light">
            Whether you are a global brand looking for sustainable partnerships or a local customer, we are here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif text-stone-900 mb-6">Contact Information</h2>
              <div className="w-20 h-1 bg-[#a37a5c] mb-8"></div>
              <p className="text-stone-600 leading-relaxed text-lg mb-8">
                Jhunu's Craft operates from the heart of Dhaka, connecting rural artisans with the world. 
                Visit our showroom or contact our export team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#a37a5c]/10 p-3 rounded-full text-[#a37a5c]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Headquarters</h3>
                  <p className="text-stone-600 text-sm">
                    House 12, Road 5<br/>
                    Dhanmondi, Dhaka 1209<br/>
                    Bangladesh
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#a37a5c]/10 p-3 rounded-full text-[#a37a5c]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Email Us</h3>
                  <p className="text-stone-600 text-sm">
                    <strong>Wholesale:</strong> export@jhunuscraft.com<br/>
                    <strong>Support:</strong> hello@jhunuscraft.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#a37a5c]/10 p-3 rounded-full text-[#a37a5c]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Call Us</h3>
                  <p className="text-stone-600 text-sm">
                    +880 1712-345678<br/>
                    <span className="text-stone-400 text-xs">Mon-Fri, 9am - 6pm BST</span>
                  </p>
                </div>
              </div>

              {/* Global Reach */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#a37a5c]/10 p-3 rounded-full text-[#a37a5c]">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Global Shipping</h3>
                  <p className="text-stone-600 text-sm">
                    We ship to USA, Europe, and Australia via DHL Express.
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder - FIXED */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md border border-stone-200 bg-stone-100 flex items-center justify-center group">
               {/* 1. FIXED IMAGE: Using safe 'sustain-hero-field' so it loads perfectly */}
               <Image 
                 src="https://res.cloudinary.com/dh6pbkd80/image/upload/f_auto,q_auto/v1766873136/ootgt2xdd6sgh4uzvldt.jpg" 
                 alt="Location Map"
                 fill
                 className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition duration-500"
               />
               
               {/* 2. FIXED INTERACTION: Real Link to Google Maps */}
               <a 
                 href="https://maps.app.goo.gl/HjW2XpRxLXi1hz667" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="relative z-10 bg-white px-6 py-3 rounded-full shadow-lg text-sm font-bold text-stone-900 hover:scale-105 hover:bg-stone-50 transition flex items-center gap-2"
               >
                 <MapPin className="w-4 h-4 text-red-600" />
                 View on Google Maps
               </a>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#a37a5c]/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

            <h3 className="text-2xl font-serif text-stone-900 mb-6 relative z-10">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">First Name</label>
                  <input 
                    name="firstName" 
                    required 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#a37a5c] focus:ring-1 focus:ring-[#a37a5c] outline-none transition"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Last Name</label>
                  <input 
                    name="lastName" 
                    required 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#a37a5c] focus:ring-1 focus:ring-[#a37a5c] outline-none transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Email Address</label>
                <input 
                  name="email" 
                  required 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#a37a5c] focus:ring-1 focus:ring-[#a37a5c] outline-none transition"
                  placeholder="jane@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Subject</label>
                <select 
                  name="subject" 
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#a37a5c] focus:ring-1 focus:ring-[#a37a5c] outline-none transition text-stone-600"
                >
                  <option>Wholesale Inquiry</option>
                  <option>Custom Order Request</option>
                  <option>Order Status</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Message</label>
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#a37a5c] focus:ring-1 focus:ring-[#a37a5c] outline-none transition"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full bg-[#a37a5c] hover:bg-[#8c6b5d] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}