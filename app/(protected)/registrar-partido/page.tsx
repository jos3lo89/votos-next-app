"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./components/RegisterForm";

const RegistrarPartidoPage = () => {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Registro de partidos</CardTitle>
        <CardDescription>
          Ingresa los datos del partido para su registro.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};
export default RegistrarPartidoPage;
