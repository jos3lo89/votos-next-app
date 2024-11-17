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
CREATE TABLE "Presidentes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apelllido" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "ciclo" INTEGER NOT NULL,
    "foto_url" TEXT,
    "foto_id" TEXT,
    "id_partido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presidentes_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Votos" (
    "id" TEXT NOT NULL,
    "id_estudiante" TEXT NOT NULL,
    "id_partido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presidentes_id_partido_key" ON "Presidentes"("id_partido");

-- AddForeignKey
ALTER TABLE "Presidentes" ADD CONSTRAINT "Presidentes_id_partido_fkey" FOREIGN KEY ("id_partido") REFERENCES "Partidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
