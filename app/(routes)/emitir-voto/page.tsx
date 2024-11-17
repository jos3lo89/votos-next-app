"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "@/lib/axios";
import { toast } from "sonner";
import { PartidosJunta } from "@/types/votos-next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface Estudiante {
  id: string;
  num_orden: number;
  apellido_nombre: string;
  escuela_profesional: string;
  ciclo: number;
  voto_emitido: boolean;
  created_at: string;
  updated_at: string;
  codigo: string;
}

const inputSchema = z.object({
  codigo: z
    .string()
    .length(10, { message: "Debe tener al menos 10 caracteres" }),
});

type Formfields = z.infer<typeof inputSchema>;

const EmitirVotoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [partido, setPartido] = useState<PartidosJunta[]>([]);
  const [btnColor, setBtncolor] = useState(false);
  const [selectedParty, setSelectedParty] = useState<PartidosJunta | null>(
    null
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Formfields>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      codigo: "",
    },
  });

  const onSubmit = async (values: Formfields) => {
    try {
      console.log(values);
      const res = await api.get(`estudiantes/${values.codigo}`);
      setEstudiante(res.data);
      if (res.status == 200) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchPartio = async () => {
    try {
      const res = await api.get("partido");
      setPartido(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchPartio();
  }, []);

  const handleVote = (party: PartidosJunta | null) => {
    if (party) {
      setSelectedParty(party);
      setBtncolor(false);
    } else {
      setSelectedParty(null);
      setBtncolor(true);
    }
  };

  const handleConfirm = async () => {
    if (!estudiante) {
      console.log("No hay estudiante");
      return;
    }

    const voto = {
      id_estudiante: estudiante.id,
      id_partido: selectedParty ? selectedParty.id : null,
      voto_nulo: selectedParty ? false : true,
    };

    try {
      const res = await api.post("voto", voto);

      console.log(res);

      setIsModalOpen(false);
      reset();
      setSelectedParty(null);
      setBtncolor(false);
      console.log(voto);

      toast.success("voto realizado", {
        richColors: true,
        duration: 2000,
        position: "top-center",
        dismissible: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center  rounded-lg  justify-center shadow-md mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-6 justify-center "
          >
            <div>
              <Input
                type="text"
                placeholder="Buscar por código"
                {...register("codigo")}
                className="flex-grow"
              />
              {errors.codigo && (
                <span className="text-red-600 text-sm">
                  {errors.codigo.message}
                </span>
              )}
              {errors.root && (
                <span className="text-red-600 text-sm">
                  {errors.root.message}
                </span>
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="ml-2">
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogDescription></DialogDescription>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Datos del Votante</DialogTitle>
          </DialogHeader>
          {estudiante && (
            <div className="grid gap-4 py-4">
              <div>Nombre: {estudiante.apellido_nombre}</div>
              <div>Código: {estudiante.codigo}</div>
              <div>Ciclo: {estudiante.ciclo}</div>
            </div>
          )}

          {estudiante && estudiante.voto_emitido ? (
            <div className="text-center">
              <h1 className="text-red-600 text-2xl font-semibold">
                Ya se emitio el voto de este usuario
              </h1>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 place-content-center mt-4">
                {partido &&
                  partido.map((party) => (
                    <div
                      key={party.id}
                      className={`flex flex-col items-center p-2 border rounded cursor-pointer ${
                        selectedParty?.id === party.id
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleVote(party)}
                    >
                      <img
                        src={party.imagen_url}
                        alt={party.nombre}
                        className="w-24 h-24 object-cover mb-2 rounded-lg"
                      />
                      <span className="text-sm font-medium">
                        {party.nombre}
                      </span>
                    </div>
                  ))}
              </div>
              <button
                onClick={() => handleVote(null)}
                className={`mt-4 w-full px-2 py-2 rounded-lg border-2 border-gray-500 ${
                  btnColor ? "bg-orange-600" : "bg-transparent"
                }`}
              >
                Voto Nulo
              </button>
            </>
          )}

          <DialogFooter>
            {estudiante && estudiante.voto_emitido ? (
              <Button onClick={handleCancel} className="mt-4">
                Cancelar
              </Button>
            ) : (
              <Button onClick={handleConfirm} className="mt-4">
                Confirmar Voto
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EmitirVotoPage;
