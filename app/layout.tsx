import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const ProximaNova = localFont({
  src: '../lib/fonts/ProximaNova/Proxima Nova Alt Regular.otf',
})

export const metadata: Metadata = {
  title: 'Mercado Libre Clone',
  description: 'Un clon de Mercado Libre creado con Next.js por Liam Marega para practicar mis habilidades como desarrollador frontend.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={ProximaNova.className}>
      <body>
        <Providers>
          <Navbar />
            {children}
        </Providers>
      </body>
    </html>
  );
}
