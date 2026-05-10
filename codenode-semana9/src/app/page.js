import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 max-w-lg text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          ¡Hola, soy Iago!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Bienvenido a mi plataforma segura. Para gestionar los proyectos y ver el contenido de WordPress, por favor accede a tu cuenta.
        </p>

        {/* Botones de acción principales */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all"
          >
            Crear Cuenta
          </Link>
        </div>
        
        <p className="mt-8 text-xs text-gray-400">
          Protección de datos mediante Better-Auth y SQLite.
        </p>
      </div>
    </main>
  );
}