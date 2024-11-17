"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JuntaFormRegister from "./components/JuntaFormRegister";

const RegistrarJuntaDirectivaPage = () => {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Registro de miembros de la junta directiva</CardTitle>
        <CardDescription>Ingresa los datos para su registro.</CardDescription>
      </CardHeader>
      <CardContent>
        <JuntaFormRegister />
      </CardContent>
    </Card>
  );
};
export default RegistrarJuntaDirectivaPage;
