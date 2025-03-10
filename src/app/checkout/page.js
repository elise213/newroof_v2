"use client";

import { useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Context } from "../store/appContext";
import { Avatar, Menu, MenuItem, IconButton, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const total = store.cart.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  }, [store.cart]);

  const handleCheckout = async () => {
    console.log("Starting checkout with cart:", store.cart);
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to initialize");
      alert("Stripe initialization failed. Please try again.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: store.cart }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error: ${errorText}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      if (!data.sessionId) {
        throw new Error("sessionId not found in the backend response.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert("There was an error with Stripe checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      alert("Failed to start checkout. Check the console for details.");
    }
  };

  return (
    <>
      <div className="checkoutPage">
        <Link href="/" passHref>
          <Button startIcon={<ArrowBackIosIcon />} className="backButton">
            Back to Shop
          </Button>
        </Link>
        <div className="bill-container">
          {store.cart.length > 0 ? (
            <div className="cartDiv">
              <ul>
                {store.cart.map((item, index) => (
                  <li key={index}>
                    <span className="name-checkout">
                      {item.name} Housing Group
                    </span>
                    <div>
                      <span className="price-checkout">${item.price}</span>
                      <button
                        className="remove-cart"
                        onClick={() => actions.removeFromCart(item.id)}
                        title={`Remove ${item.name} from your cart`}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="total-div">
                <span> Billed Annually</span>
                <span className="total" style={{ color: "red" }}>
                  Total: ${totalAmount}
                </span>
              </div>
              <div className="termsDiv">
                <input
                  type="checkbox"
                  className="terms_checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="terms">
                  To proceed with your purchase, it's important to understand
                  the{" "}
                  <Link className="terms-link" href="/terms" passHref>
                    rules and terms
                  </Link>{" "}
                  of the group. By checking this box, you are agreeing to these
                  terms.
                </span>
              </div>

              {isChecked ? (
                <button
                  className="addToCart"
                  style={{
                    margin: "13px 0",
                    alignSelf: "center",
                  }}
                  onClick={handleCheckout}
                >
                  Proceed to Payment
                </button>
              ) : (
                <div style={{ margin: "23px" }}></div>
              )}
            </div>
          ) : (
            <p style={{ color: "black" }}>Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
