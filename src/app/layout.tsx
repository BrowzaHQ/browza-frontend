import type { Metadata } from 'next';
import './globals.css';

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
            <a href="/" className="underline">Home</a>
            <a href="/status" className="underline">Status</a>
            <a href="/health" className="underline">Health</a>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
