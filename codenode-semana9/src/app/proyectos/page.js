import Link from 'next/link';

// Función para obtener los proyectos de TU PROPIA API
async function getProyectos() {
  try {
    // Ahora llamamos a nuestra ruta interna /api/proyectos
    const res = await fetch('http://localhost:3000/api/proyectos', {
      cache: 'no-store' 
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error al conectar con la API interna:", error);
    return null;
  }
}

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <nav className="mb-10 flex justify-center gap-4">
        <Link href="/" className="text-indigo-600 hover:underline">← Volver al Inicio</Link>
      </nav>

      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">
        Mis Proyectos (Desde SQLite)
      </h1>

<div className="text-center mb-8">
  <Link 
    href="/proyectos/nuevo" 
    className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition-colors"
  >
    + Añadir Nuevo Proyecto
  </Link>
</div>

      {/* Si no hay proyectos o la API falla */}
      {!proyectos || proyectos.length === 0 ? (
        <div className="max-w-md mx-auto bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded shadow-md text-center">
          <p className="text-yellow-800 font-bold">No hay proyectos todavía.</p>
          <p className="text-yellow-700">Usa Drizzle Studio o el futuro formulario para añadir uno.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Aquí es donde estaba el .map que buscábamos */}
          {proyectos.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                {p.titulo}
              </h2>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {p.descripcion}
              </p>

              <Link 
                href={`/proyectos/${p.slug}`}
                className="text-indigo-500 font-bold hover:text-indigo-700 transition-colors"
              >
                Ver más detalles →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}