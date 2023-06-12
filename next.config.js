/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
    API_PUBLIC: process.env.API_HOST,
    API_HOST: `${process.env.API_HOST}/api/v1`,
    JWT_SECRET: process.env.JWT_SECRET,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
