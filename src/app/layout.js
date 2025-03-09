"use client";
import { useContext, useEffect } from "react";
import { Context } from "./store/appContext";
import "./globals.css";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import injectContext from "./store/appContext";

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
