import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

// BORARA TODOS LOS ESTUDIANTES

export const DELETE = async () => {
  try {
    const isRegister = await db.studentsRegistered.findFirst();

    if (!isRegister?.they_are_registered) {
      return NextResponse.json(
        { message: "No hay estudiantes" },
        { status: 400 }
      );
    }

    await db.estudiantes.deleteMany();

    await db.studentsRegistered.update({
      where: {
        id: isRegister?.id,
      },
      data: {
        they_are_registered: false,
      },
    });

    return NextResponse.json(
      { message: "Estudiantes eliminados" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        error: "Error al borrar todos los estudiantes",
      });
    }
    return NextResponse.json({ error: "Internal server error" });
  }
};
