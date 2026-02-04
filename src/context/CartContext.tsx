import { useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import { CartContext } from './CartContextType';
import type { CartItem } from './CartContextType';

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    // Load cart from localStorage on mount
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (product: Product, quantity: number = 1) => {
        setCart((prevCart: CartItem[]) => {
            // Check if product already in cart
            const existingItem = prevCart.find(item => item.product.id === product.id);

            if (existingItem) {
                // Update quantity if already in cart
                return prevCart.map((item: CartItem) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item to cart
                return [...prevCart, { product, quantity }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId: number) => {
        setCart((prevCart: CartItem[]) => prevCart.filter(item => item.product.id !== productId));
    };

    // Update item quantity
    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart((prevCart: CartItem[]) =>
            prevCart.map((item: CartItem) =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Get cart total
    const getCartTotal = (): number => {
        return cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    // Get total item count
    const getCartCount = (): number => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
