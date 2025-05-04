import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [new URL('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/**')],
    },
};

export default nextConfig;
