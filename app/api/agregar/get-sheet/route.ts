import { NextResponse } from "next/server";

// PEDIR TODOS LOS ESTUDIANTES DE SHEET

export const GET = async () => {
  try {
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

    console.log("log studente in console", data3);

    return NextResponse.json(data3);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server Error" });
  }
};
