/** 정적 HTML 출력(SSG) — 서버 없이 nginx/S3/CloudFront 어디서나 서빙 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
