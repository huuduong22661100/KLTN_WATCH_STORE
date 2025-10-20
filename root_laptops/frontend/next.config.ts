
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    
    
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "