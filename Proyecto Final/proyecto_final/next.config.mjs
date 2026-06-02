/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-auth", "@better-auth/kysely-adapter", "kysely", "better-sqlite3"],
  // Le damos a Turbopack el objeto vacío que nos pide para silenciar el error
  experimental: {
    turbopack: {}
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("better-sqlite3");
    }
    return config;
  },
};

export default nextConfig;