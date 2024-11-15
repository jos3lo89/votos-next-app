"use client";
import { useState, useEffect } from "react";

const AlumnosPageCsv = () => {
  const [alumnos, setAlumnos] = useState<
    {
      N: string;
      Codigo: string;
      ApellidosNombres: string;
      EscuelaProfesional: string;
      Ciclo: string;
    }[]
  >([]);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8bYrF_OdwSSCB54lVXTmLoCzdnoNviIlhG9oMGFS1DAvHHdlb5Q_kceVcGz2eFMKSZ0ag55neAIWK/pub?output=csv"
    )
      .then((res) => res.text())
      .then((data) => {
        const mainData = data
          .split("\n")
          .slice(1)
          .map((row) => {
            const [N, Codigo, ApellidosNombres, EscuelaProfesional, Ciclo] =
              row.split(",");

            return { N, Codigo, ApellidosNombres, EscuelaProfesional, Ciclo };
          });

        setAlumnos(mainData);
      });
  }, []);

  return (
    <div>
      {alumnos.map((alumno) => (
        <div key={alumno.N}>
          <p>{alumno.ApellidosNombres}</p>
          <p>{alumno.Codigo}</p>
          <p>{alumno.EscuelaProfesional}</p>
        </div>
      ))}
    </div>
  );
};

export default AlumnosPageCsv;
