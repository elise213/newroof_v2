"use client";
import { useContext, useEffect } from "react";
import { Context } from "./store/appContext";

import Link from "next/link";
import "./globals.css";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import injectContext from "./store/appContext";

// Wrap the entire RootLayout in injectContext
const RootLayoutWithContext = injectContext(({ children }) => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.initCart();
  }, []);

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
});

export default RootLayoutWithContext;
