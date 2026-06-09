import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { createPost, updatePost, deletePost } from "@/lib/actions";
import ReactMarkdown from "react-markdown";
import DevToArticles from "../components/DevToArticles";

export default async function Home({ searchParams }: { searchParams: { edit?: string, query?: string } }) {
  const params = await searchParams;
  const editId = Number(params.edit);
  const query = params.query || "";

  // Obtenemos todos los posts y filtramos en memoria (compatible con cualquier base de datos)
  const allPosts = db.select().from(posts).all().reverse().filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">Mi Blog Técnico</h1>

        {/* Buscador: Al escribir y dar a Enter, recarga la página con el query en la URL */}
        <form className="mb-8">
          <input 
            name="query" 
            placeholder="Buscar por título..." 
            defaultValue={query}
            className="w-full p-4 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        <form action={createPost} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10">
          <input name="title" placeholder="Título" className="w-full p-3 mb-3 border border-gray-300 rounded" required />
          <textarea name="content" placeholder="Contenido (Markdown)..." className="w-full p-3 mb-3 border border-gray-300 rounded h-32" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">Publicar</button>
        </form>

        <div className="grid gap-8">
          {allPosts.map((post) => (
            <article key={post.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              {editId === post.id ? (
                <form action={updatePost} className="flex flex-col gap-3">
                  <input type="hidden" name="id" value={post.id} />
                  <input name="title" defaultValue={post.title} className="w-full p-2 border rounded" />
                  <textarea name="content" defaultValue={post.content} className="w-full p-2 border rounded h-32" />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
                    <a href="/" className="bg-gray-200 px-4 py-2 rounded">Cancelar</a>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
                    <span className="text-xs text-gray-400 font-medium">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </div>
                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                    <a href={`/?edit=${post.id}`} className="text-sm text-blue-600 font-semibold hover:text-blue-800">Editar</a>
                    <form action={deletePost.bind(null, post.id)}>
                      <button type="submit" className="text-sm text-red-600 font-semibold hover:text-red-800">Eliminar</button>
                    </form>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>

        {/* Componente de la API externa añadido aquí */}
        <DevToArticles />

      </div>
    </main>
  );
}