"use client";
import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { openPopup } from "./pdf-popup/pdfPopup";

interface Alumnos {
  id: string;
  num_orden: number;
  apellido_nombre: string;
  escuela_profesional: string;
  ciclo: number;
  codigo: string;
  voto_emitido: boolean;
  created_at: string;
  updated_at: string;
}

const columns: ColumnDef<Alumnos>[] = [
  {
    header: "N°",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "apellido_nombre",
    header: "Apellidos y Nombres",
  },
  {
    header: "Escuela",
    cell: () => "EPIS",
  },
  {
    accessorKey: "codigo",
    header: "Código",
  },
  {
    accessorKey: "ciclo",
    header: "Ciclo",
    cell: ({ row }) => <div>{row.original.ciclo}</div>,
  },
  {
    accessorKey: "voto_emitido",
    header: "Estado",
    cell: ({ row }) => (
      <div>
        {row.original.voto_emitido ? (
          <span className="text-green-600">Votó</span>
        ) : (
          <span className="text-red-600">Pendiente</span>
        )}
      </div>
    ),
  },
];

const STUDENT_URL = "estudiantes";

const AlumnosPageCsv = () => {
  const [alumnos, setAlumnos] = useState<Alumnos[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filteredAlumnos, setFilteredAlumnos] = useState<Alumnos[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents(filterType);
  }, [alumnos, filterType]);

  const filterStudents = (type: string) => {
    switch (type) {
      case "voted":
        setFilteredAlumnos(alumnos.filter((a) => a.voto_emitido));
        break;
      case "pending":
        setFilteredAlumnos(alumnos.filter((a) => !a.voto_emitido));
        break;
      default:
        setFilteredAlumnos(alumnos);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get(STUDENT_URL);
      setAlumnos(res.data);
      setFilteredAlumnos(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error al cargar los datos:", error);
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (filterType) {
      case "voted":
        return "Estudiantes que Emitieron su Voto";
      case "pending":
        return "Estudiantes Pendientes de Votación";
      default:
        return "Lista Completa de Estudiantes";
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = getTitle();

    doc.text(title, 65, 10);

    const tableData = filteredAlumnos.map((alumno, index) => [
      index + 1,
      alumno.apellido_nombre,
      alumno.escuela_profesional == "INGENIERIA DE SISTEMAS" && "EPIS",
      alumno.codigo,
      alumno.ciclo,
      alumno.voto_emitido ? "Votó" : "Pendiente",
    ]);

    autoTable(doc, {
      head: [["N°", "Nombre", "Escuela", "Código", "Ciclo", "Estado"]],
      body: tableData,
    });

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    openPopup(url, `${title}.pdf`, 1000, 600);
  };

  const exportToExcel = () => {
    const tableData2 = filteredAlumnos.map((alumno, index) => ({
      "N°": index + 1,
      "Apellidos y Nombres": alumno.apellido_nombre,
      "Escuela Profesional": alumno.escuela_profesional,
      Código: alumno.codigo,
      Ciclo: alumno.ciclo,
      Estado: alumno.voto_emitido ? "Votó" : "Pendiente",
    }));

    const ws = XLSX.utils.json_to_sheet(tableData2);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Estudiantes");
    XLSX.writeFile(wb, `${getTitle()}.xlsx`);
  };

  const table = useReactTable({
    data: filteredAlumnos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleFilterChange = (value: string) => {
    setFilterType(value);
  };

  const handleRefresh = () => {
    fetchStudents();
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Buscar alumnos..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />

        <Select value={filterType} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="voted">Votaron</SelectItem>
            <SelectItem value="pending">No Votaron</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4 justify-end py-4">
          <Button variant="outline" onClick={exportToPDF}>
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={exportToExcel}>
            Exportar Excel
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            Recargar
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? "Cargando..." : "No se encontraron resultados."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>

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
  );
};

export default AlumnosPageCsv;
