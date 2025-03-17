import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems with data from localStorage (if available)
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Persist cartItems to localStorage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totalAmount using useMemo to avoid unnecessary recalculations
  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
