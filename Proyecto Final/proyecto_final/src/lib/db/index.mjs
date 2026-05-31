import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Creamos el cliente físico que leerá nuestro archivo local.db configurado en el .env
const client = createClient({
  url: process.env.DATABASE_URL || "file:local.db",
});

// Inicializamos Drizzle pasándole el cliente de SQLite
export const db = drizzle(client);