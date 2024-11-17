import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className=" flex flex-col items-center justify-center  p-4">
      <div className="mb-8">
        <div className="w-52 h-auto relative">
          <img src="logoepis.png" alt="image EPIS" />
        </div>
      </div>

      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Sistema de Votación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Bienvenido al sistema de votación para las elecciones del Centro
            Federado de la carrera de Ingeniería de Sistemas
          </p>
        </CardContent>
        <CardFooter className="flex justify-center flex-col items-center gap-5">
          <Link href="/emitir-voto">
            <Button size="lg" variant="outline" className="hover:bg-blue-600">Emitir voto</Button>
          </Link>
          <Link href="/dashboard" className="text-blue-500 font-light text-sm ">Ingresar al sistema</Link>
        </CardFooter>
      </Card>
    </div>
  );
};
export default HomePage;
