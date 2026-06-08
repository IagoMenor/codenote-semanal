import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";

export default async function Home({ searchParams }: { searchParams: { edit?: string } }) {
  const editId = Number((await searchParams).edit);

  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title.trim() || !content.trim()) return;
    await db.insert(posts).values({ title, content }).run();
    revalidatePath("/");
  }

  async function updatePost(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    await db.update(posts).set({ title, content }).where(eq(posts.id, id)).run();
    revalidatePath("/");
  }

  async function deletePost(id: number) {
    "use server";
    await db.delete(posts).where(eq(posts.id, id)).run();
    revalidatePath("/");
  }

  const allPosts = db.select().from(posts).all().reverse();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">Mi Blog Técnico</h1>

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
      </div>
    </main>
  );
}