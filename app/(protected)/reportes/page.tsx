"use client";

import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Votos } from "./interfaces/reportes.interfaces";
import { openPdfPopup } from "@/utils/pdfPopup";

const columns2: ColumnDef<Votos>[] = [
  {
    header: "N°",
    cell: (info) => info.row.index + 1,
  },
  {
    header: "Nombres",
    accessorKey: "estudiante.apellido_nombre",
  },
  {
    header: "Escuela",
    // accessorKey: "estudiante.escuela_profesional",
    cell: () => "EPIS",
  },
  {
    header: "Código",
    accessorKey: "estudiante.codigo",
  },
  {
    header: "Partido",
    accessorKey: "partido.nombre",
  },
  {
    header: "Hora de voto",
    cell: ({ row }) => dayjs(row.original.created_at).format("HH:mm:ss"),
  },
];

export default function ReportesPage() {
  const [votos, setVotos] = useState<Votos[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [partidoFilter, setPartidoFilter] = useState("todos");

  useEffect(() => {
    fetchVotos();
  }, []);

  const fetchVotos = async () => {
    try {
      const res = await api.get("voto");
      const cleanData = res.data.map((voto: any) => ({
        ...voto,
        partido: voto.partido || { nombre: "Voto Nulo" },
      }));
      setVotos(cleanData);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = useMemo(() => {
    return votos.filter((voto) => {
      const matchesSearch =
        voto.estudiante.codigo
          .toLowerCase()
          .includes(globalFilter.toLowerCase()) ||
        voto.estudiante.apellido_nombre
          .toLowerCase()
          .includes(globalFilter.toLowerCase());

      const matchesPartido =
        partidoFilter === "todos" ||
        (partidoFilter === "nulos" && voto.voto_nulo) ||
        voto.partido?.nombre === partidoFilter;

      console.log("wadafa ->", partidoFilter);

      return matchesSearch && matchesPartido;
    });
  }, [votos, globalFilter, partidoFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const getTitlePdf = () => {
    switch (partidoFilter) {
      case "todos":
        return "Lista de estudiantes votantes";
      case "nulos":
        return "Lista de estudiantes que marcaron un voto nulo";
      default:
        return `Lista de estudiantes que votaron por el partido ${partidoFilter}`;
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = getTitlePdf();

    const tableData = filteredData.map((voto, index) => [
      index + 1,
      voto.estudiante.apellido_nombre,
      voto.estudiante.codigo,
      "EPIS",
      voto.partido?.nombre || "Voto Nulo",
      dayjs(voto.created_at).format("HH:mm"),
    ]);

    doc.text(title, 25, 10);

    autoTable(doc, {
      head: [
        [
          "N°",
          "Nombre",
          "Código",
          "Escuela Profesional",
          "Partido",
          // "Fecha de Voto",
          "Hora de voto",
        ],
      ],
      body: tableData,
    });

    const blob = doc.output("blob");

    const url = URL.createObjectURL(blob);

    openPdfPopup(url, `${title}.pdf`, 1000, 600);

    // doc.save("reporte_votos.pdf");
  };

  // const exportToExcel = () => {
  //   const tableData2 = filteredAlumnos.map((alumno, index) => ({
  //     "N°": index + 1,
  //     "Apellidos y Nombres": alumno.apellido_nombre,
  //     "Escuela Profesional": alumno.escuela_profesional,
  //     Código: alumno.codigo,
  //     Ciclo: alumno.ciclo,
  //     Estado: alumno.voto_emitido ? "Votó" : "Pendiente",
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(tableData2);
  //   const wb = XLSX.utils.book_new();

  //   XLSX.utils.book_append_sheet(wb, ws, "Estudiantes");
  //   XLSX.writeFile(wb, `${getTitle()}.xlsx`);
  // };

  const exportToExcel = () => {
    const table = filteredData.map((alumno, index) => ({
      "N°": index + 1,
      "Apellidos y Nombre": alumno.estudiante.apellido_nombre,
      "Escuela Profesional": alumno.estudiante.escuela_profesional,
      Código: alumno.estudiante.codigo,
      Partido: alumno.estudiante.voto_emitido
        ? alumno.partido?.nombre
        : "Voto Nulo",
    }));
    // console.log(table);

    const ws = XLSX.utils.json_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Votos");
    XLSX.writeFile(wb, "reporte_votos.xlsx");
  };

  const partidos: string[] = useMemo(() => {
    const partidosSet = new Set(
      votos
        .map((voto) => voto.partido?.nombre)
        .filter((nombre): nombre is string => !!nombre)
    );
    return ["todos", ...Array.from(partidosSet), "nulos"];
  }, [votos]);

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-2 p-4 ">
        <p className="text-2xl font-medium">Reportes de votos</p>
      </div>
      {/* <div className="flex justify-center gap-6 items-center mb-4"> */}
      <div>
        <div className="bg-secondary px-2 p-4 text-center rounded-lg max-w-[350px] mx-auto mb-6">
          <p className="text-xl">
            <span>Total de votantes: </span>
            <span
              className={` ${
                filteredData.length === 0 ? "text-red-600" : "text-blue-600"
              }`}
            >
              {filteredData.length}
            </span>
          </p>
          {/* </div> */}
        </div>
        <div className="flex justify-center gap-6 items-center mb-4">
          <Input
            placeholder="Buscar por código o nombre..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center  space-x-2 flex-col gap-2 md:flex-row md:gap-0">
            <Select value={partidoFilter} onValueChange={setPartidoFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar partido" />
              </SelectTrigger>
              <SelectContent>
                {partidos.map((partido) => (
                  <SelectItem key={partido} value={partido}>
                    {partido === "todos"
                      ? "Todos"
                      : partido === "nulos"
                      ? "Votos Nulos"
                      : partido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={exportToPDF}>Exportar a PDF</Button>
            <Button onClick={exportToExcel}>Exportar a Excel</Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          {/* <div className="text-center">
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <Button
                key={i}
                variant={
                  table.getState().pagination.pageIndex === i
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => table.setPageIndex(i)}
                className="mx-1"
              >
                {i + 1}
              </Button>
            ))}
          </div> */}
          <div className="text-center">
            {table.getPageCount() > 1 && (
              <div className="flex justify-center items-center">
                {/* Botón para ir a la primera página */}
                {table.getState().pagination.pageIndex > 2 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.setPageIndex(0)}
                    >
                      1
                    </Button>
                    <span className="mx-1">...</span>
                  </>
                )}

                {/* Botones alrededor de la página actual */}
                {Array.from(
                  { length: 5 },
                  (_, i) =>
                    table.getState().pagination.pageIndex - 2 + i >= 0 &&
                    table.getState().pagination.pageIndex - 2 + i <
                      table.getPageCount() && (
                      <Button
                        key={i}
                        variant={
                          table.getState().pagination.pageIndex ===
                          table.getState().pagination.pageIndex - 2 + i
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          table.setPageIndex(
                            table.getState().pagination.pageIndex - 2 + i
                          )
                        }
                      >
                        {table.getState().pagination.pageIndex - 2 + i + 1}
                      </Button>
                    )
                )}

                {/* Botón para ir a la última página */}
                {table.getState().pagination.pageIndex <
                  table.getPageCount() - 3 && (
                  <>
                    <span className="mx-1">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                    >
                      {table.getPageCount()}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
