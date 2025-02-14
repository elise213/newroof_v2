import os
from flask import Blueprint, request, jsonify
import stripe
from dotenv import load_dotenv
from flask_migrate import Migrate


load_dotenv()
# Initialize Stripe

stripe.api_key = os.environ.get("FLASK_APP_STRIPE_SECRET_KEY")

# Create a Blueprint
api = Blueprint("api", __name__)

YOUR_DOMAIN = "https://sample-service-name-zl0v.onrender.com/"


@api.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Backend is running!"})


@api.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    print("Received request to /create-checkout-session")
    try:
        data = request.get_json()  # Parse the JSON payload from frontend
        print("data", data)
        cart = data.get("cart")

        if not cart or not isinstance(cart, list):
            return jsonify({"error": "Cart must be a non-empty array"}), 400

        # Create line items for each product in the cart
        line_items = [
            {
                "price": item["stripePriceId"],  # Use stripePriceId from the cart
                "quantity": 1,  # Each product is added once
            }
            for item in cart
        ]

        # Create a Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="subscription",
            phone_number_collection={"enabled": True},
            success_url=YOUR_DOMAIN + "return?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=YOUR_DOMAIN + "checkout",
        )

        print(f"Session created with ID: {session.id}")
        return jsonify({"sessionId": session.id})  # Return the sessionId
    except Exception as e:
        print(f"Error creating checkout session: {e}")
        return jsonify({"error": str(e)}), 400


@api.route("/session-status", methods=["GET"])
def session_status():
    session_id = request.args.get("session_id")
    print(f"Session ID received: {session_id}")

    if not session_id:
        return jsonify({"error": "session_id is required"}), 400

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        print(f"Retrieved session: {session}")
        return jsonify(
            status=session.status,
            customer_email=(
                session.customer_details.email if session.customer_details else None
            ),
        )
    except stripe.error.InvalidRequestError as e:
        print(f"Stripe InvalidRequestError: {e}")
        return jsonify({"error": "Invalid session_id"}), 400
    except Exception as e:
        print(f"General error retrieving session: {e}")
        return jsonify({"error": str(e)}), 500
