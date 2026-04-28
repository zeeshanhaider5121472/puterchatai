import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js not to try and bundle the Node.js 'canvas' package during SSR
  serverExternalPackages: ["canvas"],
};

export default nextConfig;