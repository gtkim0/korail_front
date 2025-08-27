import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: "http://10.141.10.209:8080/:path*", // 백엔드 서버로 프록시
        // destination: "http://10.141.10.200:8080/:path*", // 백엔드 서버로 프록시
      },
    ];
  },
  // @TODO 개발어느정도 완료된 이후 제거
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
