"use client";
import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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
    accessorKey: "num_orden",
    header: "N°",
    cell: ({ row }) => <div>{row.original.num_orden}</div>,
  },
  {
    accessorKey: "apellido_nombre",
    header: "Apellidos y Nombres",
  },
  {
    accessorKey: "escuela_profesional",
    header: "Escuela Profesional",
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get(STUDENT_URL);
      setAlumnos(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error al cargar los datos:", error);
      setLoading(false);
    }
  };

  const table = useReactTable({
    data: alumnos,
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

  return (
    <div className="p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar alumnos..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  {loading ? (
                    <div className="flex items-center justify-center m-6">
                      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> */}
                      <span>Cargando...</span>
                    </div>
                  ) : (
                    "No se encontraron resultados."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
