
import type { Metadata } from "next";
import localFont from 'next/font/local'
import Navbar from "../components/navbar/Navbar";
import "./globals.css";



const ProximaNova = localFont({
  src: '../lib/fonts/ProximaNova/Proxima Nova Alt Regular.otf',
})

export const metadata: Metadata = {
  title: "ML Clone - Liam Marega",
  description: "Este es un clone de MercadoLibre creado por Liam Marega, para practicar mis habilidades como desarrollador frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${ProximaNova.className} antialiased`}
      >
          <Navbar />
          {children}
      </body>
    </html>
  );
}
