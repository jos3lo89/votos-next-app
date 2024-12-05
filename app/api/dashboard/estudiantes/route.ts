import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalEstudiantes = await db.estudiantes.count();
    const totalVotantes = await db.estudiantes.count({
      where: { voto_emitido: true },
    });

    return NextResponse.json({
      totalEstudiantes,
      totalVotantes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener el resumen" },
      { status: 500 }
    );
  }
};
