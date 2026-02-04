import { useContext } from 'react';
import { CartContext } from '../context/CartContextType';
import type { CartContextType } from '../context/CartContextType';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};