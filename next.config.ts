import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
  // Ensure consistent rendering between server and client
  experimental: {
    // This is experimental but helps with the hydration issues
    optimizeCss: true,
  },
};

export default nextConfig;
