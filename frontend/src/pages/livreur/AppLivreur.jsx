import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./livreur.css";

// Vues
import { DashboardView } from "./Views/DashboardView";
import { TrackOrderView } from "./Views/TrackOrderView";
import { ProfileView } from "./Views/ProfileView";
import EditRiderProfile from "./Views/EditRiderProfile";

export default function AppLivreur() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dlvr-container">
      <div className="dlvr-sidebar">
        <div className="dlvr-logo-container">
          <span className="dlvr-logo">🚚</span>
        </div>

        <nav className="dlvr-navigation">
          <button
            className={`dlvr-nav-button ${isActive("/") ? "dlvr-active" : ""}`}
            onClick={() => navigate("/livreur")}
          >
            <span className="dlvr-icon">🏠</span>
            <span className="dlvr-label">Accueil</span>
          </button>

          <button
            className={`dlvr-nav-button ${
              isActive("/orders") ? "dlvr-active" : ""
            }`}
            onClick={() => navigate("/livreur/orders")}
          >
            <span className="dlvr-icon">📋</span>
            <span className="dlvr-label">Commandes</span>
          </button>
        </nav>

        <div className="dlvr-profile-container">
          <button
            className={`dlvr-nav-button ${
              isActive("/profile") ? "dlvr-active" : ""
            }`}
            onClick={() => navigate("/livreur/profile")}
          >
            <span className="dlvr-icon">👤</span>
            <span className="dlvr-label">Profil</span>
          </button>
        </div>
      </div>

      {/* Affichage conditionnel des pages */}
      <div className="dlvr-main">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="orders" element={<TrackOrderView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="riders/:id/edit" element={<EditRiderProfile />} />
        </Routes>
      </div>
    </div>
  );
}
