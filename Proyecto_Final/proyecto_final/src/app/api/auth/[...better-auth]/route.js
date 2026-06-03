import { auth } from "@/lib/auth";

// Exponemos los métodos GET y POST que usará el cliente de autenticación
export const GET = auth.handler;
export const POST = auth.handler;