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

<Link
  href="/status"
  className="inline-block rounded-full px-6 py-3 font-medium bg-blue-600 text-white hover:bg-blue-700 mt-8"
>
  Check Status
</Link>

      <p className="mt-6 text-sm">
        Back to{" "}
        <NextLink href="/" className="underline">
          home
        </NextLink>
      </p>
    </div>
  );
}
