
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['lridcsbwttwnwzyqzzde.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/link/:slug',
        destination: '/fanlink/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
