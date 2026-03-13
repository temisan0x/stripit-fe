import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async rewrites() {
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";
    return [
      {
        source: "/api/:path*",
        destination: `${base}/:path*`,
      },
      {
        source: "/socket.io/:path*",
        destination: `${base}/socket.io/:path*`,
      },
    ];
  },
};

export default nextConfig;
