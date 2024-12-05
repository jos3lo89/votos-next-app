import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const votoSchema = z.object({
  id_partido: z
    .string({ required_error: "El ID del partido es requerido." })
    .nullable()
    .or(z.literal(null))
    .optional(),
  id_estudiante: z
    .string({ required_error: "El ID del estudiante es requerido." })
    .min(1, "El ID del estudiante no puede estar vacío."),
  voto_nulo: z.boolean({
    required_error: "El voto nulo es obligatorio.",
  }),
});

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    const validatedData = votoSchema.parse(data);

    const nuevoVoto = await db.votos.create({
      data: {
        id_partido: validatedData.id_partido,
        id_estudiante: validatedData.id_estudiante,
        voto_nulo: validatedData.voto_nulo,
      },
    });

    const updateStudente = await db.estudiantes.update({
      where: {
        id: validatedData.id_estudiante,
      },
      data: {
        voto_emitido: true,
      },
    });

    return NextResponse.json({ ...nuevoVoto, ...updateStudente });
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors.map((e) => e.message) });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: "Error al registrar el voto" });
    }

    return NextResponse.json({ error: "Error interno del servidor" });
  }
};

export const GET = async () => {
  try {
    const votos = await db.votos.findMany({
      include: {
        partido: true,
        estudiante: true,
      },
    });
    return NextResponse.json(votos);
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
    }
    return NextResponse.json({ error: error });
  }
};
