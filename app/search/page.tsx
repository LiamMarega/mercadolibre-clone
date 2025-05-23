import React from 'react'

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { query?: string } 
}) {
  const searchQuery = searchParams.query;

  if (!searchQuery) {
    return (
      <div className='flex flex-col items-center justify-center h-screen max-w-2xl m-auto text-center'>
        Por favor ingresa un término de búsqueda
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen max-w-2xl m-auto text-center'>
        No se encontró el producto <span className="font-semibold"> {searchQuery} </span>
        <br />
        Todavia no se implementa esta funcionalidad ya que la api no tiene filtros para buscar productos por nombre
        <span className='text-blue-500'> 
          <a href="https://fakestoreapi.in/docs" target="_blank" rel="noopener noreferrer">
            https://fakestoreapi.in/docs
          </a>
        </span>
    </div>
  )
}
