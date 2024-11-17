"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { formLoginSchema, FormLoginValues } from "@/schemas/auth.scheme";
import { loginAction, registerAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormLogin = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      usuario: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    setError(null);

    startTransition(async () => {
      const res = await loginAction(data);

      if (res.error) {
        setError(res.error);
      } else {
        toast.success("Vienvenido", {
          richColors: true,
          duration: 2000,
          position: "top-center",
          dismissible: true,
        });
        router.push("/dashboard");
      }
    });
  };

  const handleRegisterBtn = async () => {
    startTransition(async () => {
      const res = await registerAction({
        email: "1007220181@unajma.edu.pe",
        name: "jose luis",
        password: "mern123456",
        codigo: "1007220181",
        last_name: "galindo cardenas",
      });
      if (res.error) {
        console.log(res.error);
      } else {
        console.log("creo que es exito");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
        <CardDescription>
          Ingrese sus credenciales para acceder a su cuenta.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="usuario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>{error && <FormMessage>{error}</FormMessage>}</div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </CardFooter>
        </form>
      </Form>
      {/* <div>
        <h1>register Btn</h1>
        <Button onClick={() => handleRegisterBtn()}>register</Button>
      </div> */}
    </Card>
  );
};
export default FormLogin;
