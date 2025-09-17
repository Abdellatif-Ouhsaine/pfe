import React, { useEffect, useState } from "react";
import ZoneList from "../../components/dashboard/ZoneList";
import "../../styles/Zone.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";

export default function ZonesListPage() {
  const [zones, setZones] = useState([]);
  const navigate = useNavigate();

    const id = JSON.parse(localStorage.getItem("user")).id

  const [resto,setresto] = useState()

useEffect(() => {
  axios.get(`http://localhost:8000/api/user/${id}/restaurant`).then(res => {
    setresto(res.data);
  });
}, [id]); // Add id as dependency

// Fetch zones when restaurant data changes
useEffect(() => {

    fetchZones();

}, ); // Only run when restaurant_id changes

const fetchZones = async (restaurantId) => {
  try {
    const res = await api.get(`/seating-areas?restaurant_id=${resto.restaurant_id}`);
    setZones(res.data);
  } catch (error) {
    console.error("Error fetching seating areas:", error);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression de cette zone ?")) {
      try {
        await api.delete(`/seating-areas/${id}`);
        setZones((prev) => prev.filter((z) => z.id !== id));
      } catch (error) {
        console.error("Erreur suppression :", error);
      }
    }
  };

  const handleEdit = (zone) => {
    localStorage.setItem("editZone", JSON.stringify(zone));
    navigate("/Dashboardpartner/zones/edit");
  };

  const handleAdd = () => {
    localStorage.removeItem("editZone");
    navigate("/Dashboardpartner/zones/add");
  };

  return (
    <div className="zones-list-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/Dashboardpartner/reservations")}>
          ← Retour aux reservations
        </button>
        <h2>Zones du Restaurant</h2>
      </div>

      <button className="add-zone-button" onClick={handleAdd}>
        + Ajouter une Zone
      </button>

      <ZoneList zones={zones} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
