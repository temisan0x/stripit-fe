import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

export default function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const target = new URL(`${pathname}${search}`, BACKEND_ORIGIN);
  return NextResponse.rewrite(target);
}

export const config = {
  matcher: ["/api/:path*"],
};
