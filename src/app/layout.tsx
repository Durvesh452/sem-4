import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hidden Plans Hub — Discover Plans They Don't Advertise",
  description: "Reveal hidden subscription plans, compare the cheapest options across music, streaming, food, cloud, and unlock exclusive rewards with blockchain tokens.",
  keywords: "hidden plans, subscription deals, student discounts, cheapest plans, telecom offers",
  openGraph: {
    title: "Hidden Plans Hub (HPH)",
    description: "Find hidden, unlisted subscription plans and save money on every service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={`${manrope.className} bg-background text-foreground antialiased min-h-screen pb-24 md:pb-0`}>
        <WalletProvider>
          <div className="flex flex-col min-h-screen relative z-10">
            {/* Header */}
            <Header />

            {/* Navigation (desktop sub-nav + mobile bottom bar) */}
            <Navigation />

            {/* Main Content */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
              {children}
            </main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
