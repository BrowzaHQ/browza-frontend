// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl py-16">
      <h1 className="text-5xl font-bold">Browza</h1>
      <nav className="mt-4 flex gap-6 underline">
        <Link href="/">Home</Link>
        <Link href="/health">Health</Link>
        <Link href="/status">Status</Link>
      </nav>

      <h2 className="mt-10 text-3xl font-semibold">Buyer Web (Staging)</h2>
      <p className="mt-4 text-lg">
        This is a minimal placeholder to get a Vercel URL.
        Use the <Link className="underline" href="/health">Health</Link> page to test the API.
      </p>

      <div className="mt-10">
        <Link
          href="/status"
          className="inline-block rounded-full px-6 py-3 font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          Check Status
        </Link>
      </div>
    </main>
  );
}
