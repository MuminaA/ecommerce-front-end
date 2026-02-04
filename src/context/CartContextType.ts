import { createContext } from 'react';
import type { Product } from '../types/Product';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);