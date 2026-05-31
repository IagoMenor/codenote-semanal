import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// Importamos la conexión física desde el index.js que sí tienes creado
import { db } from "./db/index"; 

export const auth = betterAuth({
    // Le decimos a Better-Auth que use nuestro SQLite mediante Drizzle
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    // Activamos el inicio de sesión clásico con Email y Contraseña
    emailAndPassword: {
        enabled: true,
    },
});