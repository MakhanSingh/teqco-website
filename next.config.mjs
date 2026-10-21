/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site is plain HTML/CSS/JS after `next build` (in ./out),
  // so it deploys to Vercel and to the Cloudways PHP stack alike.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
