'use client';

import ZoomImage from "@/app/components/ZoomImage";
import AddToCartButton from "@/components/button/AddToCartButton";
import { Product } from "@/context/CartContext";

export default function ProductDetails({ data }: { data: Product }) {

  return (
    <div className="bg-white rounded-lg m-10 p-4 flex flex-col items-start justify-center gap-4">
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4">
                <div className="size-20 aspect-square bg-gray-200" />
                <div className="size-20 aspect-square bg-gray-200" />
                <div className="size-20 aspect-square bg-gray-200" />
                <div className="size-20 aspect-square bg-gray-200" />
                <div className="size-20 aspect-square bg-gray-200" />
            </div>
            <ZoomImage 
                src={data.image} 
                alt={data.title}  
                className="aspect-square size-[800px]" 
            />
            <div className="flex flex-col p-8">
                <h3 className="text-2xl font-bold">{data.title}</h3>
                <p className="text-3xl font-extralight pt-5">${data.price}</p>
                <p className="font-extralight text-green-500">Mismo precio en 3 cuotas de ${(data.price / 3).toFixed(2)}</p>
                <span className="font-extralight text-gray-500">o en cuotas sin tarjeta</span>
                <div className="flex flex-row gap-4 pt-10">
                    <AddToCartButton product={data} showPrice={false} />
                    <button className=" bg-blue-300 cursor-not-allowed text-blue-500 focus:ring-2 focus:outline-none font-medium rounded text-xs px-3 py-1.5 text-center ">Comprar ahora</button>
                </div>
            </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Descripción</h3>
            <p className="text-gray-500">{data.description}</p>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Categoría</h3>
            <p className="text-gray-500">{data.category}</p>
        </div>

        <div className="flex gap-4">
            <div className="w-[60%]">
            <FakeTableData />
            </div>
            <FakeTableData />
        </div>
    </div>
  );
} 



function FakeTableData() {
    return (
  
                  <table className="w-full">
                      <tbody>
                          <tr className="bg-white">
                              <td className="p-4">Marca</td>
                              <td className="p-4">TechCorp</td>
                          </tr>
                          <tr className="bg-gray-50">
                              <td className="p-4">Modelo</td>
                              <td className="p-4">X200</td>
                          </tr>
                          <tr className="bg-white">
                              <td className="p-4">Color</td>
                              <td className="p-4">Negro</td>
                          </tr>
                          <tr className="bg-gray-50">
                              <td className="p-4">Peso</td>
                              <td className="p-4">1.5 kg</td>
                          </tr>
                          <tr className="bg-white">
                              <td className="p-4">Dimensiones</td>
                              <td className="p-4">30 x 20 x 10 cm</td>
                          </tr>
                      </tbody>
                  </table>
          
    )
  }
  