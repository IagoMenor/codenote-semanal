import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.ts", // Asegúrate de que esta ruta apunta a tu archivo de esquema (puede ser ./lib/schema.ts o ./app/lib/schema.ts)
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});