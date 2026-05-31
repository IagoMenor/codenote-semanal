"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(false);

    await authClient.signIn.email({
      email: email,
      password: password,
      callbackURL: "/" // Al loguearse con éxito, volverá a la Home
    }, {
      onRequest: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        router.push("/");
        router.refresh();
      },
      onError: (ctx) => {
        setLoading(false);
        setError(ctx.error.message || "Credenciales incorrectas");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a0a", color: "white" }}>
      <div style={{ border: "1px solid #333", padding: "40px", borderRadius: "8px", background: "#111", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Iniciar Sesión</h2>
        
        {error && <p style={{ color: "#ff4d4d", textAlign: "center", marginBottom: "15px" }}>{error}</p>}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            Correo Electrónico:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "4px", background: "white", color: "#333", border: "1px solid #ccc" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "4px", background: "white", color: "#333", border: "1px solid #ccc" }} />
          </label>

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
            {loading ? "Verificando..." : "Entrar al Panel"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", color: "#888", fontSize: "14px" }}>
          ¿No tienes cuenta? <Link href="/register" style={{ color: "#0070f3", textDecoration: "none" }}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}