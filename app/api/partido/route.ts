import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// import { uploadStream } from "@/lib/cloudinary";
import { date, z, ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { writeFile } from "fs/promises";
import path from "path";

const partidoSchemaRegister = z.object({
  nombre: z.string({
    required_error: "nombre requerido",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }),
  descripcion: z
    .string({
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .nullable()
    .optional()
    .transform((val) => val ?? ""),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();

    const rewFormData = {
      nombre: data.get("nombre"),
      descripcion: data.get("descricion"),
    };

    const validateData = partidoSchemaRegister.parse(rewFormData);

    const image = data.get("file");

    if (!image || !(image instanceof File)) {
      return NextResponse.json("No se ha subido nunguna imagen", {
        status: 400,
      });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}.${image.name.split(".").pop()}`;
    const filePath = path.join(process.cwd(), "public/img", fileName);

    await writeFile(filePath, buffer);

    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const imageUrl = `${serverUrl}/img/${fileName}`;

    // cloudinary
    // const resultImage = await uploadStream(buffer, "epis");

    const neuvPartido = await db.partidos.create({
      data: {
        imagen_id: imageUrl,
        imagen_url: imageUrl,
        ...validateData,
      },
    });

    // return NextResponse.json(neuvPartido, { status: 201 });
    return NextResponse.json({ message: "creado" }, { status: 201 });
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.errors.map((e) => e.message) },
        { status: 400 }
      );
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "error al validar los datos " },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error });
  }
};

export const GET = async () => {
  try {
    const partidos = await db.partidos.findMany({ include: { junta: true } });

    return NextResponse.json(partidos, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
};
