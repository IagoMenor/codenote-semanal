import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Esto crea un archivo físico llamado 'sqlite.db' en tu carpeta raíz
const sqlite = new Database('sqlite.db'); 
export const db = drizzle(sqlite, { schema });