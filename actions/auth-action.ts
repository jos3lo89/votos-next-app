"use server";
import { signIn } from "@/auth";
import { saltAndHashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/db";
import {
  FormRegisteralues,
  FormLoginValues,
  registerSchema,
} from "@/schemas/auth.scheme";
import { AuthError } from "next-auth";

export const loginAction = async (values: FormLoginValues) => {
  try {
    await signIn("credentials", {
      usuario: values.usuario,
      password: values.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error  500" };
  }
};

export const registerAction = async (values: FormRegisteralues) => {
  try {
    const { success, data } = registerSchema.safeParse(values);

    if (!success) {
      return { error: "Invalid data" };
    }

    const user = await db.user.findFirst({ where: { email: data.email } });

    if (user) {
      return { error: "User allready exist" };
    }

    const pwdHash = await saltAndHashPassword(data.password);

    await db.user.create({
      data: {
        ...data,
        password: pwdHash,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: "error  500" };
  }
};
