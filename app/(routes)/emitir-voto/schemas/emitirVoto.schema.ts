import { z } from "zod";

export const inputSchema = z.object({
  codigo: z
    .string()
    .length(10, { message: "Debe tener al menos 10 caracteres" }),
});

export type Formfields = z.infer<typeof inputSchema>;
