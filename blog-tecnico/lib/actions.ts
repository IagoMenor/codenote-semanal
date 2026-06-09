"use server";

import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createPost(formData: FormData) {
    "use server";
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
 if (!title.trim() || !content.trim()) return; // Simplificamos el retorno

  await db.insert(posts).values({ title, content }).run();
  revalidatePath("/");
}

export async function updatePost(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  await db.update(posts).set({ title, content }).where(eq(posts.id, id)).run();
  revalidatePath("/");
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id)).run();
  revalidatePath("/");
}