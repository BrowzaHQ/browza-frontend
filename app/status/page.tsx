// app/status/page.tsx

import type { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Status · Browza",
  description: "Browza status page",
};

export default function StatusPage() {
  const items = [
    { label: "API", status: "ok" },
    { label: "Frontend", status: "ok" },
  ];

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Status</h1>

      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li
            key={i.label}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <span>{i.label}</span>
            <span className="text-sm">{i.status}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm">
        Back to{" "}
        <NextLink href="/" className="underline">
          home
        </NextLink>
      </p>
    </div>
  );
}
