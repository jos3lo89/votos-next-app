"use client";

import { formSchema, FormType } from "../schemas/partido.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import { toast } from "sonner";

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: "",
      nombre: "",
    },
  });

  const onSubmit = async (values: FormType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "file") {
        formData.append(key, (value as FileList)[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      setLoading(true);
      const res = await api.post("partido", formData);
      setLoading(false);
      form.reset();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        setPreviewImage(null);
      }

      toast.success(`El partido ${values.nombre} fue registrado con exito`, {
        richColors: true,
        duration: 2000,
        position: "top-center",
        dismissible: true,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.warning(`Error al registrar el partido`, {
        richColors: true,
        duration: 2000,
        position: "bottom-center",
        dismissible: true,
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const quitarImagen = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tus nombres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Escribe la descripción"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="file"
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
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            {loading ? "Registrando..." : "Registrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default RegisterForm;
