import Link from 'next/link';

async function getProyectos() {
try {
    // Intentamos pedir los datos a WordPress
    const res = await fetch('http://localhost/practicas-wordpress/wp-json/wp/v2/proyecto', {
    cache: 'no-store' 
    });

    if (!res.ok) {
    return null;
    }

    return await res.json();
} catch (error) {
    // Si XAMPP está apagado, devolvemos null
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
        Mis Proyectos de WordPress
    </h1>

    {!proyectos || proyectos.length === 0 ? (
        <div className="max-w-md mx-auto bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded shadow-md">
        <p className="text-yellow-800 font-bold">Aviso del sistema:</p>
        <p className="text-yellow-700">
            No se han podido cargar los proyectos. Revisa que XAMPP esté encendido.
        </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {proyectos.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
              {/* Seguridad en el título */}
            <h2 
                className="text-xl font-bold mb-3 text-gray-800" 
                dangerouslySetInnerHTML={{ __html: p.title?.rendered || "Proyecto sin título" }} 
            />
            
              {/* SEGURIDAD AQUÍ: Si no hay excerpt, ponemos un texto por defecto */}
            <div 
                className="text-gray-600 text-sm mb-6 flex-grow" 
                dangerouslySetInnerHTML={{ 
                __html: p.excerpt?.rendered || "<p>Haz clic en el enlace para ver los detalles de este proyecto.</p>" 
                }} 
            />

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