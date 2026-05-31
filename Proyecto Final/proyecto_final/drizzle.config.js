import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Dónde leeremos las tablas que vamos a crear
  schema: "./src/lib/db/schema.js",
  // Dónde se guardarán las carpetas de migraciones automáticas
  out: "./drizzle",
  // El motor que usamos (sqlite)
  dialect: "sqlite",
  dbCredentials: {
    // Leemos la ruta desde el archivo .env que acabas de crear
    url: process.env.DATABASE_URL || "file:local.db",
  },
});