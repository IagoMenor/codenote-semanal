/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-auth", "@better-auth/kysely-adapter", "kysely"]
};

export default nextConfig;