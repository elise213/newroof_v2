"use client"; // Required for stateful client components

import { useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Context } from "../store/appContext";
import { Footer } from "../component/footer";
import { Avatar, Menu, MenuItem, IconButton, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

// Load Stripe (Uses Next.js Env Variable)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  // Calculate total amount when the cart changes
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: store.cart }),
        }
      );

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
    <div className="checkoutPage">
      {/* Back to Shop Button */}
      <Link href="/">
        <Button startIcon={<ArrowBackIosIcon />} className="backButton">
          Back to Shop
        </Button>
      </Link>

      {store.cart.length > 0 ? (
        <div className="cartDiv">
          <ul>
            {store.cart.map((item, index) => (
              <li key={index}>
                <span className="name-checkout">{item.name} Housing Group</span>
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
            <span className="total">Total: ${totalAmount}</span>
          </div>

          {/* Terms Agreement */}
          <div className="termsDiv">
            <input
              type="checkbox"
              className="terms_checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              style={{ accentColor: "white" }}
            />
            <span className="terms">
              To proceed with your purchase, it's important to understand the{" "}
              <Link href="/terms">rules and terms</Link> of the group. By
              checking this box, you are agreeing to these terms.
            </span>
          </div>

          {isChecked ? (
            <button
              className="addToCart"
              style={{ borderRadius: "4px", margin: "13px 0" }}
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

      <Footer />
    </div>
  );
};

export default Checkout;
