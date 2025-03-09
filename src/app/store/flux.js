const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      cart: [],
    },
    actions: {
      initCart: () => {
        if (typeof window !== "undefined") {
          const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
          setStore({ cart: savedCart });
        }
      },
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
