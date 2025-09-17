"use client"

import { useState } from "react"
import { Grid, Map } from "lucide-react"
import "./MapToggle.css"

const MapToggle = () => {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <div className="map-toggle-section">
      <div className="toggle-container">
        <button className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
          <Grid size={18} />
          <span>Grid View</span>
        </button>
        <button className={`toggle-btn ${viewMode === "map" ? "active" : ""}`} onClick={() => setViewMode("map")}>
          <Map size={18} />
          <span>Map View</span>
        </button>
      </div>

      {viewMode === "map" && (
        <div className="map-container">
          <div className="map-placeholder">
            <p>Interactive Map View</p>
            <p>Shows restaurant locations with logo pins</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapToggle
