import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 1. Import the Footer
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Jhunu's Craft | Premium Jute Goods",
  description: "Handcrafted sustainable jute products from Bangladesh.",
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
          
          {/* 2. Wrap children in a div that pushes the footer down */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 3. Add the Footer at the bottom */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}