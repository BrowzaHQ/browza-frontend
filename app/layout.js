export const metadata = { title: 'Browza' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <div style={{ padding: 16, maxWidth: 960, margin: '0 auto' }}>
          <header style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: 20, margin: 0 }}>Browza</h1>
            <nav style={{ marginTop: 8 }}>
              <a href="/" style={{ marginRight: 12 }}>Home</a>
              <a href="/health">Health</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
