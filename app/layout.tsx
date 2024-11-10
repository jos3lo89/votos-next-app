import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/config/environment.vars";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";

const geistSans = localFont({
  // src: "./fonts/GeistVF.woff",
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  // src: "./fonts/GeistMonoVF.woff",
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "votación EPIS",
  description: "Elecciones del centro federado en EPIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
