"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useSession } from "@/stores/useSession";
import BrowzaLogo from "@/components/icons/BrowzaLogo";

// Optional (icons). If you didn't add the package, this fallback SVG is used.
let CheckCircle: any = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);
try {
  CheckCircle = require("lucide-react").CheckCircle;
} catch {}

// ---------------- Demo toggle & users (inline; no extra file needed) -------------
const DEMO_ENABLED =
  (process.env.NEXT_PUBLIC_DEMO_LOGIN || "").toLowerCase() === "true";

const DEMO_USERS: Record<string, { role: "buyer" | "admin" }> = {
  "buyer@demo.browza": { role: "buyer" },
  "admin@demo.browza": { role: "admin" },
};
// -------------------------------------------------------------------------------

type LoginResp = { userId: string; email: string; role: "buyer" | "admin" };

// Password validation helper (matches your UI checks)
function validatePassword(password: string) {
  const checks = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
  const isValid = Object.values(checks).every(Boolean);
  return { checks, isValid };
}

export default function LoginCard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const setSession = useSession((s) => s.setSession);

  const { checks, isValid } = validatePassword(password);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      setShowPasswordError(!validatePassword(value).isValid);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = identifier.trim().toLowerCase();
    const pwd = password;

    // 0) DEMO BYPASS (works when NEXT_PUBLIC_DEMO_LOGIN=true)
    if (DEMO_ENABLED && DEMO_USERS[email]) {
      if (!validatePassword(pwd).isValid) {
        setShowPasswordError(true);
        toast({
          variant: "destructive",
          title: "Invalid password",
          description: "Please meet all password requirements",
        });
        return;
      }
      const role = DEMO_USERS[email].role;
      // simple cookie + store session (matches your guard/middleware)
      document.cookie = `role=${role}; path=/; max-age=${60 * 60 * 24 * 7};`;
      setSession({ userId: "demo", email, role });
      router.replace(role === "admin" ? "/admin" : "/buyer");
      return; // no network call in demo mode
    }

    // 1) REAL VALIDATION (when demo is off)
    if (!isValid) {
      setShowPasswordError(true);
      toast({
        variant: "destructive",
        title: "Invalid password",
        description: "Please meet all password requirements",
      });
      return;
    }

    // 2) REAL API CALL (kept as fallback)
    setLoading(true);
    try {
      // If your backend expects {email, password}, send that:
      const data = await api<LoginResp>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: pwd }),
      });

      document.cookie = `role=${data.role}; path=/; max-age=${60 * 60 * 24 * 7};`;
      setSession({ userId: data.userId, email: data.email, role: data.role });
      router.replace(data.role === "admin" ? "/admin" : "/buyer");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err?.message || "Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: Brand / Benefits panel */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f3a5d] to-[#0e326c]" />
          <CardContent className="relative h-full p-8 text-indigo-50">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-400/20 ring-1 ring-white/20">
                <BrowzaLogo />
              </div>
              <div className="text-lg font-semibold tracking-tight">Browza • Buyer</div>
            </div>

            <h2 className="mt-6 text-xl font-semibold leading-snug">
              Professional web scraping platform for Indian businesses
            </h2>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-400"><CheckCircle size={20} /></span>
                <span>INR billing with GST compliance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-400"><CheckCircle size={20} /></span>
                <span>Auto-credits for service failures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-green-400"><CheckCircle size={20} /></span>
                <span>City/ISP reporting and analytics</span>
              </li>
            </ul>

            <div className="mt-8 rounded-xl bg-white/5 p-4 text-xs leading-relaxed ring-1 ring-white/15">
              We email invoices to your org contact and ensure full compliance with Indian tax regulations.
            </div>
          </CardContent>
        </div>

        {/* RIGHT: Form */}
        <CardContent className="p-8">
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-600">Enter your email or phone number to continue</p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-gray-800">Email or Phone Number</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="your@email.com or +91xxxxxxxxxx"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setShowPasswordError(true)}
                  required
                />

                {/* Password validation messages */}
                {showPasswordError && password.length > 0 && (
                  <div className="space-y-1 pt-0.5">
                    {!checks.minLength && (
                      <p className="text-sm text-red-600">Password must be at least 8 characters</p>
                    )}
                    {!checks.hasLowercase && (
                      <p className="text-sm text-red-600">Must contain at least one lowercase letter</p>
                    )}
                    {!checks.hasUppercase && (
                      <p className="text-sm text-red-600">Must contain at least one uppercase letter</p>
                    )}
                    {!checks.hasNumber && (
                      <p className="text-sm text-red-600">Must contain at least one number</p>
                    )}
                    {!checks.hasSpecialChar && (
                      <p className="text-sm text-red-600">
                        Must contain at least one special character (!@#$%^&*)
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={loading} className="mt-2 w-full bg-black hover:bg-black">
                <span className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {!loading ? "Sign in" : "Please wait…"}
                </span>
              </Button>
            </form>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
