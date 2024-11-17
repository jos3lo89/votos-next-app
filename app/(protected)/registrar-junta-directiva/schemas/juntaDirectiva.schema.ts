import { z } from "zod";

export enum Cargo {
  Presidente = "Presidente",
  Vicepresidente = "Vicepresidente",
  SecretarioOrganizacion = "Secretario_Organizacion",
  SecretarioAsuntosAcademicos = "Secretario_Asuntos_Academicos",
  SecretarioPrensaPropaganda = "Secretario_Prensa_Propaganda",
  SecretarioEconomia = "Secretario_Economia",
  SecretarioDeporte = "Secretario_Deporte",
  SecretarioCultura = "Secretario_Cultura",
  SecretarioBienestarUniversitario = "Secretario_Bienestar_Universitario",
  SecretarioDefensa = "Secretario_Defensa",
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const juntaFormSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  codigo: z.string().regex(/^\d+$/, "El código debe ser numérico"),
  ciclo: z.coerce
    .number()
    .int()
    .positive()
    .min(1, "El ciclo debe ser mayor a 0"),
  cargo: z.enum(Object.values(Cargo) as [string, ...string[]]),
  foto: z.custom<FileList | undefined | null>((value) => {
    if (!value || value.length === 0) return true;
    const file = value[0];
    return (
      file.size < MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)
    );
  }, "Debe ser una imagen válida (JPG, PNG, WEBP) y menor a 2MB"),

  id_partido: z.string().uuid("ID de partido inválido"),
});

export type JuntaFormValues = z.infer<typeof juntaFormSchema>;
