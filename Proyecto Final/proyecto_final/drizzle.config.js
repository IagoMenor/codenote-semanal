import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Dónde leeremos las tablas que vamos a crear
schema: "./src/lib/db/schema.mjs",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./local.db",
  },
});