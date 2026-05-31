"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Llamamos al cliente de Better-Auth para iniciar sesión
    const { data, error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Credenciales incorrectas");
    } else {
      // Si entra correctamente, lo mandamos a la página principal
      router.push("/");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label>
          Correo Electrónico:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px", color: "#000" }} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px", color: "#000" }} />
        </label>
        <button type="submit" disabled={loading} style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Entrando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}