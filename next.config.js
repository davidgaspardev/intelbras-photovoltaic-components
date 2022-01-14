/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/projeto/:path*",
      destination: "/api/:path*"
    }
  ]
}

module.exports = nextConfig
