import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center ">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
          Página no encontrada
        </div>
        <div className="text-white mt-5">
          <h2 className="text-3xl font-semibold md:text-4xl mb-4">
            Oops! Parece que te has perdido.
          </h2>
          <p className="text-lg mb-8">
            La página que estás buscando no existe o ha sido movida.
          </p>
          <Link href="/">
            <Button className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
