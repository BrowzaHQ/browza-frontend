import LoginCard from "@/components/auth/LoginCard";

export default function Page() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      {/* light background gradient, independent of global body color */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-slate-50" />
      <LoginCard />
    </main>
  );
}
