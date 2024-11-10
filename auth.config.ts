import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { formLoginSchema } from "./schemas/auth.scheme";
import { db } from "./lib/db";
import { comparePassword } from "./lib/bcrypt";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = formLoginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            codigo: data.usuario,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await comparePassword(data.password, user.password);

        if (!isValid) {
          throw new Error("incorrect Credentials");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
