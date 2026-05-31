/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {}, // Dejar esto vacío o configurarlo desactiva el comportamiento por defecto que da error
    }
  },
  // Esto fuerza a que las dependencias conflictivas se procesen por fuera del empaquetador rápido
  serverExternalPackages: ["better-auth", "@better-auth/kysely-adapter", "kysely"]
};

export default nextConfig;