/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cue/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
