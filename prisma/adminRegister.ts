"use server";

import { saltAndHashPassword } from "@/lib/bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const pwdHash = await saltAndHashPassword("admin333");

    const newAdmin = await prisma.user.create({
      data: {
        name: "admin",
        last_name: "admin",
        codigo: "admin333", // codigo
        email: "33@33.com", // unico
        password: pwdHash,
        role: "admin",
      },
    });

    console.log("new admin: ", newAdmin);
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
