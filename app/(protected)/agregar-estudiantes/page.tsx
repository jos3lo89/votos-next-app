"use client";

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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { EstudiantesSheet } from "./interfaces/estudiantes.interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

const columns: ColumnDef<EstudiantesSheet>[] = [
  {
    accessorKey: "N",
    header: "N°",
  },
  {
    accessorKey: "Codigo",
    header: "Código",
  },
  {
    accessorKey: "ApellidosNombres",
    header: "Apellidos y Nombres",
  },
  {
    accessorKey: "EscuelaProfesional",
    header: "Escuela Profesional",
  },
  {
    accessorKey: "Ciclo",
    header: "Ciclo",
  },
];

const AgregarEstudiantesPage = () => {
  const [students, setStudents] = useState<EstudiantesSheet[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  // const { toast } = useToast()

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleFetchStudentsGS = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("agregar/get-sheet");
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "No se pudo obtener la lista de estudiantes",
        duration: 2000,
        richColors: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   handleFetchStudentsGS();
  // }, []);

  const handleDeleteStudents = async () => {
    setIsDeleting(true);
    try {
      await api.delete("agregar");
      toast.success("Éxito", {
        description: "Se han borrado todos los estudiantes de la base de datos",
        duration: 2000,
        richColors: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error("Error", {
            description: error.response?.data.message,
            duration: 4000,
            richColors: true,
          });
        }
      }

      console.error(error);

      // toast.error("Error", {
      //   description: "No se pudieron borrar los estudiantes",
      //   richColors: true,
      //   duration: 2000,
      // });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRegisterStudents = async () => {
    setIsInserting(true);
    try {
      await api.get("agregar/post-students");
      toast.success("Éxito", {
        description: "Se han agregado los estudiantes a la base de datos",
        duration: 2000,
        richColors: true,
      });
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error("Error", {
            description: error.response?.data.message,
            duration: 4000,
            richColors: true,
          });
        }
      }

      console.log(error);

      // toast.error("Errorr", {
      //   description: "No se pudieron agregar los estudiantes",
      //   duration: 2000,
      //   richColors: true,
      // });
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <>
      <div className="text-center p-2 ">
        <h3 className="text-2xl font-medium">
          Agregar estudiantes desde Google Sheet
        </h3>
      </div>

      <div className="container p-2 rounded-lg bg-secondary flex justify-center gap-3">
        <Button onClick={handleFetchStudentsGS} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cargando...
            </>
          ) : (
            "Listar de Google Sheet"
          )}
        </Button>
        <Button onClick={handleRegisterStudents} disabled={isInserting}>
          {isInserting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Agregando...
            </>
          ) : (
            "Agregar a la base de datos"
          )}
        </Button>
        <Button onClick={handleDeleteStudents} disabled={isDeleting}>
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Borrando...
            </>
          ) : (
            "Borrar estudiantes de la base de datos"
          )}
        </Button>
      </div>

      {students.length >= 1 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Lista de estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Buscar estudiantes..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="max-w-sm mb-4"
            />
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
                        No se encontraron registros.
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
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AgregarEstudiantesPage;
