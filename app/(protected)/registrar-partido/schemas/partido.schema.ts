import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const formSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  file: z
    .any()
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      "Imagen requerida con tamaño inferior a 2 MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo se permiten archivos JPG, PNG y WEBP"
    ),
});

export type FormType = z.infer<typeof formSchema>;
