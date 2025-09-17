import React, { useEffect, useState } from "react";
import axios from "axios";

const STATUS_ORDER = ["available", "on_delivery", "on_break", "offline"];
const STATUS_LABELS = {
  available: "Disponible",
  on_delivery: "En livraison",
  on_break: "En pause",
  offline: "Offline",
};
const STATUS_COLORS = {
  available: "#4caf50",
  on_delivery: "#2196F3",
  on_break: "#FFC107",
  offline: "#F44336",
};

export default function RiderStatus({ riderId = 2 }) {
  const [status, setStatus] = useState("available");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/rider/status?rider_id=${riderId}`)
      .then((res) => setStatus(res.data.status))
      .catch((err) => console.error("Erreur statut:", err));
  }, [riderId]);

  const updateStatus = (newStatus) => {
    if (loading || status === newStatus) return;
    setLoading(true);
    axios
      .post(`http://localhost:8000/api/rider/status?rider_id=${riderId}`, {
        status: newStatus,
      })
      .then((res) => {
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Position du toggle (0 à 3)
  const activeIndex = STATUS_ORDER.indexOf(status);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 350,
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Statut du livreur</h3>

      {/* Toggle Switches */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
        {STATUS_ORDER.map((key, i) => (
          <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Label */}
            <span style={{ fontSize: 16, fontWeight: "bold" }}>{STATUS_LABELS[key]}</span>

            {/* Toggle Switch */}
            <label
              className="toggle-switch"
              style={{
                position: "relative",
                width: "60px",
                height: "30px",
                borderRadius: "15px",
                background: status === key ? STATUS_COLORS[key] : "#ddd",
                cursor: loading ? "not-allowed" : "pointer",
                userSelect: "none",
                transition: "background 0.3s ease",
                pointerEvents: loading ? "none" : "auto",
              }}
            >
              <input
                type="checkbox"
                checked={status === key}
                onChange={() => !loading && updateStatus(key)}
                style={{ opacity: 0, position: "absolute", zIndex: -1 }}
              />
              <span
                className="slider round"
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: status === key ? "calc(100% - 20px)" : "5px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  transition: "left 0.3s ease",
                }}
              ></span>
            </label>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: 20 }}>
        Statut actuel : <strong style={{ color: STATUS_COLORS[status] }}>{status}</strong>
      </p>
    </div>
  );
}
