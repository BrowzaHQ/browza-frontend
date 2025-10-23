import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Browza',
  description: 'Buyer Web (Staging)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <header className="border-b">
          <nav className="container mx-auto flex gap-4 p-4">
  <Link href="/" className="underline">Home</Link>
  <Link href="/status" className="underline">Status</Link>
  <Link href="/health" className="underline">Health</Link>
  <Link href="/login" className="underline">Login</Link>
</nav>
        </header>
        <main className="container mx-auto p-4">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
