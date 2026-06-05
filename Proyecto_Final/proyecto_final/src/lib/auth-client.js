import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "https://codenote-semanal-vlqj.vercel.app"
});