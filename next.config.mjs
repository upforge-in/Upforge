/** @type {import('next').NextConfig} */
const nextConfig = {
  // Invalid 'turbo' key removed from experimental to fix build warnings
  
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
        hostname: '**', // Fallback for external founder icons
      }
    ],
  },

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
