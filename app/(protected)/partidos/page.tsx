"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/lib/axios";
import { PartidosJunta } from "./interfaces/partidos.interfaces";

const PartidosPage = () => {
  const [partidos, setPartidos] = useState<PartidosJunta[]>([]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Partidos Inscritos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {partidos.map((partido) => (
          <Dialog key={partido.id}>
            <DialogDescription className="hidden"></DialogDescription>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl" >{partido.nombre}</CardTitle>
                  <CardDescription>
                    {partido.descripcion.slice(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <img
                    src={partido.imagen_url}
                    alt={partido.nombre}
                    className="max-w-[150px] h-auto object-cover rounded-md"
                  />
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Miembros: {partido.junta.length}
                  </p>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center" >{partido.nombre}</DialogTitle>
              </DialogHeader>
              <div>
                <p className="mb-4">Descripción: {partido.descripcion}</p>
                <h3 className="font-semibold mb-2">Miembros de la junta directiva:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partido.junta.map((miembro) => (
                    <div
                      key={miembro.id}
                      className="flex items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarImage
                          src={miembro.foto_url}
                          alt={`${miembro.nombre} ${miembro.apellido}`}
                        />
                        <AvatarFallback>
                          {miembro.nombre[0]}
                          {miembro.apellido[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {miembro.nombre} {miembro.apellido}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {miembro.cargo.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default PartidosPage;
