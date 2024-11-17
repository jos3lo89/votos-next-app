/*
  Warnings:

  - Added the required column `codigo` to the `Estudiantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estudiantes" ADD COLUMN     "codigo" TEXT NOT NULL;
