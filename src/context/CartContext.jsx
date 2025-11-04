import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen((s) => !s);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQuantity = (id, qty) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p))
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const gstRate = 0.18; // 18% GST
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        gst,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
