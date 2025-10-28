// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Toaster from "@/components/ui/toaster";
import SessionBootstrap from "@/components/providers/SessionBootstrap";

export const metadata: Metadata = {
  title: "Browza",
  description: "Browza app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#0B0F19] text-gray-100 antialiased">
        <SessionBootstrap />   {/* hydrates session from /auth/me if a cookie exists */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
