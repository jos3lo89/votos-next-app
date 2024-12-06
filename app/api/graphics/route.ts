import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const totalVotes = await db.votos.count();

    if (totalVotes === 0) {
      return { error: "No hay votos registrados." };
    }

    const nullVotesCount = await db.votos.count({
      where: {
        voto_nulo: true,
      },
    });

    const votesByParty = await db.votos.groupBy({
      by: ["id_partido"],
      _count: {
        id: true,
      },
    });

    const parties = await db.partidos.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });

    const partyVotes = votesByParty.map((partyVote) => {
      const partido = parties.find((p) => p.id === partyVote.id_partido);
      return {
        partido: partido?.nombre || "Partido desconocido",
        votos: partyVote._count.id,
      };
    });

    const nullVotesPercentage = ((nullVotesCount / totalVotes) * 100).toFixed(
      2
    );
    const partyVotesPercentage = partyVotes.map((p) => ({
      partido: p.partido,
      porcentaje: ((p.votos / totalVotes) * 100).toFixed(2),
    }));

    return NextResponse.json({
      totalVotes,
      nullVotes: {
        cantidad: nullVotesCount,
        porcentaje: nullVotesPercentage,
      },
      partyVotes: partyVotesPercentage,
    });
  } catch (error) {
    console.error("Error al obtener datos de votos:", error);
    return NextResponse.json(
      { error: "No se pudo obtener los datos." },
      { status: 500 }
    );
  }
};
