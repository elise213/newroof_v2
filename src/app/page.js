"use client"; // Required for stateful components
import { useContext } from "react";
import Link from "next/link";
import { Context } from "./store/appContext";
import { Footer } from "./component/footer";
import Image from "next/image";

// Product list
const products = [
  {
    id: 1,
    name: "NEW YORK",
    image: "🍎",
    wa: "/img/WhatsAppNY.svg.png", // ✅ Use relative path
    price: 25,
    stripePriceId:
      // "price_1Q0AOfFOQNBOjDBoAfsHiP28",
      "price_1Q0RCcFOQNBOjDBok9tLKmc3",
  },
  {
    id: 2,
    name: "LA",
    image: "🎥",
    wa: "/img/WhatsAppLA.svg.png", // ✅ Use relative path
    price: 25,
    stripePriceId: "price_1Q0REKFOQNBOjDBoARzVNljt",
    // "price_1Q0AUyFOQNBOjDBoLQShBVIX",
  },
  {
    id: 3,
    name: "MIAMI",
    image: "🌴",
    wa: "/img/WhatsAppMI.svg.png", // ✅ Use relative path
    price: 25,
    stripePriceId:
      // "price_1Q0ASpFOQNBOjDBoXfBS7u3U",
      "price_1Q0RDVFOQNBOjDBo0S4Eh7RY",
  },
];

export default function Home() {
  const { store, actions } = useContext(Context);

  return (
    <div className="page">
      {/* Header */}
      <div className="cart">
        <span className="nav-title">RICKY'S HOMESHARING</span>
        <div
          className={`cartIcon ${store.cart.length > 0 ? "pulse-cart" : ""}`}
        >
          <Link href="/checkout">🛒</Link>
        </div>
      </div>

      {/* Product List */}
      <div className="productList">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="home-group">
              <div className="card-top">
                <span className="price">${product.price}</span>
                <p className="one-year-text">One Year Subscription</p>
              </div>
              <div className="product-text-div">
                <p className="product-card-text">{product.name}</p>
              </div>

              <div className="group-div">
                <div className="city-image">{product.image}</div>
                {store.cart.some((item) => item.id === product.id) ? (
                  <span className="in-cart-text">* In your cart</span>
                ) : (
                  <button
                    className="addToCart"
                    onClick={() => actions.addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
