import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ProfileView() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const riderId = JSON.parse(localStorage.getItem("user")).id

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/riders/${riderId}/profile`
        );
        setDriver(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div>Chargement du profil...</div>;
  if (!driver) return <div>Aucun profil trouvé.</div>;

  return (
    <div className="dlvr-profile-view">
      <h1 className="dlvr-heading">Votre Profil</h1>
      <div className="dlvr-profile-grid">
        {/* Profile Section */}
        <section className="dlvr-panel dlvr-profile-section">
          <div className="dlvr-profile-header">
            <div className="dlvr-profile-avatar">
              {driver.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="dlvr-profile-info">
              <h2>{driver.name}</h2>
              <p className="dlvr-profile-title">Livreur</p>
              <div className={`dlvr-status-indicator ${driver.status}`}>
                <span className="dlvr-status-dot"></span>
                {driver.status === "available"
                  ? "Disponible"
                  : driver.status === "on_delivery"
                  ? "En livraison"
                  : driver.status === "on_break"
                  ? "En pause"
                  : "Hors ligne"}
              </div>
            </div>
          </div>
          <button
            className="dlvr-button dlvr-button-light dlvr-full-width"
            onClick={() => navigate(`/livreur/riders/${riderId}/edit`)}
          >
            Modifier le profil
          </button>
          <div className="dlvr-profile-details">
            <h3 className="dlvr-section-title">Coordonnées</h3>
            <div className="dlvr-detail-item">
              <span className="dlvr-detail-label">Téléphone</span>
              <span className="dlvr-detail-value"> {driver.phone}</span>
            </div>
            <div className="dlvr-detail-item">
              <span className="dlvr-detail-label">Email</span>
              <span className="dlvr-detail-value">{driver.email}</span>
            </div>
            <div className="dlvr-detail-item">
              <span className="dlvr-detail-label">Zone de livraison</span>
              <span className="dlvr-detail-value">{driver?.address || "Casablanca"}</span>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="dlvr-panel dlvr-performance-section">
          <h2 className="dlvr-section-title">Statistiques</h2>
          <div className="dlvr-stats-grid">
            <div className="dlvr-stat-card">
              <div className="dlvr-stat-number">{driver.total_deliveries}</div>
              <div className="dlvr-stat-label">Livraisons totales</div>
            </div>
            <div className="dlvr-stat-card">
              <div className="dlvr-stat-number">{driver.rating}</div>
              <div className="dlvr-stat-label">Évaluation</div>
            </div>
            <div className="dlvr-stat-card">
              <div className="dlvr-stat-number">{driver.total_hours}</div>
              <div className="dlvr-stat-label">Heures travaillées</div>
            </div>
          </div>

          <div className="dlvr-today-summary">
            <h3 className="dlvr-section-title">Aujourd'hui</h3>
            <div className="dlvr-summary-grid">
              <div className="dlvr-summary-item">
                <div className="dlvr-summary-number">
                  {driver.today_earnings}{" "}
                </div>
                <div className="dlvr-summary-label">Livraison</div>
              </div>
              <div className="dlvr-summary-item">
                <div className="dlvr-summary-number">{driver.today_hours}</div>
                <div className="dlvr-summary-label">Heures</div>
              </div>
              <div className="dlvr-summary-item">
                <div className="dlvr-summary-number">
                  {driver.today_earnings} MAD
                </div>
                <div className="dlvr-summary-label">Gains</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
