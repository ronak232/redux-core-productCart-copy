import React, { useState } from "react";

const [cartItems, setCartItems] = useState;

export const handleIncrement = (id) => {
  setCartItems((cartItems) =>
    cartItems.map((item) =>
      id === item.id
        ? { ...item, quantity: item.quantity + (item.quantity < 20 ? 1 : 0) }
        : item
    )
  );
};
export const handleDecrement = (id) => {
  setCartItems((cartItems) =>
    cartItems.map((item) =>
      id === item.id
        ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
        : item
    )
  );
};
