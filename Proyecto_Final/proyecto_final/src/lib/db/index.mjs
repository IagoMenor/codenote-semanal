import { drizzle as drizzlePostgres } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

let db;

// Si estamos en Vercel o tenemos la URL de Postgres configurada
if (process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.NODE_ENV === "production") {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Falta la variable de entorno de la base de datos Postgres.");
  }
  const sql = neon(connectionString);
  db = drizzlePostgres(sql);
} else {
  // En local cargamos SQLite de manera aislada sin imports conflictivos arriba
  const { drizzle: drizzleSqlite } = await import("drizzle-orm/better-sqlite3");
  const Database = (await import("better-sqlite3")).default;
  
  const sqlite = new Database("local.db");
  db = drizzleSqlite(sqlite);
}

export { db };