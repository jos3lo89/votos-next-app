import { uploadStream } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

enum Cargo {
  Presidente = "Presidente",
  Vicepresidente = "Vicepresidente",
  Secretario_Organizacion = "Secretario_Organizacion",
  Secretario_Asuntos_Academicos = "Secretario_Asuntos_Academicos",
  Secretario_Prensa_Propaganda = "Secretario_Prensa_Propaganda",
  Secretario_Economia = "Secretario_Economia",
  Secretario_Deporte = "Secretario_Deporte",
  Secretario_Cultura = "Secretario_Cultura",
  Secretario_Bienestar_Universitario = "Secretario_Bienestar_Universitario",
  Secretario_Defensa = "Secretario_Defensa",
}

const formDataSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  codigo: z.string().min(1, "El código es requerido"),
  ciclo: z.string().transform((val) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed)) {
      throw new Error("El ciclo debe ser un número válido");
    }
    return parsed;
  }),
  cargo: z.nativeEnum(Cargo),
  id_partido: z.string().min(1, "El ID del partido es requerido"),
});


export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const rawFormData = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      codigo: formData.get("codigo"),
      ciclo: formData.get("ciclo"),
      cargo: formData.get("cargo"),
      id_partido: formData.get("id_partido"),
    };

    const validatedData = formDataSchema.parse(rawFormData);

    const foto = formData.get("foto") as File | null;

    if (!foto || !(foto instanceof File)) {
      const nuevoIntegrante = await db.juntaDirectiva.create({
        data: {
          ...validatedData,
        },
      });
      return NextResponse.json(nuevoIntegrante, { status: 201 });
    }

    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedImage = await uploadStream(buffer, "epis");

    const nuevoIntegrante = await db.juntaDirectiva.create({
      data: {
        ...validatedData,
        foto_id: uploadedImage.public_id,
        foto_url: uploadedImage.url,
      },
    });

    return NextResponse.json(nuevoIntegrante, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "error al registrar al integrante" },
        { status: 400 }
      );
    }

    console.error("Error procesando la solicitud:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
