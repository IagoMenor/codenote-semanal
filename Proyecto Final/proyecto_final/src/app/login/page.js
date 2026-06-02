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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a0a", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ border: "1px solid #333", padding: "40px", borderRadius: "8px", background: "#111", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#0070f3" }}>Iniciar Sesión</h2>
        
        {error && <p style={{ color: "#ff4d4d", textAlign: "center", marginBottom: "15px", fontSize: "14px" }}>⚠️ {error}</p>}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "14px", color: "#aaa" }}>Correo Electrónico *</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="tu@correo.com"
              style={{ width: "100%", padding: "10px", borderRadius: "4px", background: "#222", color: "white", border: "1px solid #444" }} 
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "14px", color: "#aaa" }}>Contraseña *</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              style={{ width: "100%", padding: "10px", borderRadius: "4px", background: "#222", color: "white", border: "1px solid #444" }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: "#0070f3", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              cursor: loading ? "not-allowed" : "pointer", 
              fontSize: "16px", 
              fontWeight: "bold",
              marginTop: "10px",
              transition: "background 0.2s"
            }}
          >
            {loading ? "Verificando..." : "Entrar al Panel"}
          </button>
        </form>

        <p style={{ marginTop: "25px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
          ¿No tienes cuenta? <Link href="/register" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "500" }}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}