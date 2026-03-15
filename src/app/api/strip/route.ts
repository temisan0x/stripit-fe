import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;
const API_KEY = process.env.API_KEY;

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const isFormData = contentType.includes("multipart/form-data");
  const endpoint = isFormData ? "/uploads" : "/strip-url";

  const body = isFormData ? await req.formData() : await req.json();
  const headers: HeadersInit = { "x-api-key": API_KEY || "" };
  if (!isFormData) headers["Content-Type"] = "application/json";

console.log("Forwarding to:", `${API_BASE}${endpoint}`);
console.log("API_KEY being sent:", API_KEY);
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers,
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    });

    const contentTypeRes = response.headers.get("content-type") || "";
    if (!contentTypeRes.includes("application/json")) {
      return NextResponse.json(
        { error: "Server unreachable" },
        { status: 502 },
      );
    }

    const data = await response.json();
    if (!response.ok)
      return NextResponse.json(data, { status: response.status });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to reach server" },
      { status: 502 },
    );
  }
}
