import { Product } from '@/context/CartContext'
import React from 'react'

export default function ProductCard({product}: {product: Product}) {
  return (
    <div className="w-full max-w-[220px] h-[320px] bg-white border border-none rounded  mx-auto">
      <a href="#" className="block h-[180px]">
        <img className="p-2 rounded-t-lg w-full h-full object-contain" src={product.image} alt="product image" />
      </a>
      <div className="px-3 pb-3 flex flex-col justify-between h-[140px]">
        <a href="#">
          <h5 className="text-sm mt-5 font-light tracking-tight text-gray-900  overflow-hidden text-ellipsis line-clamp-2">{product.title}</h5>
        </a>
        <div className="flex items-center mt-1">
          <div className="flex items-center space-x-0.5 rtl:space-x-reverse">
            <svg className="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <span className="text-xs font-semibold text-gray-600">4.5</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900 ">${product.price}</span>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
