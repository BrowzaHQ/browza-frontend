export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0B0F19] flex items-center justify-center">
      {children}
    </div>
  );
}
