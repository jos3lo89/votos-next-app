"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.studentsRegistered.create({
      data: {
        they_are_registered: false,
      },
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log("🏁 Proceso finalizado correctamente");
    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Error en el proceso principal:");
    console.error(e);
    process.exit(1);
  });
