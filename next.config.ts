import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow static image imports and optimize images
  images: {
    // Allow images from external sources if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Optimize for deployment
    formats: ["image/avif", "image/webp"],
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
