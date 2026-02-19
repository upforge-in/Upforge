/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is now stable/default in many environments; 
  // we remove the invalid 'turbo' key from experimental.
  
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

  // Security headers for high-trust data
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
