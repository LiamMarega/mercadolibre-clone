import type { Metadata } from 'next'
import localFont from 'next/font/local';


const ProximaNova = localFont({
  src: '../../lib/fonts/ProximaNova/Proxima Nova Alt Regular.otf',
})


export const metadata: Metadata = {
  title: 'Mercado Libre Clone',
  description: 'Un clon de Mercado Libre creado con Next.js por Liam Marega para practicar mis habilidades como desarrollador frontend.',
}

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${ProximaNova.className} container mx-auto max-w-7xl`}>
      {children}
    </div>
  );
}
