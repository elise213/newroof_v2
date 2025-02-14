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
    name: "New York",
    image: "🍎",
    wa: "/img/WhatsAppNY.svg.png", // ✅ Use relative path
    price: 25,
    stripePriceId: "price_1Q0AOfFOQNBOjDBoAfsHiP28",
  },
  {
    id: 2,
    name: "Los Angeles",
    image: "🎥",
    wa: "/img/WhatsAppLA.svg.png", // ✅ Use relative path
    price: 25,
    stripePriceId: "price_1Q0AUyFOQNBOjDBoLQShBVIX",
  },
  {
    id: 3,
    name: "Miami",
    image: "🌴",
    wa: "/img/WhatsAppMI.svg.png", // ✅ Use relative path
    price: 25,
    stripePriceId: "price_1Q0ASpFOQNBOjDBoXfBS7u3U",
  },
];

export default function Home() {
  const { store, actions } = useContext(Context);

  return (
    <div className="page">
      {/* Header */}
      <div className="cart">
        <span className="nav-title">RICKY'S HOMESHARING</span>
        <div className="cartIcon">
          <Link href="/checkout">
            🛒
            {/* {store.cart.length > 0 && (
              <button className="go-to-cart">GO TO CART </button>
            )} */}
          </Link>
        </div>
      </div>

      {/* Product List */}
      <div className="productList">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="home-group">
              <div className="card-top">
                <span className="price">${product.price}</span>
                <p className="one-year-text">Annual Subscription!</p>
              </div>
              <div className="group-div">
                <div className="city-image">{product.image}</div>
                <div className="product-text-div">
                  <p className="product-card-text">{product.name}</p>
                  {/* <p className="product-card-text">
                    Housing Group Subscription
                  </p> */}
                </div>
              </div>
              {/* Display WhatsApp Image */}
              {/* <Image
                src={product.wa}
                alt={`WhatsApp for ${product.name}`}
                width={50}
                height={50}
              /> */}

              {store.cart.some((item) => item.id === product.id) ? (
                <span className="in-cart-text">* In your cart</span>
              ) : (
                <button
                  className="addToCart"
                  onClick={() => actions.addToCart(product)}
                >
                  {/* <span class="material-icons">add</span> */}
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
