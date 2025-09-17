import React, { useEffect, useState } from "react";
import ZoneForm from "../../components/dashboard/ZoneForm";
import "../../styles/Zone.css";
import { data, useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";

export default function AddZonePage() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user")).id

  const [resto,setresto] = useState()

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/${id}/restaurant`).then(res=>{
      setresto(res.data)
    })

  })

  console.log(resto?.restaurant_id)

  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("restaurant_id", resto.restaurant_id); // ou dynamique selon ton projet
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      formData.append("tables", JSON.stringify(data.tables)); // <- champ attendu par le back

      if (data.id) {
        // PUT via FormData : nécessite `method-override` côté Laravel (déjà géré par Laravel nativement)
        formData.append("_method", "PUT");
        await api.post(`/seating-areas/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Zone modifiée !");
      } else {
        await api.post(`/seating-areas?user_id=${id}`, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
        alert("Zone créée !");
      }

      // Nettoyer le mode édition
      localStorage.removeItem("editZone");
      navigate("/Dashboardpartner/zones");

    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde :",
        error.response?.data || error
      );
      alert("Erreur lors de la sauvegarde de la zone.");
    }

    console.log(data);
  };

  const editZone = localStorage.getItem("editZone");
  const isEditMode = !!editZone;

  return (
    <div className="add-zone-container">
      <h2>{isEditMode ? "Modifier la zone" : "Ajouter une nouvelle zone"}</h2>
      <ZoneForm
        initialData={isEditMode ? JSON.parse(editZone) : null}
        onSubmit={handleSave}
        isEditMode={isEditMode}
      />
    </div>
  );
}
