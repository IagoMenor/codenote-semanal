'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NuevoProyectoPage() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [slug, setSlug] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);

    const res = await fetch('/api/proyectos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descripcion, slug }),
    });

    if (res.ok) {
      // Si todo va bien, volvemos a la lista de proyectos
      router.push('/proyectos');
      router.refresh(); // Forzamos a Next.js a pedir los datos nuevos
    } else {
      alert('Error al guardar el proyecto');
      setCargando(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-indigo-900 mb-6 text-center">Añadir Nuevo Proyecto</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug (ej: mi-nueva-web)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 font-bold"
          >
            {cargando ? 'Guardando...' : 'Guardar Proyecto'}
          </button>
        </form>

        <Link href="/proyectos" className="block text-center mt-4 text-sm text-gray-500 hover:underline">
          Cancelar y volver
        </Link>
      </div>
    </main>
  );
}