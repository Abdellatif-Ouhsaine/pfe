import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Menu.css";

export default function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedDiscount, setSelectedDiscount] = useState("Tous");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    console.log(userId)

    const response = await axios.get(`http://localhost:8000/api/users/${userId}/menus`);
    console.log("Données menus reçues:", response.data);  // <--- Ajouté
    setMenuItems(response.data);
  } catch (error) {
    console.error("Erreur lors du chargement des menus :", error);
  }
};

console.log(menuItems)



  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Es-tu sûr de vouloir supprimer ce plat ?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/menus/${id}`);
      fetchMenus();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (id) => {
    localStorage.setItem("editMenuId", id);
    window.location.href = "/Dashboardpartner/menu/add";
  };

  // Obtenir toutes les catégories et types distincts
  const allCategories = ["Tous", ...new Set(menuItems.map((item) => item.category))];
  const allTypes = ["Tous", ...new Set(menuItems.map((item) => item.type))];

  // Pour les remises, on propose quelques paliers communs (exemple)
  const discountOptions = [
    "Tous",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "40",
    "50",
  ];

  // Filtrer les menus selon les filtres sélectionnés
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "Tous" || item.category === selectedCategory;

    const matchesType = selectedType === "Tous" || item.type === selectedType;

    const discountNumber = parseInt(selectedDiscount, 10);

    // Si "Tous" sélectionné, on accepte tout
    // Sinon on filtre ceux dont la remise est >= à la remise sélectionnée
    const matchesDiscount =
      selectedDiscount === "Tous" ||
      (item.discount && item.discount >= discountNumber);

    return matchesCategory && matchesType && matchesDiscount;
  });

  // Regrouper les plats par catégorie (après filtre)
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || "Autres";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-container">
      {/* Filtres */}
      <div className="filter-bar" style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <label>
          Catégorie:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {allCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Type:
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {allTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Remise minimale:
          <select
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(e.target.value)}
          >
            {discountOptions.map((disc, index) => (
              <option key={index} value={disc}>
                {disc === "Tous" ? "Toutes" : `≥ ${disc}%`}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Affichage des plats filtrés */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <section key={category} className="category-section">
          <h2>{category}</h2>
          <div className="menu-grid">
            {items.map((item) => (
              <div className="menu-card1" key={item.id}>
                <div className="image-wrapper">
                  {item.image && (
                    <img
                      src={`http://localhost:8000/storage/${item.image}`}
                      alt={item.name}
                      className="menu-image"
                    />
                  )}
                  {item.discount && (
                    <div className="discount-badge">-{item.discount}%</div>
                  )}
                </div>
                <h3>{item.name}</h3>
                <p>
                  <strong>Type:</strong> {item.type || "Non défini"}
                </p>
                <p>{item.description}</p>
                <p>
                  <strong>Prix:</strong> {item.price} MAD
                </p>

                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEdit(item.id)}
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
                  onClick={() => handleDelete(item.id)}
                  style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
                  title="Supprimer"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
