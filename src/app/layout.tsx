// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import Toaster from "@/components/ui/toaster";
import UserMenu from "@/components/header/UserMenu";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Browza",
  description: "Browza app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50">
        {/* Top Bar / Global Nav */}

        {/* Page Content */}
         <Providers>
          
        <main className="mx-auto w-full px-4">
          {children}
          </main>
          </Providers>  

        {/* Global toast notifications */}
        <Toaster />
      </body>
    </html>
  );
}
