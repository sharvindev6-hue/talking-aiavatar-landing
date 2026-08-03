/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel-friendly: allow large video assets in /public to stream efficiently
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // R3F + three must run client-side only; Next handles this via 'use client' boundaries.
  transpilePackages: ['three'],
};

export default nextConfig;
