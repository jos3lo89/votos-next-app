-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('Presidente', 'Vicepresidente', 'Secretario_Organizacion', 'Secretario_Asuntos_Academicos', 'Secretario_Prensa_Propaganda', 'Secretario_Economia', 'Secretario_Deporte', 'Secretario_Cultura', 'Secretario_Bienestar_Universitario', 'Secretario_Defensa');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partidos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen_url" TEXT NOT NULL,
    "imagen_id" TEXT NOT NULL,
    "descripcion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JuntaDirectiva" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "dni" TEXT,
    "ciclo" INTEGER NOT NULL,
    "foto_url" TEXT,
    "foto_id" TEXT,
    "cargo" "Cargo" NOT NULL,
    "id_partido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JuntaDirectiva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiantes" (
    "id" TEXT NOT NULL,
    "num_orden" INTEGER NOT NULL,
    "apellido_nombre" TEXT NOT NULL,
    "escuela_profesional" TEXT NOT NULL,
    "ciclo" INTEGER NOT NULL,
    "voto_emitido" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "codigo" TEXT NOT NULL,

    CONSTRAINT "Estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votos" (
    "id" TEXT NOT NULL,
    "id_estudiante" TEXT NOT NULL,
    "id_partido" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "voto_nulo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsRegistered" (
    "id" TEXT NOT NULL,
    "they_are_registered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StudentsRegistered_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_codigo_key" ON "User"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JuntaDirectiva_codigo_key" ON "JuntaDirectiva"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "JuntaDirectiva_dni_key" ON "JuntaDirectiva"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiantes_codigo_key" ON "Estudiantes"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Votos_id_estudiante_key" ON "Votos"("id_estudiante");

-- AddForeignKey
ALTER TABLE "JuntaDirectiva" ADD CONSTRAINT "JuntaDirectiva_id_partido_fkey" FOREIGN KEY ("id_partido") REFERENCES "Partidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "Estudiantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votos" ADD CONSTRAINT "Votos_id_partido_fkey" FOREIGN KEY ("id_partido") REFERENCES "Partidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
