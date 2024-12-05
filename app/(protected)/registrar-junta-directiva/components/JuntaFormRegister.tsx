"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ACCEPTED_IMAGE_TYPES } from "../../registrar-partido/schemas/partido.schema";
import {
  juntaFormSchema,
  JuntaFormValues,
} from "../schemas/juntaDirectiva.schema";
import api from "@/lib/axios";
import { toast } from "sonner";

export interface Partidos {
  id: string;
  nombre: string;
  imagen_url: string;
  imagen_id: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

const JuntaFormRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [partidos, setPartidos] = useState<Partidos[]>([]);

  useEffect(() => {
    fetchPartidos();
  }, []);

  const fetchPartidos = async () => {
    try {
      const res = await api.get("partido");
      setPartidos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<JuntaFormValues>({
    resolver: zodResolver(juntaFormSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      codigo: "",
      ciclo: 1,
      cargo: undefined,
      id_partido: undefined,
    },
  });

  const quitarImagen = () => {
    setPreviewImage(null);
    form.setValue("foto", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: JuntaFormValues) => {
    setIsSubmitting(true);
    console.log("Form Data:", data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "foto" && value) {
        const fileList = value as FileList;
        if (fileList.length > 0) {
          formData.append(key, fileList[0]);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await api.post("junta-directiva", formData);
      console.log(res);

      form.reset();

      if (previewImage) {
        setPreviewImage(null);
        form.setValue("foto", undefined);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      toast.success("Integrante registrado", {
        richColors: true,
        duration: 2000,
        position: "top-center",
        dismissible: true,
      });
    } catch (error) {
      console.log(error);
      toast.warning("No se pudo registrar", {
        richColors: true,
        duration: 2000,
        position: "top-center",
        dismissible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const getStudentData = async (codigo: string) => {
  //   try {
  //     const res = await api.get(`estudiantes/${codigo}`);
  //     console.log("datadatadata", res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="foto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      ref={fileInputRef}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handleImageChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Sube una imagen (JPG, PNG, WEBP). Tamaño máximo: 2MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Vista previa"
                  className="w-full max-w-xs rounded-lg shadow-md mx-auto"
                />
              </div>
            )}
            {previewImage && (
              <div className="flex justify-start">
                <Button variant="destructive" onClick={() => quitarImagen()}>
                  Quitar imagen
                </Button>
              </div>
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su código"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*
              <Button type="button" onClick={() => getStudentData(form.getValues("codigo"))}>
                Busacar estudiante
              </Button> */}

              <FormField
                control={form.control}
                name="ciclo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciclo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingrese su ciclo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1  gap-4 mb-4 ">
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Presidente">Presidente</SelectItem>
                        <SelectItem value="Vicepresidente">
                          Vicepresidente
                        </SelectItem>
                        <SelectItem value="Secretario_Organizacion">
                          Secretario de Organización
                        </SelectItem>
                        <SelectItem value="Secretario_Asuntos_Academicos">
                          Secretario de Asuntos Académicos
                        </SelectItem>
                        <SelectItem value="Secretario_Prensa_Propaganda">
                          Secretario de Prensa y Propaganda
                        </SelectItem>
                        <SelectItem value="Secretario_Economia">
                          Secretario de Economía
                        </SelectItem>
                        <SelectItem value="Secretario_Deporte">
                          Secretario de Deporte
                        </SelectItem>
                        <SelectItem value="Secretario_Cultura">
                          Secretario de Cultura
                        </SelectItem>
                        <SelectItem value="Secretario_Bienestar_Universitario">
                          Secretario de Bienestar Universitario
                        </SelectItem>
                        <SelectItem value="Secretario_Defensa">
                          Secretario de Defensa
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1  gap-4 mb-4 ">
              <FormField
                control={form.control}
                name="id_partido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partido</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {partidos.map((p) => (
                          <SelectItem value={p.id} key={p.id}>
                            {p.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrar"}
        </Button>
      </form>
    </Form>
  );
};
export default JuntaFormRegister;
