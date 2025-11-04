export default function Unauthorized() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">401 — Unauthorized</h1>
      <p className="mt-2 text-gray-600">
        You don’t have access to this area. Please sign in with the right account.
      </p>
      <a
        href="/login"
        className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white"
      >
        Go to Login
      </a>
    </main>
  );
}
