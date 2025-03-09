"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store } = useContext(Context);
  const [cartClass, setCartClass] = useState("cartIcon");
  const pathname = usePathname();

  useEffect(() => {
    if (store.cart.length > 0) {
      setCartClass("cartIcon pulse-cart");
    }
  }, [store.cart.length]);

  return (
    <>
      {pathname !== "/checkout" && pathname !== "/terms" && (
        <nav className="navbar">
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
        </nav>
      )}
    </>
  );
};
