// src/MapComponent.js
import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const MapComponent = () => {
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = "Di3Vx7izW8cjUaPKYum2YEEdvfjbdyur"; // Replace with your actual API key

  useEffect(() => {
    mapRef.current = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: [2.3522, 48.8566], // Paris
      zoom: 5,
    });

    return () => mapRef.current.remove();
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(
        value
      )}.json?key=${apiKey}&limit=5`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error("Search error:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    const position = item.position;
    if (mapRef.current && position) {
      mapRef.current.flyTo({
        center: [position.lon, position.lat],
        zoom: 17,
        speed: 1.2,
      });

      // Add a marker
      new tt.Marker()
        .setLngLat([position.lon, position.lat])
        .addTo(mapRef.current);
    }

    setSuggestions([]);
    setQuery("");
  };

  return (
    <div>
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 999 }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a country or city..."
          style={{ padding: "8px", width: "300px" }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              marginTop: "4px",
              background: "white",
              border: "1px solid #ccc",
              width: "300px",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                style={{ padding: "8px", cursor: "pointer" }}
              >
                {item.address.freeformAddress}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={mapElement} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default MapComponent;
