import {createContext, useContext, useState, useEffect} from "react"
import Cookies from 'js-cookie'


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

  const CART_COOKIE_KEY = 'mercadolibre_cart';

  const getInitialCartState = (): CartState => {
    const savedCart = Cookies.get(CART_COOKIE_KEY);
    return savedCart ? JSON.parse(savedCart) : defaultCartState;
  };

  interface CartContextType {
    cart: CartState;
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, quantity: number) => void;
  }

export const CartContext = createContext<CartContextType>({
    cart: defaultCartState,
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    updateQuantity: () => {}
})

export function CartProvider({children}: {children: React.ReactNode}){
    const [cart, setCart] = useState<CartState>(getInitialCartState);

    useEffect(() => {
        Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart), { expires: 7 }); // Cookie expires in 7 days
    }, [cart]);

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

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart: CartState) => {
            const newItems = prevCart.items.map(item => 
                item.product.id === id ? { ...item, quantity } : item
            );
            const newTotalItems = newItems.reduce((total, item) => total + item.quantity, 0);
            const newTotalPrice = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

            return {
                items: newItems,
                totalItems: newTotalItems,
                totalPrice: newTotalPrice
            };
        });
    };
    
    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clearCart, updateQuantity}}> {children} </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
