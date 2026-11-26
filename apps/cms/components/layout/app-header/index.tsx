"use client";

import { useState } from "react";

export function AppHeader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Logout gagal.");
      }

      window.location.href = "/login";
    } catch {
      setError("Logout gagal. Silakan coba lagi.");
      setLoading(false);
    }
  }

  return (
    <header className="bg-background flex h-16 items-center justify-between border-b px-6">
      <div>Dashboard</div>

      <div className="flex items-center gap-3">
        {error && (
          <span className="text-destructive text-sm" role="alert">
            {error}
          </span>
        )}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="text-muted-foreground hover:text-foreground text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Signing out..." : "Log out"}
        </button>
      </div>
    </header>
  );
}
