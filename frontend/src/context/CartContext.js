import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage se purani states uthana
  const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

  const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'PayPal';

  // State Declarations
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);
  const [shippingAddress, setShippingAddress] = useState(shippingAddressFromStorage);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStorage);

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  }, [paymentMethod]);

  // Actions
  const addToCart = (product, qty) => {
    // Check if item already exists by comparing _id or product id
    const existItem = cartItems.find((x) => (x._id === product._id || x.product === product._id));
    
    if (existItem) {
      setCartItems(cartItems.map((x) => 
        (x._id === product._id || x.product === product._id) ? { ...existItem, qty } : x
      ));
    } else {
      // 🔥 MAGIC LINE: Humne product._id ko 'product' key ke naam se bhi jod diya taaki backend khush rahe!
      setCartItems([...cartItems, { ...product, product: product._id, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id && x.product !== id));
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        paymentMethod,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};