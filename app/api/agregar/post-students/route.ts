import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

// REGISTRAR TDDOS LOS ESTUDIANTES

export const GET = async () => {
  try {
    const isRegister = await db.studentsRegistered.findFirst();

    if (isRegister?.they_are_registered) {
      return NextResponse.json(
        {
          message: "Los estudiantes ya estan registrados",
        },
        {
          status: 400,
        }
      );
    }

    const students = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8bYrF_OdwSSCB54lVXTmLoCzdnoNviIlhG9oMGFS1DAvHHdlb5Q_kceVcGz2eFMKSZ0ag55neAIWK/pub?output=csv"
    );
    const data = await students.text();
    const data2 = data.split("\n").slice(1);

    const data3 = data2.map((row) => {
      const [N, Codigo, ApellidosNombres, EscuelaProfesional, Ciclo] = row
        .replace("\r", "")
        .split(",");

      return { N, Codigo, ApellidosNombres, EscuelaProfesional, Ciclo };
    });

    const dataStudente = data3.map((s) => {
      return {
        num_orden: parseInt(s.N),
        codigo: s.Codigo,
        apellido_nombre: s.ApellidosNombres,
        escuela_profesional: s.EscuelaProfesional,
        ciclo: parseInt(s.Ciclo),
        voto_emitido: false,
      };
    });

    await db.estudiantes.createMany({
      data: dataStudente,
      skipDuplicates: true,
    });

    await db.studentsRegistered.update({
      where: {
        id: isRegister?.id,
      },
      data: {
        they_are_registered: true,
      },
    });

    return NextResponse.json(
      { message: "Estudiantes registrados con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        error: "Error al insertar los datos del los estudiantes.",
      });
    }

    return NextResponse.json({ error: "Internal server error" });
  }
};
