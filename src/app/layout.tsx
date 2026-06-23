import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import Link from "next/link";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hidden Plans Hub - The Plans They Don't Advertise",
  description: "Reveal hidden subscription plans, find the cheapest options across music, movies, cloud storage, and unlock exclusive rewards with Polygon blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen pb-20 md:pb-0`}>
        <WalletProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header with web3 actions and brand */}
            <Header />
            
            {/* Main view container */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              {children}
            </main>

            {/* Bottom navbar for mobile / Sidebar/Header for desktop */}
            <Navigation />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
