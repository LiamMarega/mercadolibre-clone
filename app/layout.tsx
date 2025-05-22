'use client'
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

      <body
        >
          <CartProvider>
          <Navbar />
          {children}
          </CartProvider>
      </body>
    </html>
  );
}
