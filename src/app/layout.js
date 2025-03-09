"use client"; // Required for stateful components

import Link from "next/link";
import "./globals.css";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import injectContext from "./store/appContext";

export default function RootLayout({ children }) {
  const StoreWrapper = injectContext(({ children }) => <>{children}</>);

  return (
    <StoreWrapper>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </StoreWrapper>
  );
}
