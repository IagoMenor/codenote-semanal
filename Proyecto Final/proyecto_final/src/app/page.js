import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // Comprobamos si hay una sesión activa en el servidor
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si el usuario NO está logueado, lo mandamos al login automáticamente
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "#0a0a0a", 
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <div style={{ 
        border: "1px solid #333", 
        padding: "40px", 
        borderRadius: "8px", 
        background: "#111", 
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <h1 style={{ marginBottom: "10px", color: "#0070f3" }}>
          ¡Bienvenido al Panel de Control!
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Hola de nuevo, <strong>{session.user.name}</strong> 👋
        </p>
        <div style={{ 
          background: "#222", 
          padding: "15px", 
          borderRadius: "4px", 
          textAlign: "left",
          fontSize: "14px",
          color: "#ccc"
        }}>
          <p style={{ margin: "5px 0" }}><strong>ID de Usuario:</strong> {session.user.id}</p>
          <p style={{ margin: "5px 0" }}><strong>Email asociado:</strong> {session.user.email}</p>
        </div>
      </div>
    </div>
  );
}