/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/dmCq7TH/MotiV.png/**',
      },
      {
        protocol:'https',
        hostname:'img.buymeacoffee.com',
        port:'',
      },
    ],
  },
}


module.exports = nextConfig
