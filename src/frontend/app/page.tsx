"use client";

import { useState } from "react";
import { pingBackend } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePing() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await pingBackend();
      setResult(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">PianoScribe</h1>
      <button
        onClick={handlePing}
        disabled={loading}
        className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Pinging…" : "Ping backend"}
      </button>
      {result && <p className="text-green-600">Backend says: {result}</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </main>
  );
}
