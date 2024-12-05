import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// partidps mas su cantiodad de votos
export const GET = async () => {
  try {
    const partidos = await db.partidos.findMany({
      include: {
        votos: true,
      },
    });


    // const votosNulos = await db.votos.count({
    //   where: { voto_nulo: true },
    // });

    const data = partidos.map((partido) => ({
      id: partido.id,
      nombre: partido.nombre,
      votos: partido.votos.length,
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro al obtener los partidos" },
      { status: 500 }
    );
  }
};
