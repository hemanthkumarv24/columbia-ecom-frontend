import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface CartContextType {
  cartCount: number;
  refreshCartCount: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCartCount: () => {},
});

const cartApiUrl = import.meta.env.VITE_CART_API_URL;
//const userId = 1; // Replace with dynamic user ID if available

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userid = useSelector((state: RootState) => state.auth.userID);
  const [cartCount, setCartCount] = useState<number>(0);

  const refreshCartCount = async () => {
    try {
      const response = await axios.get(`${cartApiUrl}/Cart/count/${userid}`);
      setCartCount(response.data);
    } catch (error) {
      console.error('Failed to fetch cart count');
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
