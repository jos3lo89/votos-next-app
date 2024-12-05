"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  UserCheck,
  VoteIcon,
  BanIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";

export interface Partidos {
  id: string;
  nombre: string;
  votos: number;
}
export interface Estudiantes {
  totalEstudiantes: number;
  totalVotantes: number;
}

export interface VotosNulos {
  votosPorPartido: VotosPorPartido[];
  votosNulos: number;
}

export interface VotosPorPartido {
  _count: Count;
  id_partido: string;
}

export interface Count {
  id: number;
}

const Dashboard = () => {
  const [partidos, setPartidos] = useState<Partidos[]>([]);
  const [resumen, setResumen] = useState<Estudiantes>();
  const [votosNulos, setVotosNulos] = useState<VotosNulos>();

  const getAll = async () => {
    fetchDatosPartido();
    obtenerResumen();
    getVotosNulos();
  };

  useEffect(() => {
    fetchDatosPartido();
    obtenerResumen();
    getVotosNulos();
  }, []);

  const getVotosNulos = async () => {
    try {
      const res = await api.get("dashboard/votos-nulos");
      console.log(res.data);
      setVotosNulos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatosPartido = async () => {
    try {
      const res = await api.get("dashboard/votos-emitidos");
      console.log("votos-emitidos", res.data);

      setPartidos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerResumen = async () => {
    try {
      const res = await api.get("dashboard/estudiantes");
      console.log("listo", res.data);

      setResumen(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePercentage = () => {
    if (resumen) {
      return ((resumen.totalVotantes / resumen.totalEstudiantes) * 100).toFixed(
        2
      );
    }
    return "0";
  };

  const maxVotos = Math.max(...partidos.map((p) => p.votos));
  const ticks = Array.from({ length: maxVotos + 1 }, (_, i) => i);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={getAll}>Refrescar</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Estudiantes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resumen ? resumen.totalEstudiantes : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Estudiantes registrados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votantes</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resumen ? resumen.totalVotantes : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Estudiantes que han votado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Participación
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculatePercentage()}%</div>
              <p className="text-xs text-muted-foreground">
                Porcentaje de participación
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partidos</CardTitle>
              <VoteIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partidos.length}</div>
              <p className="text-xs text-muted-foreground">
                Partidos participantes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votos nulos</CardTitle>
              <BanIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{votosNulos?.votosNulos}</div>
              <p className="text-xs text-muted-foreground">
                Total de estudiantes que votaron en nulo
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Votos por Partido</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={partidos}>
                  <XAxis dataKey="nombre" />
                  <YAxis ticks={ticks} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votos" fill="#1e40af" name="Votos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Resultados Detallados</CardTitle>
              <CardDescription>Desglose de votos por partido</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partido</TableHead>
                    <TableHead className="text-right">Votos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partidos.map((partido) => (
                    <TableRow key={partido.id}>
                      <TableCell className="font-medium">
                        {partido.nombre}
                      </TableCell>
                      <TableCell className="text-right">
                        {partido.votos}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow key={999}>
                    <TableCell className="font-medium text-red-600">
                      votos nulos
                    </TableCell>
                    <TableCell className="text-right">
                      {votosNulos?.votosNulos}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
