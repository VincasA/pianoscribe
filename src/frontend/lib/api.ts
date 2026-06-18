const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function pingBackend(): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/ping`, { method: "POST" });
  if (!res.ok) throw new Error(`Backend returned ${res.status}`);
  return res.json();
}

export async function checkHealth(): Promise<{ status: string }> {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error(`Backend returned ${res.status}`);
  return res.json();
}
