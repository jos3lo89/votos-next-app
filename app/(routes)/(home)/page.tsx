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
        <div className="w-32 h-32 relative">
          <img
            src="https://i.pinimg.com/564x/71/74/bd/7174bd5b345599a2d7c26e71e91e14e1.jpg"
            alt="image EPIS"
            className="rounded-full"
          />
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
        <CardFooter className="flex justify-center">
          <Link href="/login">
            <Button size="lg">Ingresar al Sistema</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
export default HomePage;
