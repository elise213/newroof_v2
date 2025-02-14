"use client";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // cart: JSON.parse(localStorage.getItem("cart")) || [],

      cart:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cart")) || []
          : [], // only runs in browser
    },
    actions: {
      addToCart: (item) => {
        const store = getStore();
        const updatedCart = [...store.cart, item];
        setStore({ cart: updatedCart });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      },
      removeFromCart: (id) => {
        const store = getStore();
        const updatedCart = store.cart.filter((item) => item.id !== id);
        setStore({ cart: updatedCart });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      },

      clearCart: () => {
        setStore({ cart: [] });
        localStorage.removeItem("cart");
      },
    },
  };
};

export default getState;
