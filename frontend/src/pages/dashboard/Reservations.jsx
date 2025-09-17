import React, { useEffect, useState } from "react";
import "../../styles/Reservation.css";
import Header from "../../components/dashboard/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [seatingPositions, setSeatingPositions] = useState([]);
  const [seatingAreas, setSeatingAreas] = useState([]);
  const [resto, setResto] = useState(null);

  const id = JSON.parse(localStorage.getItem("user")).id;

  // Récupération du restaurant lié à l'utilisateur
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}/restaurant`)
      .then((res) => {
        setResto(res.data);
      })
      .catch((err) => {
        console.error("Erreur récupération restaurant", err);
      });
  }, [id]);

  // Chargement des données uniquement quand resto est prêt
  useEffect(() => {
    if (resto) {
      fetchAllData();
    }
  }, [resto]);

  const fetchAllData = async () => {
    try {
      const resReservations = await axios.get(
        `http://localhost:8000/api/restaurants/${resto.restaurant_id}/reservations`
      );
      const resTables = await axios.get(
        "http://localhost:8000/api/seating-positions"
      );
      const resZones = await axios.get(
        "http://localhost:8000/api/seating-areas"
      );

      setReservations(resReservations.data);
      setSeatingPositions(resTables.data);
      setSeatingAreas(resZones.data);
    } catch (error) {
      console.error("Erreur chargement données", error);
    }
  };

  const getTableLabel = (tableId) => {
    const table = seatingPositions.find((t) => t.id === tableId);
    if (!table) return "Inconnue";
    const zone = seatingAreas.find((z) => z.id === table.seating_area_id);
    return `${zone?.name || "Zone inconnue"} - ${table.label}`;
  };

  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const pending = reservations.filter((r) => r.status === "pending").length;
  const canceled = reservations.filter((r) => r.status === "cancelled").length;

  if (!resto) return <div>Chargement des données du restaurant...</div>;

  return (
    <div className="reservations-container">
      <Header />

      <div className="stats-cards">
        <div className="card total">
          <span>{reservations.length}</span>
          <p>Total</p>
        </div>
        <div className="card confirmed">
          <span>{confirmed}</span>
          <p>Confirmées</p>
        </div>
        <div className="card pending">
          <span>{pending}</span>
          <p>En attente</p>
        </div>
        <div className="card canceled">
          <span>{canceled}</span>
          <p>Annulées</p>
        </div>
      </div>

      <div className="actions-header">
        <Link to="/Dashboardpartner/zones" className="btn-link">
          🔍 Gérer les Zones
        </Link>
      </div>

      <table className="reservations-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Contact</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Personnes</th>
            <th>Table</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.user?.name || "Client"}</td>
              <td>{res.user?.phone || "555"}</td>
              <td>{res.reservation_date}</td>
              <td>{res.reservation_time}</td>
              <td>{res.number_of_guests}</td>
              <td>{getTableLabel(res.seating_position_id)}</td>
              <td>
                <span className={`status-badge ${res.status}`}>
                  {res.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
