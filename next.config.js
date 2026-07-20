/** @type {import('next').NextConfig} */
const nextConfig = { 
  experimental: { optimizePackageImports: ['lucide-react'] },
  webpack: (config) => { config.resolve.alias['@'] = __dirname; return config; }
};
module.exports = nextConfig;
