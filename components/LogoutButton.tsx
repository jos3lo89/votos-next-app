"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button variant="destructive" onClick={handleClick} className="w-full">
      <LogOutIcon className="mr-2 h-4 w-4" />
      Cerrar sesión
    </Button>
  );
};
export default LogoutButton;
