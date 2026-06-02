import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db/index.mjs";
import { projects } from "@/lib/db/schema.mjs";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

// 1. OBTENER LOS PROYECTOS DEL USUARIO LOGUEADO
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si no hay sesión iniciada, bloqueamos el acceso
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // Buscamos en la base de datos únicamente los proyectos del usuario actual
    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, session.user.id));

    return NextResponse.json(userProjects);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener proyectos" }, { status: 500 });
  }
}

// 2. CREAR Y GUARDAR UN NUEVO PROYECTO
export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { title, description, url } = await req.json();

    // Validaciones básicas requeridas por el esquema
    if (!title || !description) {
      return NextResponse.json(
        { error: "El título y la descripción son obligatorios" }, 
        { status: 400 }
      );
    }

    // Estructuramos el nuevo registro
    const newProject = {
      id: crypto.randomUUID(), // Genera un ID único en formato texto
      title,
      description,
      url: url || null,
      userId: session.user.id, // Lo vinculamos al ID del usuario logueado
      createdAt: new Date(),
    };

    // Lo insertamos físicamente en la tabla 'projects' de local.db
    await db.insert(projects).values(newProject);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error en API POST:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// 3. ELIMINAR UN PROYECTO EXISTENTE (Añadido con éxito)
export async function DELETE(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "El ID del proyecto es obligatorio" }, { status: 400 });
    }

    // Borramos asegurando que el proyecto pertenece al usuario logueado usando un operador lógico 'and'
    await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, id),
          eq(projects.userId, session.user.id)
        )
      );

    return NextResponse.json({ success: true, message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("Error en API DELETE:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}