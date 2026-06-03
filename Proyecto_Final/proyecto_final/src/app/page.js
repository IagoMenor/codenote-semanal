import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  // Verificamos la sesión en el servidor
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si no hay sesión, protegemos la ruta mandándolo a login
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      minHeight: "100vh", 
      background: "#0a0a0a", 
      padding: "40px 20px"
    }}>
      {/* Renderizamos el componente interactivo pasándole el usuario actual */}
      <Dashboard user={session.user} />
    </div>
  );
}