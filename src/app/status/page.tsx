// src/app/status/page.tsx
"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { statusApi } from "@/lib/api";
import { getAuthToken, clearAuthToken } from "@/lib/auth";

interface StatusData {
  ok: boolean;
  ts: string;
}

const Status = () => {
  const router = useRouter();
  const token = getAuthToken();

  // Protect the route
  useEffect(() => {
    if (!token) {
      toast.error("Please log in to continue");
      router.push("/login");
    }
  }, [token, router]);

  // Your existing status query
  const { data, isLoading, isError } = useQuery<StatusData | null>({
    queryKey: ["status"],
    queryFn: async (): Promise<StatusData | null> => {
      const res = await statusApi();
      return res ?? null;
    },
    enabled: !!token, // Only run query if authenticated
  });

  const handleLogout = () => {
    clearAuthToken();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Don't render if not authenticated
  if (!token) return null;

  const isMock = token.startsWith("MOCK_TOKEN_");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header with Logout */}
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Status Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mock Warning */}
          {isMock && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Mock Authentication Active
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    API is unavailable. Using mock token for testing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Authentication Status */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Authentication Status
            </h2>
            <p className="text-sm text-green-600 font-medium">✓ Authenticated</p>
          </div>

          {/* API Status Data */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              API Status
            </h2>
            {isLoading && (
              <div className="text-sm text-gray-500">Loading status...</div>
            )}
            {isError && (
              <div className="text-sm text-red-600">Failed to fetch status.</div>
            )}
            {data ? (
              <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <pre className="text-xs text-gray-700 overflow-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ) : (
              !isLoading &&
              !isError && (
                <div className="text-sm text-gray-500">
                  No status data available
                </div>
              )
            )}
          </div>

          {/* Token Preview */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs font-mono text-gray-500 mb-1">
              Token (preview):
            </p>
            <code className="text-xs text-gray-700 break-all">
              {token.substring(0, 40)}...
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
