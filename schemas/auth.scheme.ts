import { z } from "zod";

export const formLoginSchema = z.object({
  usuario: z.string().min(1, { message: "El usuario no puede estar vacío" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type FormLoginValues = z.infer<typeof formLoginSchema>;

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Nombre es obligatorio" })
    .min(1, "Nombre es obligatorio"),
  last_name: z
    .string({ required_error: "Nombre es obligatorio" })
    .min(1, "Nombre es obligatorio"),
  email: z
    .string({ required_error: "Correo es obligatorio" })
    .min(1, "Correo es obligatorio")
    .email("Correo inválido"),
  codigo: z
    .string({ required_error: "codigo es obligatorio" })
    .min(1, "codigo es obligatorio"),
  password: z
    .string({ required_error: "Contraseña es obligatoria" })
    .min(1, "Contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres")
    .max(32, "No debe tener más de 32 caracteres"),
});
export type FormRegisteralues = z.infer<typeof registerSchema>;
