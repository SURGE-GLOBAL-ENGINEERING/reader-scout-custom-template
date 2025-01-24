/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: "standalone",

  // Strict mode helps catch bugs early
  reactStrictMode: true,

  // Improve static file serving
  poweredByHeader: false,

  // Image optimization configuration
  images: {
    domains: [], // Add domains for external images if needed
    formats: ["image/avif", "image/webp"],
  },

  // TypeScript/ESLint error handling during builds
  typescript: {
    // Handled by separate command in package.json
    ignoreBuildErrors: false,
  },

  eslint: {
    // Handled by separate command in package.json
    ignoreDuringBuilds: false,
  },

  // Font optimization configuration
  optimizeFonts: true,

  // Experimental features
  experimental: {
    // Enable modern optimizations
    optimizeCss: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
