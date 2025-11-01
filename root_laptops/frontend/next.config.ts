
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone output for Netlify deployment
  // output: "standalone",
  
  images: {
    unoptimized: true, // Required for static export on Netlify
    remotePatterns: [
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.casio-vietnam.vn",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;