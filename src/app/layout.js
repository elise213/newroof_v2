"use client"; // Required for stateful components

import Link from "next/link";
import "./globals.css";
import injectContext from "./store/appContext.js";

export default function RootLayout({ children }) {
  const StoreWrapper = injectContext(({ children }) => <>{children}</>);

  return (
    <html lang="en">
      <body>
        <StoreWrapper>
          {/* <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/checkout">Checkout</Link>
              </li>
              <li>
                <Link href="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </nav> */}

          <main>{children}</main>
        </StoreWrapper>
      </body>
    </html>
  );
}
