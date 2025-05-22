import {createContext, useContext, useState} from "react"


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
  

  const defaultCartState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0
  };


  interface CartContextType {
    cart: CartState;
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
  }

export const CartContext = createContext<CartContextType>({
    cart: defaultCartState,
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {}
})

export function CartProvider({children}: {children: React.ReactNode}){
    const [cart, setCart] = useState<CartState>(defaultCartState)

    const addItem = (item: Product) => {
        setCart((prevCart: CartState) => {
            const existingItemIndex = prevCart.items.findIndex(
                (cartItem) => cartItem.product.id === item.id
            );

            let newItems;
            if (existingItemIndex > -1) {
                // Item exists, increment quantity
                newItems = [...prevCart.items];
                newItems[existingItemIndex].quantity += 1;
            } else {
                // New item
                newItems = [...prevCart.items, { product: item, quantity: 1 }];
            }

            const newTotalItems = newItems.reduce((total, item) => total + item.quantity, 0);
            const newTotalPrice = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

            return {
                items: newItems,
                totalItems: newTotalItems,
                totalPrice: newTotalPrice
            };
        });
    };

    const removeItem = (id: number) => {
        setCart((prevCart: CartState) => {
            const newItems = prevCart.items.filter((item) => item.product.id !== id);
            const newTotalItems = newItems.reduce((total, item) => total + item.quantity, 0);
            const newTotalPrice = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

            return {
                items: newItems,
                totalItems: newTotalItems,
                totalPrice: newTotalPrice
            };
        });
    };

    const clearCart = () => {
        setCart(defaultCartState);
    }
    
    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clearCart}}> {children} </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
