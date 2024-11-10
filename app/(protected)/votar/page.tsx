"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
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

interface Users {
  id: number;
  nombre: string;
  apellido: string;
  codigo: string;
  dni: string;
  ciclo: number;
}
// Datos de ejemplo para los usuarios
const users: Users[] = [
  {
    id: 1,
    nombre: "José Luis",
    apellido: "Galindo Cárdenas",
    codigo: "1007220181",
    dni: "74843111",
    ciclo: 8,
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    codigo: "MG002",
    dni: "87654321",
    ciclo: 5,
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Rodríguez",
    codigo: "CR003",
    dni: "23456789",
    ciclo: 8,
  },
  // Añade más usuarios según sea necesario
];

// Datos de ejemplo para los partidos políticos

interface Partidos {
  id: number;
  name: string;
  image: string;
}

const parties: Partidos[] = [
  {
    id: 1,
    name: "Partido A",
    image:
      "https://i.pinimg.com/564x/7a/68/e7/7a68e7a0571c1ea3d37516eb3d3115d2.jpg",
  },
  {
    id: 2,
    name: "Partido B",
    image:
      "https://i.pinimg.com/564x/18/7f/7a/187f7a7ec09d3ad20b93a55ff43b881b.jpg",
  },
];

const VotarPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Partidos | null>(null);

  const handleSearch = () => {
    const user = users.find((u) => u.codigo === searchTerm);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      alert("Usuario no encontrado");
    }
  };

  const handleVote = (party: any) => {
    setSelectedParty(party);
  };

  const handleConfirm = () => {
    if (selectedParty) {
      console.log(
        `Voto confirmado para ${selectedParty.name}. Datos del usuario:`,
        selectedUser
      );
      setIsModalOpen(false);
      setSelectedUser(null);
      setSelectedParty(null);
      setSearchTerm("");
    } else {
      alert("Por favor seleccione un partido o elija voto nulo");
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center p-4">
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center  rounded-lg shadow-md">
          <Input
            type="text"
            placeholder="Buscar por código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} className="ml-2">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogDescription></DialogDescription>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Datos del Votante</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div>
                Nombre: {selectedUser.nombre} {selectedUser.apellido}
              </div>
              <div>DNI: {selectedUser.dni}</div>
              <div>Ciclo: {selectedUser.ciclo}</div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {parties.map((party) => (
              <div
                key={party.id}
                className={`flex flex-col items-center p-2 border rounded cursor-pointer ${
                  selectedParty?.id === party.id
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => handleVote(party)}
              >
                <img
                  src={party.image}
                  alt={party.name}
                  className="w-24 h-24 object-cover mb-2"
                />
                <span className="text-sm font-medium">{party.name}</span>
              </div>
            ))}
          </div>
          <Button
            onClick={() => handleVote({ id: 0, name: "Voto Nulo" })}
            className="mt-4 w-full"
            variant="outline"
          >
            Voto Nulo
          </Button>
          <DialogFooter>
            <Button onClick={handleConfirm} className="mt-4">
              Confirmar Voto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default VotarPage;
