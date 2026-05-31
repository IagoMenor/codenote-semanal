import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // Tu conexión a base de datos
import * as schema from "./db/schema"; // Importamos todo el esquema (tablas)

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: schema // 👈 ¡Aquí le decimos a Better-Auth exactamente cuáles son tus tablas!
    }),
    emailAndPassword: {
        enabled: true // Habilita el registro con correo tradicional
    }
});