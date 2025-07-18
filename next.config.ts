import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/apis/:path*",         // 프론트 요청
        destination: "http://localhost:8080/:path*", // 백엔드 서버로 프록시
      },
    ];
  },
};

export default nextConfig;
