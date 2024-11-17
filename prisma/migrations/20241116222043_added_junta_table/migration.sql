/*
  Warnings:

  - You are about to drop the `Presidentes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_estudiante]` on the table `Votos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('Presidente', 'Vicepresidente', 'Secretario_Organizacion', 'Secretario_Asuntos_Academicos', 'Secretario_Prensa_Propaganda', 'Secretario_Economia', 'Secretario_Deporte', 'Secretario_Cultura', 'Secretario_Bienestar_Universitario', 'Secretario_Defensa');

-- DropForeignKey
ALTER TABLE "Presidentes" DROP CONSTRAINT "Presidentes_id_partido_fkey";

-- DropTable
DROP TABLE "Presidentes";

-- CreateTable
CREATE TABLE "JuntaDirectiva" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "ciclo" INTEGER NOT NULL,
    "foto_url" TEXT,
    "foto_id" TEXT,
    "cargo" "Cargo" NOT NULL,
    "id_partido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JuntaDirectiva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JuntaDirectiva_codigo_key" ON "JuntaDirectiva"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "JuntaDirectiva_dni_key" ON "JuntaDirectiva"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Votos_id_estudiante_key" ON "Votos"("id_estudiante");

-- AddForeignKey
ALTER TABLE "JuntaDirectiva" ADD CONSTRAINT "JuntaDirectiva_id_partido_fkey" FOREIGN KEY ("id_partido") REFERENCES "Partidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "Estudiantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_id_partido_fkey" FOREIGN KEY ("id_partido") REFERENCES "Partidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
