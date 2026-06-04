import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./auth-schema.ts",
  out: "./drizzle",
  // Cambiado a DATABASE_URL
  dialect: process.env.DATABASE_URL ? "postgresql" : "sqlite",
  dbCredentials: {
    // Cambiado a DATABASE_URL
    url: process.env.DATABASE_URL || "./local.db",
  },
});