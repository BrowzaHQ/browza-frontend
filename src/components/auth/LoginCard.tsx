"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "@/stores/useSession";

type LoginResp = { userId: string; email: string; role: "buyer" | "admin" };

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const setSession = useSession((s) => s.setSession);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Call your backend
      const data = await api<LoginResp>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // For MVP: set a readable cookie so middleware can redirect.
      document.cookie = `role=${data.role}; path=/; max-age=${remember ? 60 * 60 * 24 * 7 : 60 * 60};`;

      setSession({ userId: data.userId, email: data.email, role: data.role });
      router.replace(data.role === "admin" ? "/admin" : "/buyer");
    } catch (err: any) {
      toast({ variant: "destructive", title: "Login failed", description: err?.message || "Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md bg-white text-gray-900">
      <CardHeader>
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wide text-gray-500">This week at Browza</div>
          <h1 className="text-2xl font-bold">Sign in to Browza</h1>
          <p className="text-sm text-gray-600">Admin & Buyer portals</p>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <Checkbox checked={remember} onChange={(e) => setRemember((e.target as HTMLInputElement).checked)} />
              Remember me
            </label>
            <a className="text-sm text-blue-600 hover:underline" href="/forgot-password">Forgot password?</a>
          </div>
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Signing in…" : "Sign in"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
