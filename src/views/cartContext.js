// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart"));
    return storedCartItems ? storedCartItems.map(item => ({ ...item, quantity: 1 })) : [];
  });

  const addItemToCart = (item) => {
    const existingItemIndex = cart.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cart];
      updatedCartItems[existingItemIndex].quantity += item.quantity;
      setCart(updatedCartItems);
    } else {
      setCart([...cart, item]);
    }
  };

  const subtractItemFromCart = (item) => {
    const existingItemIndex = cart.findIndex((i) => i.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cart];
      // Check if the quantity of the existing item is greater than 1 before subtracting
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity -= 1; // Subtract one from the quantity
      } else {
        updatedCartItems.splice(existingItemIndex, 1); // Remove the item from the array if quantity becomes 0
      }
      setCart(updatedCartItems);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addItemToCart, subtractItemFromCart, removeItemFromCart, getTotalPrice, getCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
