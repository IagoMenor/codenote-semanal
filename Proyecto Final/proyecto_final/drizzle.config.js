import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.mjs",
  out: "./drizzle",
  // Si hay una url de Postgres usa postgresql, si no, usa sqlite
  dialect: process.env.POSTGRES_URL ? "postgresql" : "sqlite",
  dbCredentials: {
    url: process.env.POSTGRES_URL || "./local.db",
  },
});