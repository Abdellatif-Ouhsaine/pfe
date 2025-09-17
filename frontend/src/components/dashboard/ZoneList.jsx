// ZoneList.jsx
import React from "react";
import ZoneCard from "./ZoneCard";
import "../../styles/Zone.css";

export default function ZoneList({ zones, onEdit, onDelete }) {
  return (
    <div className="zones-grid">
      {zones.map((zone) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          onEdit={onEdit}
          onDelete={onDelete} // ← très important
        />
      ))}
    </div>
  );
}
