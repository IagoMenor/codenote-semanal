import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import Database from "better-sqlite3";

let db;

// Si existe la variable de entorno de Postgres (en producción/Vercel)
if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  const sql = neon(connectionString);
  db = drizzlePostgres(sql);
} else {
  // Si estamos en local, seguimos usando tu archivo SQLite de siempre
  const sqlite = new Database("local.db");
  db = drizzleSqlite(sqlite);
}

export { db };