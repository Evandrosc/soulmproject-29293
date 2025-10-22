/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BRANCH_MAIN === 'true' ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias['/assets'] = path.resolve(__dirname, 'public/assets');
    return config;
  },
};

module.exports = nextConfig;
