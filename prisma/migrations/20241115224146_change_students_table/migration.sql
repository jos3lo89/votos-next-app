/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Estudiantes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estudiantes_codigo_key" ON "Estudiantes"("codigo");
