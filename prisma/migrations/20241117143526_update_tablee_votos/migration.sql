-- AlterTable
ALTER TABLE "Votos" ADD COLUMN     "voto_nulo" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id_partido" DROP NOT NULL;
