import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;

export async function GET() {
  if (!API_BASE) {
    return NextResponse.json(
      { error: "API_BASE is not set on the server." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: "GET",
      cache: "no-store",
    });
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    const rawBody = await response.text();
    return NextResponse.json(
      {
        status: response.ok ? "ok" : "error",
        upstreamStatus: response.status,
        upstreamBody: rawBody,
      },
      { status: response.status },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to reach server";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
