import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RiderTodaySummary({ riderId }) {
  const [earnings, setEarnings] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!riderId) return;

    axios
      .get(`http://localhost:8000/api/rider/${riderId}/today-summary`)
      .then((res) => {
        setEarnings(res.data.earnings);
        setOrders(res.data.orders);
      })
      .catch((err) => console.error("Erreur chargement:", err));
  }, [riderId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        💰 Gains d'aujourd'hui : {earnings.toFixed(2)} DH
      </h2>
      <h3 className="text-lg font-semibold mb-2">📦 Commandes livrées :</h3>
      <ul className="space-y-2">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id} className="cmd-aujour">
              Commande #{order.id} – Livrée à{" "}
              {new Date(order.delivered_at).toLocaleTimeString()}
            </li>
          ))
        ) : (
          <p>Aucune livraison aujourd'hui.</p>
        )}
      </ul>
    </div>
  );
}
