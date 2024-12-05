import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// votos totales  y vtos nulos
export const GET = async () => {
  try {
    const votos = await db.votos.groupBy({
      by: ["id_partido"],
      _count: { id: true },
      where: { voto_nulo: false },
    });

    const votosNulos = await db.votos.count({
      where: { voto_nulo: true },
    });

    const data = {
      votosPorPartido: votos,
      votosNulos,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener los votos nulos" },
      { status: 500 }
    );
  }
};
