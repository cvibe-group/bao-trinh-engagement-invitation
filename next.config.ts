import type { NextConfig } from "next";

// Vercel injects a build adapter that conflicts with standalone on Next 16.3.
const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
};

export default nextConfig;
