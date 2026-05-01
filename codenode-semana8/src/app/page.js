import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
          ¡Hola, soy Iago!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Bienvenido a mi nuevo proyecto en Next.js. Esta es la página principal donde 
          puedes navegar hacia mis proyectos traídos desde WordPress.
        </p>
        
        <Link 
          href="/proyectos" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          Ver mis Proyectos →
        </Link>
      </div>
    </main>
  );
}