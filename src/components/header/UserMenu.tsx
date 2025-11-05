"use client";

import { logout } from "@/lib/logout";
import { useSession } from "@/stores/useSession";

export default function UserMenu() {
// Read email from the session object; fallback to empty string
  const email = useSession((s) => s.session?.email ?? "");

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">
        Signed in as <strong>{email ?? "—"}</strong>
      </span>
      <button
        onClick={logout}
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Logout
      </button>
    </div>
  );
}
