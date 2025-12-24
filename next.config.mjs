/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Images (safe default)
  images: {
    unoptimized: true,
  },

  // ESLint build ko block na kare
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
