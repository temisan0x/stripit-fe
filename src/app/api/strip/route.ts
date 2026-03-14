import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_BASE;
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename");

  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  try {
    const response = await fetch(
      `${API_BASE}/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename || "stripped-file")}`,
      { headers: { "x-api-key": API_KEY || "" } }
    );

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename || "stripped-file"}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Download failed" }, { status: 502 });
  }
}