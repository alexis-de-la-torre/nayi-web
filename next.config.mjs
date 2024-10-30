/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {hostname: 'www.inmeza.com'}
    ]
  },
};

export default nextConfig;
