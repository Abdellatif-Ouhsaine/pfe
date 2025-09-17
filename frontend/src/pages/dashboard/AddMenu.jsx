import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Menu.css";
import { useNavigate } from "react-router-dom";

export default function AddMenuForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    discount: "",
    image: "",
    type: "",
  });

  const [restoID,setrestoID] = useState()

  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // correspond à l'id du plat dans la BDD

  const navigate = useNavigate();

useEffect(() => {
  const storedEditId = localStorage.getItem("editMenuId");

  // ✅ Toujours récupérer le restaurant
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (userId) {
    axios
      .get(`http://localhost:8000/api/user/${userId}/restaurant`)
      .then((res) => {
        setrestoID(res.data.restaurant_id); // <- ici on met à jour le restoID
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération du restaurant :", err);
      });
  }

  if (storedEditId) {
    axios
      .get(`http://localhost:8000/api/menus/${storedEditId}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          description: data.description || "",
          discount: data.discount !== null ? data.discount.toString() : "",
          image: data.image || "",
          type: data.type || "",
        });
        setImagePreview(data.image);
        setIsEditing(true);
        setEditId(storedEditId);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du plat :", err);
      });
  }
}, []);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file)); // pour prévisualiser sans base64
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("type", formData.type);
    // N'ajoute discount que s'il n'est pas vide
    if (formData.discount !== "") {
      formDataToSend.append("discount", parseInt(formData.discount, 10));
    }

    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    }

    formDataToSend.append("restaurant_id",Number(restoID)); // ou autre valeur selon le restaurant choisi

    try {
      if (isEditing && editId) {
        await axios.post(
          `http://localhost:8000/api/menus/${editId}?_method=PUT`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        localStorage.removeItem("editMenuId");
        alert("Plat mis à jour !");
      } else {
        await axios.post("http://localhost:8000/api/menus", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Plat ajouté !");
      }

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        discount: "",
        image: "",
      });
      setImagePreview(null);
      navigate("/Dashboardpartner/menu/menulist");
    } catch (error) {
      if (error.response) {
        console.error("Erreur réponse backend:", error.response.data);
      } else if (error.request) {
        console.error("Pas de réponse reçue:", error.request);
      } else {
        console.error("Erreur Axios:", error.message);
      }
      alert("Erreur");
    }
    
  };

  return (
    <form className="menu-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nom du plat</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Prix (en MAD)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Choisir</option>
          <option value="Entrée">Entrée</option>
          <option value="Plat">Plat principal</option>
          <option value="Dessert">Dessert</option>
          <option value="Boisson">Boisson</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="discount">Remise (%)</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Type du plat</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Choisir</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Petit déjeuner">Petit déjeuner</option>
          <option value="Pâtes">Pâtes</option>
          <option value="Tacos">Tacos</option>
          <option value="Viande">Viande</option>
          <option value="Végétarien">Végétarien</option>
          <option value="Tartes">Tartes</option>
          <option value="Boisson">Boisson</option>
          {/* Ajoute d'autres types ici */}
        </select>
      </div>

      {isEditing && imagePreview && (
        <img
          src={`http://localhost:8000/storage/${imagePreview}`}
          alt="Image existante"
          className="menu-image"
          style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
        />
      )}

      {!isEditing && imagePreview && (
        <img
          src={imagePreview}
          alt="Aperçu"
          style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
        />
      )}

      <button
        type="submit"
        className={isEditing ? "update-button" : "ajouter-button"}
      >
        {isEditing ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
}
