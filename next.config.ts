import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Optional: Ignore only Prisma generated files if Webpack tries to process them
    config.module.rules.push({
      test: /\.js$/,
      include: [path.resolve(__dirname, "src/generated")],
      loader: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
