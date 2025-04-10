/** @type {import('next').NextConfig} */

const env = process.env.BUILD_ENV;

const port = process.env.PORT || 3000;

const clientApi = () => {
  if (env === 'local') {
    return 'http://localhost:3000';
  } else if (env === 'development') {
    return 'https://dev-www-kr.menuboss.live';
  } else {
    return 'https://www.menuboss.kr';
  }
};

const nextConfig = {
  transpilePackages: ['@repo/ui'],
  reactStrictMode: false,
  output: env === 'development' || env === 'local' ? undefined : 'standalone',
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  compiler: {
    styledComponents: {
      // Enable display of the component name along with the generated className (needed for debugging).
      displayName: true,
      // Enable SSR support
      ssr: true,
      // Optional
      fileName: false
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-image.themenuboss.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'image.themenuboss.com',
        port: ''
      }
    ]
  }
};

module.exports = nextConfig;
