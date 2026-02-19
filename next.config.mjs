/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack optimization for premium transitions and Tailwind v4
  experimental: {
    turbo: {
      rules: {
        '*.css': ['postcss-loader'],
      },
    },
  },
  
  // High-performance image handling for startup logos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vunvjscphatofvsqvofg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**', // General fallback for external founder icons
      }
    ],
  },

  // Ensure high-trust data headers are present
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
