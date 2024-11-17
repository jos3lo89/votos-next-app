import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ codigo: string }> }
) => {
  try {
    const { codigo } = await params;

    const estudiante = await db.estudiantes.findUnique({
      where: {
        codigo,
      },
    });

    if (!estudiante) {
      return NextResponse.json(
        { message: "Estudiante no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(estudiante);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al buscar el estudiante" },
      { status: 500 }
    );
  }
};
