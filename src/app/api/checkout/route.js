import { NextResponse } from "next/server";
import Stripe from "stripe";

// Load Stripe Secret Key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(req) {
  try {
    console.log("Received request to /api/checkout");

    const { cart } = await req.json(); // Parse JSON request body
    console.log("Cart data:", cart);

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart must be a non-empty array" },
        { status: 400 }
      );
    }

    // Convert cart items into Stripe's line item format
    const lineItems = cart.map((item) => ({
      price: item.stripePriceId, // Stripe price ID
      quantity: 1, // Default to 1 per item
    }));

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "subscription", // Ensure it matches your pricing model
      phone_number_collection: { enabled: true },
      success_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/checkout`,
    });

    console.log(`Stripe session created: ${session.id}`);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
