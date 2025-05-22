"use client"

import {  ChevronRight, Info, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import {  useCart, Product } from "@/context/CartContext"

// Componente para cada item del carrito
const CartItem = ({
  item,
  onRemove,
}: {
  item: Product
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: number) => void
}) => {
  
  return (
    <div className="border-b pb-4">
      <div className="flex items-start pt-4">
        <div className="flex items-center h-6">
          <input type="checkbox" checked={true} className="h-4 w-4 text-blue-500 border-gray-300 rounded" readOnly />
        </div>

        <div className="ml-4 flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={80}
            height={80}
            className="rounded object-cover"
          />
        </div>

        <div className="ml-4 flex-grow">
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs text-gray-500">Sabor: {item.category}</p>

            <div className="flex space-x-4 mt-2">
              <button className="text-blue-500 text-xs font-semibold" onClick={() => onRemove(item.id)}>
                Eliminar
              </button>
              <button className="text-blue-500 text-xs font-semibold">Guardar</button>
              <button className="text-blue-500 text-xs font-semibold">Modificar</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center ml-4">
          <div className="flex items-center border rounded-md">
            {/* <button
              className={`p-1 ${item. <= 1 ? "text-gray-300" : "text-gray-700"}`}
              disabled={item.quantity <= 1}
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            >
              <Minus size={16} />
            </button> */}
            {/* <span className="px-2 text-sm">{item.quantity}</span> */}
            {/* <button className="p-1 text-gray-700" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
              <Plus size={16} />
            </button> */}
          </div>
          {/* <p className="text-xs text-gray-500 mt-1">+{item.stock} disponibles</p> */}
        </div>

        <div className="ml-4 flex flex-col items-end">
          {/* {item.discount > 0 && (
            <div className="flex items-center">
              <span className="text-xs text-green-600 font-medium mr-2">-{item.discount}%</span>
              <span className="text-xs text-gray-500 line-through">${item.originalPrice.toLocaleString("es-AR")}</span>
            </div>
          )} */}
          <div className="flex items-center">
            <Info size={14} className="text-blue-500 mr-1" />
            <span className="text-lg font-medium">${item.price.toLocaleString("es-AR")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para el resumen de precio total
const PriceTotal = ({
  total,
  shipping,
}: {
  total: number
  shipping: { cost: number; free: boolean }
}) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <h2 className="text-lg font-medium mb-4">Resumen de compra</h2>

      <div className="border-b pb-4">
        <div className="flex justify-between mb-2">
          <span>Producto</span>
          <span className="font-medium">${total.toLocaleString("es-AR")}</span>
        </div>

        <div className="flex justify-between">
          <span>Envío</span>
          {shipping.free ? (
            <span className="text-green-600 font-medium">Gratis</span>
          ) : (
            <span className="font-medium">${shipping.cost.toLocaleString("es-AR")}</span>
          )}
        </div>

        <div className="mt-2">
          <button className="text-blue-500 text-sm">Cupones (1 por aplicar)</button>
        </div>
      </div>

      <div className="flex justify-between py-4">
        <span className="text-lg font-medium">Total</span>
        <span className="text-lg font-medium">${total.toLocaleString("es-AR")}</span>
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium">
        Continuar compra
      </button>
    </div>
  )
}

// Tipos

export default function Cart() {

  const { cart } = useCart()

  console.log("cart", cart)

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda (items) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border mb-4">
              <div className="p-4 flex items-center border-b">
                <input
                  type="checkbox"
                  checked={true}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                  readOnly
                />
                <div className="ml-2">
                  <div className="flex items-center">
                    <span className="font-medium">Productos de ECOMODICO</span>
                    <ChevronRight size={16} className="ml-1 text-gray-500" />
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Tienda oficial</span>
                    <CheckCircle2 size={12} className="ml-1 text-blue-500" />
                  </div>
                </div>
              </div>
              {cart.items.map((item) => (
                <CartItem
                  key={`cart-item-${item.product.id}`}
                  item={item.product}
                  onQuantityChange={() => {}}
                  onRemove={() => {}}
                />
              ))}

              {/* Información de envío */}
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-green-600 h-2 rounded-full w-full"></div>
                </div>

                <div className="text-sm">
                  <p>
                    Aprovechá tu envío gratis agregando más productos de <span className="font-medium">ECOMODICO</span>.
                  </p>
                  <a href="#" className="text-blue-500 font-medium flex items-center mt-1">
                    Ver más productos de este vendedor
                    <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha (resumen) */}
          <div className="lg:col-span-1">
            <PriceTotal total={cart.totalPrice} shipping={{ cost: 0, free: true }} />
          </div>
        </div>
      </div>
    </div>
  )
}
