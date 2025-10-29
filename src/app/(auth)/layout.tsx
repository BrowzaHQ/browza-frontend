export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Base very-light backdrop (cool gray → almost white) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EFF4FF] to-[#F7F9FF]" />

      {/* Subtle blue glow top-left (brand #2563EB) */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full
                      bg-[#2563EB] opacity-10 blur-[120px]" />

      {/* Soft green glow bottom-right (brand #22C55E) */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full
                      bg-[#22C55E] opacity-[0.06] blur-[140px]" />

      {/* Slight center vignette so the card pops (very subtle) */}
      <div className="pointer-events-none absolute inset-0
                      bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_60%)]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
