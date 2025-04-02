import type { NextConfig } from "next";

const repoName = "solitaire"; // 🔁 change this to your repo name
const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
