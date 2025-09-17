import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CafeList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Popular");
  const filters = ["Popular", "New", "Nearby"];
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cafes")
      .then((response) => {
        setCafes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des cafés :", error);
      });
  }, []);

  // Safe parsing of user address from localStorage
  let userAddress = "";
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    userAddress = user?.address?.toLowerCase() || "";
  } catch (e) {
    console.warn("Invalid user data in localStorage");
  }

  // Filter logic based only on activeFilter
  let filteredCafes = cafes.filter((cafe) => {
    if (activeFilter === "Nearby") {
      return cafe.address?.toLowerCase().includes(userAddress);
    }
    return true; // For Popular and New, show all
  });

  if (activeFilter === "New") {
    filteredCafes.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }

  return (
    <div className="shop-finder-block">
      <h2 className="block-title">Find by Category</h2>

      <div className="shop-filter-strip">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`shop-filter-option ${
              activeFilter === filter ? "shop-filter-active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="shop-results-grid">
        {filteredCafes.map((cafe) => (
          <div
            className="shop-result-item"
            key={cafe.id}
            onClick={() => navigate(`/Cafe/${cafe.id}`)}
          >
            <div className="shop-img-wrapper">
              <img
                src={`http://localhost:8000/storage/${cafe.logo}`}
                alt={cafe.name}
                className="shop-thumbnail"
              />
              <span className="shop-category-tag">{cafe.cuisine_type}</span>
            </div>
            <div className="shop-text-content">
              <h3 className="shop-display-name">{cafe.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CafeList;
