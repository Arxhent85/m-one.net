/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure @google/model-viewer is transpiled for SSR compatibility
  transpilePackages: ['@google/model-viewer'],
  // Optional: disable image optimization if not needed
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
