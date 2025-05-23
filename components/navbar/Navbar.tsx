'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaBell, FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import useFetch from '@/hooks/useFetch';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLaptop, setIsLaptop] = useState(true);

  const { data } = useFetch<{categories: string[]}>('https://fakestoreapi.in/api/products/category');
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  // Responsive listener
  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1080);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCategoriesMenu = () => setShowCategoriesMenu(!showCategoriesMenu);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleLogout = () => {
    logout();
    router.push('/');
    setShowUserMenu(false);
  };

  return (
    <header className="w-full bg-primary p-1">
      {/* Top Bar */}
      <div className="max-w-[1200px] mx-auto px-[10px] py-[8px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="cursor-pointer">
                <Image 
                  src="/images/mercadolibre-logo.png" 
                  alt="Mercado Libre" 
                  width={134} 
                  height={34} 
                  className="h-8 w-auto"
                />
              </div>
            </Link>
            
          </div>
            {/* Search Bar - Only shown on laptop */}
            {isLaptop && (
              <div className="relative w-full max-w-[450px] mx-4">
                <input
                  type="text"
                  placeholder="Buscar productos, marcas y más..."
                  className="w-full py-2.5 px-[15px] border-0 rounded text-sm bg-white"
                />
                <button className="absolute right-0 top-0 h-full px-[10px] bg-white border-none rounded-r cursor-pointer">
                  <FaSearch className="text-gray-500" />
                </button>
              </div>
            )}

          {/* Subscription Banner - Only shown on laptop */}
          {isLaptop && (
            <div className="hidden md:block">
              <Image 
                src="/images/subscription-banner.png" 
                alt="¡Suscríbete a Meli+!"
                width={340} 
                height={39}
                className="h-10 w-auto" 
              />
            </div>
          )}
        </div>

        {/* Mobile Search (visible only on small screens) */}
        {!isLaptop && (
          <div className="w-full my-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="w-full py-2 px-[15px] border-0 rounded text-sm"
              />
              <button className="absolute right-0 top-0 h-full px-[10px] bg-white border-none rounded-r cursor-pointer">
                <FaSearch className="text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar with Navigation */}
      <div >
        <div className="max-w-[1200px] mx-auto px-[10px] flex items-center justify-between">
          {/* Location - Simplified on mobile */}
          <div className="flex items-center text-sm text-gray-700 mr-[10px]">
            <FaMapMarkerAlt className="text-gray-700" />
            {isLaptop ? (
              <div className="ml-[6px]">
                <p className="text-xs text-gray-500">Enviar a</p>
                <p>Calle Rosario del Tala</p>
              </div>
            ) : (
              <p className="text-xs ml-1">Calle Rosario del Tala</p>
            )}
          </div>

          {/* Navigation Menu - Only shown on laptop */}
          {isLaptop && (
            <nav className="flex gap-4 text-sm">
              <ul className="flex space-x-4">
                <li className="relative">
                  <button 
                    className="flex items-center text-gray-700 hover:text-gray-900"
                    onClick={toggleCategoriesMenu}
                  >
                    Categorías
                  </button>
                  {showCategoriesMenu && (
                    <div className="absolute top-full left-0 bg-white rounded-md shadow-md min-w-[230px] z-[100] mt-2">
                      <ul className="py-2">
                        {data?.categories.map((category, index) => (
                          <li key={`${category}-${index}`} className="px-4 py-2 hover:bg-gray-100">
                            <Link href={`/categorias/${category}`}>{category}</Link>
                          </li>
                        ))}
                      
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <Link href="/ofertas" className="text-gray-700 hover:text-gray-900">
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link href="/cupones" className="text-gray-700 hover:text-gray-900">
                    Cupones
                  </Link>
                </li>
                <li>
                  <Link href="/supermercado" className="text-gray-700 hover:text-gray-900">
                    Supermercado
                  </Link>
                </li>
                <li>
                  <Link href="/moda" className="text-gray-700 hover:text-gray-900">
                    Moda
                  </Link>
                </li>
                <li>
                  <Link href="/mercadoplay" className="text-gray-700 hover:text-gray-900 flex items-center">
                    Mercado Play
                    <span className="bg-[#00a650] text-white text-[0.7rem] py-[1px] px-1 rounded ml-1">Gratis</span>
                  </Link>
                </li>
                <li>
                  <Link href="/vender" className="text-gray-700 hover:text-gray-900">
                    Vender
                  </Link>
                </li>
                <li>
                  <Link href="/ayuda" className="text-gray-700 hover:text-gray-900">
                    Ayuda
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* User Menu & Cart */}
          <div className="flex items-center space-x-4 text-gray-700">
            {isAuthenticated ? (
              <>
                {/* User Menu - Simplified on mobile */}
                <div className="relative">
                  <button 
                    className="flex items-center space-x-1 text-sm"
                    onClick={toggleUserMenu}
                  >
                    <span>{user?.name}</span>
                    {isLaptop && <span className="text-xs">▼</span>}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full bg-white rounded-md shadow-md min-w-[280px] z-[100] mt-2">
                      <div className="p-4 flex items-center space-x-3 ">
                        <div className="bg-[#e5f1ff] text-[#1259c3] rounded-full w-8 h-8 flex items-center justify-center font-medium">
                          <span>{user?.name?.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <Link href="/perfil" className="text-xs text-blue-500">
                            Mi perfil
                          </Link>
                        </div>
                      </div>
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/compras">Compras</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/ventas">Ventas</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/favoritos">Favoritos</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <button onClick={handleLogout} className="w-full text-left">
                            Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Only show these on laptop */}
                {isLaptop && (
                  <>
                    <Link href="/mis-compras" className="text-sm hidden md:block">
                      Mis compras
                    </Link>
                    <Link href="/favoritos" className="hidden md:block relative">
                      <FaHeart />
                    </Link>
                  </>
                )}
                <Link href="/notificaciones" className="relative">
                  <FaBell />
                  <span className="absolute -top-[5px] -right-[5px] bg-red-500 text-white text-xs size-3 rounded-full flex items-center justify-center">1</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm">
                  Iniciar sesión
                </Link>
                {isLaptop && (
                  <Link href="/auth/register" className="text-sm">
                    Crear cuenta
                  </Link>
                )}
              </>
            )}
            
            <Link href="/cart" className="relative">
              <FaShoppingCart size={20} />
              {cart.totalItems > 0 && <span className="absolute -top-[5px] -right-[5px] bg-red-500 text-white text-xs size-3 rounded-full flex items-center justify-center">{cart.totalItems}</span>}
            </Link>
            
            {/* Mobile Menu Button - Only shown on mobile */}
            {!isLaptop && (
              <button className="md:hidden block" onClick={() => {}}>
                <FaBars />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
