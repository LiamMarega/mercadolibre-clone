"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import GradientHoriz from "../gradient/GradientHoriz"
import ProductsCarousel from "../carousel/ProductsCarousel"

// Definición de tipos para las diapositivas
interface Slide {
  id: number
  imageUrl: string
  alt: string
  href: string
}

// Datos de ejemplo para el carrusel
const slides: Slide[] = [
  {
    id: 1,
    imageUrl: "/images/offers-carousel/beauty.webp",
    alt: "Ofertas imperdibles hasta las 00:00 hs",
    href: "/ofertas/nocturnas",
  },
  {
    id: 2,
    imageUrl: "/images/offers-carousel/products.webp",
    alt: "AHORRÁ EN GRANDE, HASTA 30% OFF Y ENVÍOS EN 24 HORAS",
    href: "/ofertas/mayoristas",
  },
  {
    id: 3,
    imageUrl: "/images/offers-carousel/meli_plus.webp",
    alt: "LANZAMIENTO MELI+",
    href: "/suscripciones/meliplus",
  },
  
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slideCount = slides.length

  // Función para navegar a la siguiente diapositiva
  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }, [isTransitioning, slideCount])

  // Función para navegar a la diapositiva anterior
  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }, [isTransitioning, slideCount])

  // Función para navegar a una diapositiva específica
  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true)
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  // Rotación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // Calcular la transformación para el carrusel
  const translateValue = -currentIndex * 100

  return (
    <section aria-label="Carrusel principal" className="relative h-screen w-screen overflow-hidden ">
      <div className="h-[60%] relative">
        <GradientHoriz />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto z-[10] h-[40%]">
          <ProductsCarousel />
        </div>

        <div className="relative h-full w-full">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translateValue}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full h-full flex-shrink-0"
                aria-hidden={currentIndex !== slide.id - 1}
                aria-label={`${slide.id} de ${slideCount}`}
              >
                <Link href={slide.href} className="block h-full w-full" tabIndex={currentIndex === slide.id - 1 ? 0 : -1}>
                  <div className="relative h-full w-full">
                    <Image
                      src={slide.imageUrl || "/placeholder.svg"}
                      alt={slide.alt}
                      fill
                      priority={slide.id === 1}
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Controles de navegación */}
          <button
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={prevSlide}
            aria-label="Anterior"
            type="button"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={nextSlide}
            aria-label="Siguiente"
            type="button"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicadores de paginación */}
          <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-400",
                  currentIndex === index ? "bg-gray-800 w-4" : "bg-gray-400 hover:bg-gray-600",
                )}
                aria-label={`Ir a la diapositiva ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
                type="button"
              />
            ))}
          </div>

          {/* Gradiente inferior para mejorar la visibilidad de los controles */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
