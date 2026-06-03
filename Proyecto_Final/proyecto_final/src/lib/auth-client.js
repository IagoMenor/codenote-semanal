import { createAuthClient } from "better-auth/react";

// Inicializamos el cliente apuntando a la URL de nuestro proyecto
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL 
});