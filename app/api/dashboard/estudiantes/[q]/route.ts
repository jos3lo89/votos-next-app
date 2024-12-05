import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    const estudiantes = query
      ? await db.estudiantes.findMany({
          where: {
            apellido_nombre: {
              contains: query,
              mode: "insensitive",
            },
            voto_emitido: true,
          },
          orderBy: { created_at: "desc" },
        })
      : await db.estudiantes.findMany({
          where: { voto_emitido: true },
          take: 10,
          orderBy: { created_at: "desc" },
        });

    return NextResponse.json(estudiantes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener estudiantes" },
      { status: 500 }
    );
  }
};
