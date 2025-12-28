import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL('https://jhunus-craft.vercel.app'), // Change this to your real domain when you buy one
  title: {
    default: "Jhunu's Craft | Sustainable Jute Products from Bangladesh",
    template: "%s | Jhunu's Craft"
  },
  description: "Handcrafted, 100% biodegradable jute bags, rugs, and home decor. Ethically sourced from Dhaka, available for global wholesale and retail shipping.",
  keywords: ["Jute Bags", "Sustainable Fashion", "Wholesale Jute", "Dhaka Handicrafts", "Eco-friendly Bags", "Biodegradable Packaging", "Made in Bangladesh"],
  authors: [{ name: "Jhunu's Craft" }],
  creator: "Jhunu's Craft",
  openGraph: {
    title: "Jhunu's Craft | The Golden Fiber of Bangladesh",
    description: "Discover the elegance of sustainable jute. Handwoven, eco-friendly, and built for the future.",
    url: 'https://jhunus-craft.vercel.app',
    siteName: "Jhunu's Craft",
    images: [
      {
        url: 'https://res.cloudinary.com/dh6pbkd80/image/upload/v1/sustain-hero-field', // Your Hero Image
        width: 1200,
        height: 630,
        alt: 'Jhunu\'s Craft Sustainable Jute Field',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jhunu's Craft | Sustainable Jute",
    description: "Handcrafted jute products from the heart of Bangladesh.",
    images: ['https://res.cloudinary.com/dh6pbkd80/image/upload/v1/sustain-hero-field'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-50 flex flex-col min-h-screen`}>
          <Toaster position="bottom-right" />
          <Navbar />
          
          {/* Main content wrapper pushes footer down */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}