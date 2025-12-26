import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs'; // <--- 1. Import Clerk


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
    // 2. Wrap everything in ClerkProvider
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-50`}>
          <Toaster position="bottom-right" />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}