import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const estudiantes = await db.estudiantes.findMany();

    return NextResponse.json(estudiantes, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: "Error al listar estudiantes" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
