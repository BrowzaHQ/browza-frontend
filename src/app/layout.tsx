// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import Toaster from "@/components/ui/toaster";
import UserMenu from "@/components/header/UserMenu";

export const metadata: Metadata = {
  title: "Browza",
  description: "Browza app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-50">
        {/* Top Bar / Global Nav */}
        <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            {/* Left: Brand / Home */}
            <div className="flex items-center gap-3">
              <Link href="/" className="font-semibold text-gray-900 hover:opacity-80">
                Browza
              </Link>
              {/* (Optional) quick links – keep or adjust */}
              <nav className="hidden items-center gap-5 text-sm text-gray-600 sm:flex">
                <Link href="/dash" className="hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/status" className="hover:text-gray-900">
                  Status
                </Link>
              </nav>
            </div>

            {/* Right: User actions */}
            <div className="flex items-center gap-2">
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>

        {/* Global toast notifications */}
        <Toaster />
      </body>
    </html>
  );
}
