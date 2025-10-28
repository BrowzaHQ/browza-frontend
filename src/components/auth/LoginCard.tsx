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

// Optional (icons). If you didn't add the package, comment these and the <CheckCircle/> usage below.
let CheckCircle: any = (props: any) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
try { CheckCircle = require("lucide-react").CheckCircle; } catch {}

type LoginResp = { userId: string; email: string; role: "buyer" | "admin" };

export default function LoginCard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const setSession = useSession((s) => s.setSession);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api<LoginResp>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      });
      // simple helper cookie so middleware can redirect
      document.cookie = `role=${data.role}; path=/; max-age=${60 * 60 * 24 * 7};`;
      setSession({ userId: data.userId, email: data.email, role: data.role });
      router.replace(data.role === "admin" ? "/admin" : "/buyer");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Login failed", description: err?.message || "Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: Brand / Benefits panel */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-800 to-blue-600" />
          <CardContent className="relative h-full p-8 text-indigo-50">
            <div className="flex items-center gap-3">
              {/* Simple round logo mark */}
              <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-400/20 ring-1 ring-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5c3.866 0 7 3.134 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 8c2.209 0 4 1.791 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
                </svg>
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="mt-2 w-full">
                {!loading ? "Send OTP" : "Please wait…"}
              </Button>
            </form>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
