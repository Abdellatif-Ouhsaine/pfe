import React, { useEffect, useState } from "react";
import axios from "axios";

export function TrackOrderView() {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const riderId = JSON.parse(localStorage.getItem("user")).id // ✅ À remplacer par l’ID réel du livreur connecté

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get(`http://localhost:8000/api/orders/delivered/${riderId}`)
      .then((response) => {
        setOrders(response.data);

        // Vérifie si une commande est en cours de livraison pour ce rider
        const myOrder = response.data.find(
          (order) =>
            order.rider_id === riderId && order.status === "out_for_delivery"
        );
        setCurrentOrder(myOrder ? myOrder.id : null);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des commandes :", error);
      });
  };

  const handleAssign = async (orderId) => {
    if (currentOrder) {
      window.alert(
        "❌ Vous avez déjà une commande en cours. Livrez-la d’abord !"
      );
      return;
    }
    try {
      await axios.patch(`http://localhost:8000/api/orders/${orderId}/assign`, {
        rider_id: riderId,
      });

      alert("✅ Vous avez accepté la commande. Livraison dans 20 minutes !");
      setCurrentOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.error("Erreur lors de l'assignation :", error);
      alert("❌ Impossible de prendre cette commande.");
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/orders/${orderId}/delivered`
      );
      alert("✅ Livraison terminée !");
      setCurrentOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Erreur lors de la livraison :", error);
      alert("❌ Impossible de marquer comme livrée.");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.order_number.toString().includes(searchTerm)
  );

  return (
    <div className="dlvr-track-view">
      <h1 className="dlvr-heading">Track Orders</h1>

      <div className="dlvr-search-bar">
        <input
          type="text"
          placeholder="🔍 Rechercher par numéro de commande..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dlvr-input"
        />
      </div>

      <div className="dlvr-orders-list">
        {filteredOrders.map((order) => (
          <div key={order.id} className="dlvr-order-box">
            <div className="dlvr-order-top">
              <h3>Commande #{order.order_number}</h3>
              <span className="dlvr-order-badge dlvr-badge-done">
                {order.status === "delivered"
                  ? "✅ Livrée"
                  : order.rider_id
                  ? "🚚 En cours"
                  : "📦 En attente"}
              </span>
            </div>

            <div className="dlvr-order-content">
              <p>
                <strong>Restaurant:</strong>{" "}
                {order.restaurant?.name || "Inconnu"}
              </p>
              <p>
                <strong>Adresse:</strong> {order.delivery_address}
              </p>
              <p>
                <strong>Total:</strong> {order.total} MAD
              </p>
              <p>
                <strong>Payment:</strong> {order.payment_method} (
                {order.payment_status})
              </p>
              <p>
                <strong>Instructions:</strong> {order.special_instructions}
              </p>
            </div>

            {/* Si la commande n’a pas encore de rider, afficher bouton */}
            {!order.rider_id && (
              <button
                className="dlvr-button dlvr-button-green"
                onClick={() => handleAssign(order.id)}
                // ⛔ Désactivé si une commande est en cours
              >
                🚚 Choisir cette commande
              </button>
            )}

            {/* Si cette commande est en cours pour ce rider */}
            {order.rider_id === riderId &&
              order.status === "out_for_delivery" && (
                <div className="dlvr-delivery-info">
                  <p>⏳ Cette commande est en cours de livraison.</p>
                  <button
                    className="dlvr-button dlvr-button-blue"
                    onClick={() => handleMarkAsDelivered(order.id)}
                  >
                    ✅ Terminer la livraison
                  </button>
                </div>
              )}

            {/* Si la commande est déjà livrée par ce rider */}
            {order.rider_id === riderId && order.status === "delivered" && (
              <div className="dlvr-delivery-info">
                <p>📦 Cette commande a été livrée.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
