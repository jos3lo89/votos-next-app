// "use server";

// import { PrismaClient } from "@prisma/client";
// // import { estudiantes } from './data/estudiantes'

// const prisma = new PrismaClient();
// const STUDENT_URL =
//   "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8bYrF_OdwSSCB54lVXTmLoCzdnoNviIlhG9oMGFS1DAvHHdlb5Q_kceVcGz2eFMKSZ0ag55neAIWK/pub?output=csv";

// async function main() {
//   try {
//     console.log("🌱 Iniciando proceso de seed...");

//     const res = await fetch(STUDENT_URL);
//     const text = await res.text();

//     const text2 = text.split("\n").slice(1);

//     const estudiantes = text2.map((row) => {
//       const [N, Codigo, ApellidosNombres, EscuelaProfesional, Ciclo] = row
//         .replace("\r", "")
//         .split(",");
//       return { N, Codigo, ApellidosNombres, EscuelaProfesional, Ciclo };
//     });

//     const estudiantesData = estudiantes.map((estudiante) => ({
//       num_orden: parseInt(estudiante.N),
//       codigo: estudiante.Codigo,
//       apellido_nombre: estudiante.ApellidosNombres,
//       escuela_profesional: estudiante.EscuelaProfesional,
//       ciclo: parseInt(estudiante.Ciclo),
//       voto_emitido: false,
//     }));

//     const result = await prisma.estudiantes.createMany({
//       data: estudiantesData,
//       skipDuplicates: true,
//     });

//     console.log(`✅ Seed completado exitosamente!`);
//     console.log(`📊 ${result.count} estudiantes insertados`);
//   } catch (error) {
//     console.error("❌ Error durante el proceso de seed:");
//     console.error(error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main()
//   .then(() => {
//     console.log("🏁 Proceso finalizado correctamente");
//     process.exit(0);
//   })
//   .catch((e) => {
//     console.error("❌ Error en el proceso principal:");
//     console.error(e);
//     process.exit(1);
//   });
