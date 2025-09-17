import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TodayOrders.css";
import Header from "../../components/dashboard/Header";

export default function TodayOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const userId = JSON.parse(localStorage.getItem("user")).id;
  console.log(userId);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/orders/today`, {
        params: { user_id: userId },
      })
      .then((response) => {
        console.log("Données reçues:", response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération :", error);
      });
  }, []);

  const filteredOrders = filter
    ? orders.filter((order) => order.status === filter)
    : orders;

  return (
    <div className="today-orders-container">
      <Header />
      <div className="filters">
        <button
          onClick={() => {
            setFilter("");
            setActiveFilter("all");
          }}
          className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilter("pending");
            setActiveFilter("pending");
          }}
          className={`filter-button ${
            activeFilter === "pending" ? "active" : ""
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => {
            setFilter("delivered");
            setActiveFilter("delivered");
          }}
          className={`filter-button ${
            activeFilter === "delivered" ? "active" : ""
          }`}
        >
          Delivered
        </button>
        <button
          onClick={() => {
            setFilter("out_for_delivery");
            setActiveFilter("out for delivery");
          }}
          className={`filter-button ${
            activeFilter === "out for delivery" ? "active" : ""
          }`}
        >
          Out for Delivery
        </button>
      </div>

      <div className="orders-grid">
        {filteredOrders.length === 0 && <p>Aucune commande à afficher</p>}

        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">Commande #{order.order_number}</div>
              <div className={`order-status ${order.status}`}>
                {order.status.replace(/_/g, " ").toUpperCase()}
              </div>
            </div>

            <div className="order-details">
              <strong>Client :</strong> {order.user?.name || "Inconnu"}
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  {item.menu?.image && (
                    <img
                      src={`http://localhost:8000/storage/${item.menu?.image}`}
                      alt={item.menu.name}
                      className="item-image"
                    />
                  )}

                  <span>{item.menu?.name || "Nom inconnu"}</span>
                  <span>x {item.quantity}</span>
                  <span className="item-price">
                    {(item.menu_item?.price ?? item.price ?? 0) * item.quantity}{" "}
                    MAD
                  </span>
                </div>
              ))}
            </div>

            <div className="order-total">
              Sous-total : {order.subtotal} MAD
              <br />
              Livraison : {order.delivery_fee} MAD
              <br />
              <strong>Total : {order.total} MAD</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
