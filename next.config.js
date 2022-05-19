/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'] // TEMP
  }
}

module.exports = nextConfig
