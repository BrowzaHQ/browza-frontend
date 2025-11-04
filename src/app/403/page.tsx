export default function Forbidden() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">403 — Forbidden</h1>
      <p className="mt-2 text-gray-600">
        You’re signed in, but this area needs additional permissions.
      </p>
      <a
        href="/login"
        className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white"
      >
        Switch account
      </a>
    </main>
  );
}
