"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Llamamos al cliente de Better-Auth para registrar al usuario en SQLite
    const { data, error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Error al registrar el usuario");
    } else {
      // Si se registra con éxito, le mandamos al login de inmediato
      router.push("/login");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a0a", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ border: "1px solid #333", padding: "40px", borderRadius: "8px", background: "#111", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#0070f3" }}>Crear Cuenta</h2>
        
        {error && <p style={{ color: "#ff4d4d", textAlign: "center", marginBottom: "15px", fontSize: "14px" }}>⚠️ {error}</p>}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontSize: "14px", color: "#aaa" }}>Nombre Completo *</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Ej. Iago Fernández"
              style={{ width: "100%", padding: "10px", borderRadius: "4px", background: "#222", color: "white", border: "1px solid #444" }} 
            />
          </div>

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
              placeholder="Mínimo 8 caracteres"
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
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p style={{ marginTop: "25px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
          ¿Ya tienes una cuenta? <Link href="/login" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "500" }}>Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}