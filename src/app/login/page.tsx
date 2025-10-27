import LoginCard from "@/components/auth/LoginCard";

export default function Page() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0F19] via-[#0B0F19] to-[#0B0F19]/90" />
      <LoginCard />
    </main>
  );
}
