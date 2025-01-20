import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    domains: [
      "picsum.photos",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
