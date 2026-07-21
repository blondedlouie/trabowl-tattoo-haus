/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "xmpgfxelsfmijgcajqps.supabase.co" },
    ],
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/portfolio",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
