import ProductsCarousel from "@/components/ui/carousel/ProductsCarousel";
import HeroCarousel from "../components/ui/hero/HeroCarousel";
import Image from "next/image";

export default function Home() {
  return (
      <main className="gap-[32px] row-start-2 items-center sm:items-start">
        <HeroCarousel />
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-red-900 rounded flex items-center h-[150px]">
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Perfumes de Lujo</h2>
                <p className="text-white">Descubre nuestra colección exclusiva</p>
              </div>
              <Image 
                src="/images/offers-banner/perfum.webp" 
                alt="Perfumes de lujo" 
                width={250} 
                height={250}
                className="object-cover rounded h-full"
              />
            </div>
            <div className="bg-blue-950 rounded flex items-center h-[150px]">
              <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Skincare Premium</h2>
                <p className="text-white">Cuida tu piel con lo mejor</p>
              </div>
              <Image 
                src="/images/offers-banner/skincare.webp"
                alt="Productos skincare"
                width={250}
                height={250}
                className="object-cover rounded h-full"
              />
            </div>
          </div>
          
        </div>
        <div className=" m-20 p-5 max-w-6xl mx-auto bg-white rounded">
          <h1 className="text-2xl font-bold">Productos</h1>
          <ProductsCarousel />
        </div>

      </main>
  );
}
