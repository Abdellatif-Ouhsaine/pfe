import React, { useState, useEffect } from "react";
import "../../styles/Zone.css";

export default function ZoneForm({ initialData, onSubmit, isEditMode }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    name: initialData?.name || "",
    image: null, // sera un fichier (File) si uploadé
    tables: Array.isArray(initialData?.seating_positions)
      ? initialData.seating_positions
      : [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [newTable, setNewTable] = useState({
    number: "",
    capacity: "",
    status: "", // pas de valeur par défaut
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || null,
        name: initialData.name || "",
        image: null,
        tables: Array.isArray(initialData?.seating_positions)
          ? initialData.seating_positions.map((table) => {
              const numberMatch = table.label?.match(/Table\s*[-_]?(\d+)/i);
              return {
                ...table,
                number: numberMatch ? numberMatch[1] : table.label, // fallback
                status: table.is_available ? "available" : "unavailable",
              };
            })
          : [],
      });

      if (initialData.image_url) {
        setImagePreview(
          `http://localhost:8000/storage/${initialData.image_url}`
        );
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Pour prévisualisation
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTable = () => {
    const updatedTables = [
      ...(formData.tables || []),
      {
        id: `T${Date.now()}`,
        number: newTable.number,
        capacity: newTable.capacity,
        status: "available", // statut par défaut "available"
      },
    ];
    setFormData((prev) => ({ ...prev, tables: updatedTables }));
    setNewTable({ number: "", capacity: "", status: "available" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Création dynamique des labels et des statuts
    const updatedTables = formData.tables.map((table) => ({
      ...table,
      label: table.number, // juste le numéro brut
      is_available: table.status === "available" ? 1 : 0,
    }));

    // Mise à jour du formData avec les tables modifiées
    const updatedFormData = {
      ...formData,
      tables: updatedTables,
    };

    // Envoi à la fonction parent
    onSubmit(updatedFormData);
  };

  return (
    <form className="zone-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nom de la zone</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Photo de la zone</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Aperçu" className="preview-image" />
        )}
      </div>

      <h3>Ajouter une Table</h3>
      <div className="table-inputs">
        <input
          placeholder="Numéro"
          value={newTable.number}
          onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
        />
        <input
          placeholder="Capacité"
          type="number"
          value={newTable.capacity}
          onChange={(e) =>
            setNewTable({ ...newTable, capacity: e.target.value })
          }
        />
        <button type="button" onClick={handleAddTable}>
          + Table
        </button>
      </div>

      <div className="tables-list">
        {formData.tables.map((table, index) => (
          <div key={table.id || index} className="table-item">
            <input
              type="text"
              value={table.number}
              onChange={(e) => {
                const updatedTables = [...formData.tables];
                updatedTables[index].number = e.target.value;
                setFormData({ ...formData, tables: updatedTables });
              }}
              placeholder="Numéro"
            />
            <input
              type="number"
              value={table.capacity}
              onChange={(e) => {
                const updatedTables = [...formData.tables];
                updatedTables[index].capacity = e.target.value;
                setFormData({ ...formData, tables: updatedTables });
              }}
              placeholder="Capacité"
            />
            <select
              value={table.status}
              onChange={(e) => {
                const updatedTables = [...formData.tables];
                updatedTables[index].status = e.target.value;
                setFormData({ ...formData, tables: updatedTables });
              }}
            >
              <option value="">-- Choisir un statut --</option>
              <option value="available">Disponible</option>
              <option value="unavailable">Indisponible</option>
            </select>

            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                const updatedTables = formData.tables.filter(
                  (_, i) => i !== index
                );
                setFormData({ ...formData, tables: updatedTables });
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className={isEditMode ? "submit-btn edit-mode" : "submit-btn"}
      >
        {isEditMode ? "Modifier" : "Créer"}
      </button>
    </form>
  );
}
