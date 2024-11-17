import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

// Define las rutas públicas, privadas y de autenticación
const publicRoutes = ["/", "/emitir-voto"];
const privateRoutes = ["/dashboard", "/alumnos", "/perfil"];
const authRoutes = ["/login"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Cambia a "true" si el usuario está autenticado

  console.log({ isLoggedIn, path: nextUrl.pathname });

  // Permitir acceso a las rutas de API de autenticación sin importar el estado de autenticación
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // Permitir acceso a rutas públicas sin importar el estado de autenticación
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirigir al usuario logueado fuera de las rutas de autenticación
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", nextUrl)); // Redirecciona a /home si intenta ir a /login ya estando autenticado
  }

  // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta privada
  if (!isLoggedIn && privateRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Permitir el acceso a rutas privadas si el usuario está autenticado
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
