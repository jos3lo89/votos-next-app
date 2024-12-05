import { useForm } from "react-hook-form";
import { Formfields, inputSchema } from "../schemas/emitirVoto.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type BuscarEstudianteFormProps = {
  onBuscarEstudiante: (codigo: string) => Promise<void>;
  isLoading: boolean;
};

const BuscarEstudianteForm = ({
  onBuscarEstudiante,
  isLoading,
}: BuscarEstudianteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Formfields>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      codigo: "",
    },
  });

  const onSubmit = (values: Formfields) => {
    onBuscarEstudiante(values.codigo);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-4 justify-center"
    >
      <div>
        <Input
          type="text"
          placeholder="Ingrese código del estudiante"
          {...register("codigo")}
          className="flex-grow"
        />
        {errors.codigo && (
          <span className="text-red-600 text-sm">{errors.codigo.message}</span>
        )}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default BuscarEstudianteForm;
