import { CartProvider, Product, useCart } from '@/context/CartContext'
import React from 'react'

export default function AddToCartButton({product}: {product: Product}) {
  const { addItem} = useCart()

  return (
    <CartProvider>
    <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900 ">${product.price.toLocaleString("es-AR")}</span>
          <button  onClick={() => addItem(product)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Agregar a favoritos
          </button>
        </div>
    </CartProvider>
  )
}
