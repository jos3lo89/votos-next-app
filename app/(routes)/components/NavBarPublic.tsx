"use client";

import { ModeToggle } from "@/components/theme/ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Emitir voto",
    href: "/emitir-voto",
  },
];

const NavBarPublic = () => {
  const pathName = usePathname();

  return (
    <header className="bg-secondary py-2 px-6 shadow-md">
      <div className="container mx-auto flex justify-around md:justify-between items-center">
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold">Sistema de Votación</h1>
        </div>

        <nav className="space-x-6">
          {navLinks.map((link) => {
            const isActive = pathName.endsWith(link.href);
            return (
              <Link
                href={link.href}
                key={link.href}
                className={`font-bold ${isActive ? "text-blue-500" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <ModeToggle />
      </div>
    </header>
  );
};
export default NavBarPublic;
