import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'img.clerk.com',
        protocol: 'https',
      },
      {
        hostname: 'ucarecdn.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;