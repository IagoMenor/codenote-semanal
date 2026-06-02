import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

let db;

// Si existe la variable de entorno de Postgres (Producción / Vercel)
if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  const sql = neon(connectionString);
  db = drizzlePostgres(sql);
} else {
  // En local, forzamos la importación dinámica para que no salte en la nube
  const Database = require("better-sqlite3");
  const sqlite = new Database("local.db");
  db = drizzleSqlite(sqlite);
}

export { db };