import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static site generation (SSG) export
  output: "export",
  // Allow static image imports
  images: {
    // Disable default image optimization as next export is serverless
    unoptimized: true,
    // Allow images from external sources if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;

