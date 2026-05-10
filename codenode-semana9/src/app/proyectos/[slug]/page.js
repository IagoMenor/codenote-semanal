import Link from 'next/link';

// Función para obtener un solo proyecto por su slug
async function getProyecto(slug) {
try {
    const res = await fetch(`http://localhost/practicas-wordpress/wp-json/wp/v2/proyecto?slug=${slug}`, {
    cache: 'no-store'
    });
    const data = await res.json();
    return data[0]; // La API devuelve un array, cogemos el primer elemento
} catch (error) {
    return null;
}
}

export default async function ProyectoDetalle({ params }) {
  // En Next.js, los parámetros de la URL vienen en una promesa
const { slug } = await params;
const proyecto = await getProyecto(slug);

if (!proyecto) {
    return (
    <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-red-600">Proyecto no encontrado</h1>
        <Link href="/proyectos" className="text-indigo-600 underline">Volver al listado</Link>
    </div>
    );
}

return (
    <main className="min-h-screen bg-white p-10">
    <div className="max-w-4xl mx-auto">
        <Link href="/proyectos" className="text-indigo-600 hover:underline mb-8 inline-block">
        ← Volver al listado
        </Link>
        
        <h1 
        className="text-5xl font-extrabold text-indigo-900 mb-6" 
        dangerouslySetInnerHTML={{ __html: proyecto.title?.rendered }} 
        />

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-xl">
            <p className="text-sm font-bold text-indigo-700 uppercase tracking-widest">Descripción del Proyecto</p>
            <div 
            className="text-gray-800 text-lg leading-relaxed mt-2"
            dangerouslySetInnerHTML={{ __html: proyecto.content?.rendered }} 
            />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
                Proyecto publicado vía WordPress API • Slug: {slug}
            </p>
        </div>
    </div>
    </main>
);
}