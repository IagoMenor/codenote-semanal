import { auth } from "../../lib/auth"; // Ruta directa para evitar fallos
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Link from "next/link"; // Importamos Link para la navegación

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Si no hay sesión, protegemos la ruta mandándolo al login
    if (!session) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                {/* Cabecera con saludo dinámico */}
                <h1 className="text-4xl font-black text-gray-800">
                    Bienvenido, <span className="text-indigo-600">{session.user.name}</span>! 👋
                </h1>
                
                <p className="text-gray-500 mt-4 text-lg">
                    Has iniciado sesión correctamente con el correo: <br/>
                    <span className="font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded text-sm">
                        {session.user.email}
                    </span>
                </p>

                {/* --- NUEVA SECCIÓN DE ACCESO A PROYECTOS --- */}
                <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <h2 className="text-lg font-bold text-indigo-900 mb-2">
                        Panel de Control
                    </h2>
                    <p className="text-indigo-700 mb-6 text-sm">
                        Ahora puedes acceder a la lista de proyectos importados de WordPress y gestionarlos de forma segura.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        <Link 
                            href="/proyectos" 
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                        >
                            Ver mis Proyectos →
                        </Link>
                        
                        <Link 
                            href="/proyectos/nuevo" 
                            className="bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all"
                        >
                            Añadir Nuevo
                        </Link>
                    </div>
                </div>
                {/* ------------------------------------------- */}

                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 italic">Sesión activa protegida</span>
                    <LogoutButton />
                </div>
            </div>
        </main>
    );
}