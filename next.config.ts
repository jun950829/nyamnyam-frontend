import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Next.js에서 API 요청을 가로채서 백엔드로 전달
        destination: "https://nyamnyam.laterre.dev/api/:path*", // 실제 백엔드 주소
      },
    ];
  },
};

export default nextConfig;
