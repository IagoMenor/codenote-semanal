/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-auth", "@better-auth/kysely-adapter", "kysely", "better-sqlite3"],
  webpack: (config, { isServer }) => {
    // Si estamos en el servidor, le decimos a Webpack que ignore por completo el compilador nativo de SQLite
    if (isServer) {
      config.externals.push("better-sqlite3");
    }
    return config;
  },
};

export default nextConfig;