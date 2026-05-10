import { db } from '@/lib/db';
import { proyectosTable } from '@/lib/schema';
import { NextResponse } from 'next/server';

// Endpoint GET: Leer proyectos
export async function GET() {
  try {
    const proyectos = await db.select().from(proyectosTable);
    return NextResponse.json(proyectos);
  } catch (error) {
    return NextResponse.json({ error: "Error al leer" }, { status: 500 });
  }
}

// Endpoint POST: Crear un nuevo proyecto
export async function POST(request) {
  try {
    const body = await request.json();
    const { titulo, descripcion, slug } = body;

    // Validación básica
    if (!titulo || !descripcion || !slug) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const nuevo = await db.insert(proyectosTable).values({
      titulo,
      descripcion,
      slug
    }).returning(); // .returning() nos devuelve el objeto recién creado

    return NextResponse.json(nuevo[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}