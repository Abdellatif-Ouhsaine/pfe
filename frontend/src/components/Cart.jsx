"use client";

import { useState } from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const {id} = useParams();
  console.log(cartItems)
  console.log(id)
  //payemnt
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardError, setCardError] = useState(false);

  const toggleCheckout = () => {
    setIsCheckoutOpen(!isCheckoutOpen);
  };

const confirmpayemnt = async () => {
  const cardRegex = /^[0-9]{16}$/;

  if (paymentMethod === "card" && !cardRegex.test(cardNumber)) {
    setCardError(true);
    return;
  }

  setCardError(false);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User:", user); // suppose que user contient id, address, phone
  const user_id = user?.id;
  const delivery_address = user?.address || "N/A";
  const contact_number = user?.phone || "00000000";
  const restaurant_id = id;
  const delivery_fee = 2.99;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + delivery_fee;
  const order_number = "ORD-" + Math.floor(100000 + Math.random() * 900000); // ex: ORD-123456

  try {
    // 🟢 Étape 1 : Créer la commande
    const orderRes = await axios.post("http://localhost:8000/api/orders", {
      user_id,
      rider_id: null,
      order_number,
      status: "pending",
      delivery_address,
      restaurant_id,
      contact_number,
      special_instructions: null,
      subtotal,
      delivery_fee,
      total,
      payment_method: paymentMethod === "card" ? "credit_card" : "cash",
      payment_status: paymentMethod === "card" ? "paid" : "pending",
      delivered_at: null,
    });

    const order_id = orderRes.data.id;

    // 🟢 Étape 2 : Créer les éléments de commande
    console.log(cartItems) ;
    await Promise.all(
      cartItems.map((item) =>
        axios.post("http://localhost:8000/api/order-items", {
          order_id,
          menu_id: parseInt(item.id),
          quantity: item.quantity,
          price: item.price * item.quantity,
          special_instructions: null,
        })
      )
      
    );

    alert(`✅ Payment confirmed via ${paymentMethod === "cash" ? "Cash" : "Card"}!`);
    setShowPaymentForm(false);
    clearCart();
  } catch (error) {
  console.error("❌ Failed to place order:", error);
  if (error.response && error.response.data && error.response.data.errors) {
    console.log("📛 Laravel Validation Errors:", error.response.data.errors);
  }
  alert("An error occurred while processing your order.");
}
};


  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <h3>Your Cart</h3>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add items to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`cart ${isCheckoutOpen ? "checkout-open" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="cart-toggle" onClick={toggleCheckout}>
          {isCheckoutOpen ? "Hide" : "Checkout"}
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={`${item.id}-${item.size}`}>
            <div className="cart-item-image">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>Size: {item.size}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id, item.size)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Subtotal:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="cart-total">
          <span>Delivery Fee:</span>
          <span>$2.99</span>
        </div>
        <div className="cart-total grand-total">
          <span>Total:</span>
          <span>${(getCartTotal() + 2.99).toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <button className="btn btn-outline" onClick={clearCart}>
          Clear Cart
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShowPaymentForm(true)}
        >
          Proceed to Pay
        </button>
      </div>
      {showPaymentForm && (
        <div className="payment-form">
          <h4 className="payment-title">Choose Your Payment Method</h4>
          <div className="payment-methods">
            <label
              className={`payment-option ${
                paymentMethod === "cash" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💵 Cash on Delivery
            </label>

            <label
              className={`payment-option ${
                paymentMethod === "card" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              💳 Pay with Card
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="card-input">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234567812345678"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCardNumber(value);
                  if (value.length === 16) {
                    setCardError(false); // reset error if valid
                  }
                }}
                maxLength={16}
                className={cardError ? "input-error" : ""}
              />
            </div>
          )}

          <button className="btn btn-success" onClick={confirmpayemnt}>
            ✅ Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
