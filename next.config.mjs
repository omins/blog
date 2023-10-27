import withPlaiceholder from "@plaiceholder/next";
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 768, 828],
    minimumCacheTTL: 604800,
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["contentlayer", "@contentlayer/client"],
};

export default withContentlayer(withPlaiceholder(nextConfig));
