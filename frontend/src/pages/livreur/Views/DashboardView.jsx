import React, { useEffect, useState } from "react";
import RiderStatus from "./RiderStatus";
import RiderTodaySummary from "./RiderTodaySummary";
import axios from "axios";

export function DashboardView() {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("available"); // statut actuel du rider
  const [loading, setLoading] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  const riderId = JSON.parse(localStorage.getItem("user")).id
  useEffect(() => {
    const riderId = JSON.parse(localStorage.getItem("user")).id

    axios
      .get(`http://localhost:8000/api/orders/rider/order?rider_id=${riderId}`)
      .then((res) => {
        setOrder(res.data);
        setOrderItems(res.data.items);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération de la commande :", err);
      });
  }, []);

  return (
    <div className="dlvr-dashboard">
      <h1 className="dlvr-heading">Welcome back, livreur</h1>
      {/* Cartes d'information */}
      <div className="dlvr-stats-grid">
        <RiderStatus riderId={riderId} />
        <RiderTodaySummary riderId={riderId} />


      </div>
      {/* Détails de la commande */}

      {order && (
        <>
          {/* Détails de la commande */}
          <section className="dlvr-panel">
            <h2 className="dlvr-panel-title">Order Details</h2>
            <div className="dlvr-details-list">
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">🍽️</span>
                  <span>Restaurant</span>
                </div>
                <div className="dlvr-detail-value">
                  {order.restaurant?.name}
                </div>
              </div>
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">📍</span>
                  <span>Pickup Address</span>
                </div>
                <div className="dlvr-detail-value">
                  {order.restaurant?.address}
                </div>
              </div>
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">👤</span>
                  <span>Customer</span>
                </div>
                <div className="dlvr-detail-value">{order.user?.name}</div>
              </div>
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">🏠</span>
                  <span>Delivery Address</span>
                </div>
                <div className="dlvr-detail-value">
                  {order.delivery_address}
                </div>
              </div>
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">📞</span>
                  <span>Contact</span>
                </div>
                <div className="dlvr-detail-value">{order.contact_number}</div>
              </div>
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">💳</span>
                  <span>Payment</span>
                </div>
                <div className="dlvr-detail-value">
                  {order.payment_status} - {order.payment_method}
                </div>
              </div>
              <div className="dlvr-detail-item">
                <div className="dlvr-detail-key">
                  <span className="dlvr-detail-symbol">💵</span>
                  <span>Delivery Fee</span>
                </div>
                <div className="dlvr-detail-value">
                  {order.delivery_fee} DH (You earn: 3.50 DH)
                </div>
              </div>
            </div>
          </section>

          {/* Articles */}
          <section className="dlvr-panel">
            <h2 className="dlvr-panel-title">Order Items</h2>
            <div className="dlvr-food-list">
              {orderItems?.map((item, index) => (
                <div key={index} className="dlvr-food-item">
                  <div className="dlvr-food-pic">
                    <img
                      src={`http://localhost:8000/storage/${item.menu?.image}`}
                      alt={item.menu?.name}
                    />
                  </div>
                  <div className="dlvr-food-info">
                    <h4 className="dlvr-food-name">{item.menu?.name}</h4>
                    <p className="dlvr-food-desc">
                      {item.special_instructions || `Qty: ${item.quantity}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
