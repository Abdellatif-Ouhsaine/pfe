import React from "react";
import "../../styles/Zone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function ZoneCard({ zone, onEdit, onDelete }) {
  const totalTables = Array.isArray(zone.seating_positions)
    ? zone.seating_positions.length
    : 0;

  const available = Array.isArray(zone.seating_positions)
    ? zone.seating_positions.filter(
        (t) => Number(t.is_available) === 1
      ).length
    : 0;

  return (
    <div className="zone-card">
      <img
        src={`http://localhost:8000/storage/${zone.image_url}`}
        alt={zone.name}
        className="zone-image"
      />

      <h3>{zone.name}</h3>
      <p>
        Tables : {totalTables} | Disponibles : {available}
      </p>

      {/* Affichage détaillé des tables */}
      <div className="tables-details">
        {Array.isArray(zone.seating_positions) &&
        zone.seating_positions.length > 0 ? (
          zone.seating_positions.map((table) => (
            <div key={table.id} className="table-info">
              <strong>Table {table.label}</strong> — Capacité : {table.capacity}{" "}
              — Statut :{" "}
              {Number(table.is_available) === 1
                ? "Disponible"
                : "Indisponible"}
            </div>
          ))
        ) : (
          <p>Aucune table</p>
        )}
      </div>

      <div className="card-buttons">
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEdit(zone)}
          style={{
            cursor: "pointer",
            color: "blue",
            marginRight: "10px",
            fontSize: "20px",
          }}
          title="Modifier"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onDelete(zone.id)}
          style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
          title="Supprimer"
        />
      </div>
    </div>
  );
}
