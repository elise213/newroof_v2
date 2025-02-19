import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions, store } = useContext(Context);
  const [cartClass, setCartClass] = useState("cartIcon");

  useEffect(() => {
    if (store.cart.length > 0) {
      setCartClass("cartIcon pulse-cart");
    }
  }, [store.cart.length]);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="cart">
          <Link href="/" passHref>
            <span className="nav-title">RICKY'S HOMESHARING</span>
          </Link>
          <div className={cartClass}>
            <Link href="/checkout" passHref>
              🛒
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
