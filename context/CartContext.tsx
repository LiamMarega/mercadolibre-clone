import {createContext, useState} from "react"


export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  }
  


export const CartContext = createContext({})

export function CartProvider({children}: {children: React.ReactNode}){
    const [cart, setCart] = useState<CartState>({items: [], totalItems: 0, totalPrice: 0})

    const addItem = (item: Product) => {
        setCart((prevCart: CartState) => ({...prevCart, items: [...prevCart.items, {product: item, quantity: 1}]}))
    }

    const removeItem = (id: number) => {
        setCart((prevCart: CartState) => ({...prevCart, items: prevCart.items.filter((item) => item.product.id !== id)}))
    }


    const clearCart = () => {
        setCart({items: [], totalItems: 0, totalPrice: 0})
    }
    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clearCart}}> {children} </CartContext.Provider>
    )
}
