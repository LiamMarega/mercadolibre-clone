import ProductsCarousel from "@/components/ui/carousel/ProductsCarousel";
import HeroCarousel from "../components/hero/HeroCarousel";
import Image from "next/image";

export default function Home() {
  return (
      <main className="gap-[32px] row-start-2 items-center sm:items-start">
        <HeroCarousel />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
            <div className="bg-red-900 rounded flex flex-col md:flex-row items-center h-auto md:h-[150px]">
              <div className="flex-1 p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Perfumes de Lujo</h2>
                <p className="text-white text-sm md:text-base">Descubre nuestra colección exclusiva</p>
              </div>
              <Image 
                src="/images/offers-banner/perfum.webp" 
                alt="Perfumes de lujo" 
                width={250} 
                height={250}
                className="object-cover rounded w-full md:w-auto h-[150px] md:h-full"
              />
            </div>
            <div className="bg-blue-950 rounded flex flex-col md:flex-row items-center h-auto md:h-[150px]">
              <div className="flex-1 p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Skincare Premium</h2>
                <p className="text-white text-sm md:text-base">Cuida tu piel con lo mejor</p>
              </div>
              <Image 
                src="/images/offers-banner/skincare.webp"
                alt="Productos skincare"
                width={250}
                height={250}
                className="object-cover rounded w-full md:w-auto h-[150px] md:h-full"
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
