"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/apiClient";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/app/Header";

type StatusResp = { ok: boolean; env?: string };

export default function Page() {
  const [data, setData] = useState<StatusResp | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await api<StatusResp>("/status");
        setData(res);
      } catch (err: any) {
        toast({ variant: "destructive", title: "Status check failed", description: err?.message || "Try later" });
      }
    })();
  }, [toast]);

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-xl font-semibold">Service Status</h1>
        <pre className="rounded-lg bg-white p-4 text-gray-900 shadow-sm">{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
}
