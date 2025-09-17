import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRiderProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const {id} = useParams() ;

  console.log(id)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/riders/${id}`)
      .then(res => {
        setFormData({
          name: res.data.name || '',
          phone: res.data.phone || '',
          address: res.data.address || '',
          current_lat: res.data.current_lat || '',
          current_lng: res.data.current_lng || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement :", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/riders/${id}`, formData)
      .then(() => {
        setSuccess('Profil mis à jour avec succès !');
        setTimeout(() => {
          navigate('/livreur/profile');
        }, 1500);
      })
      .catch(err => {
        console.error("Erreur mise à jour :", err);
        setSuccess("Une erreur est survenue.");
      });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
  <div className="edit-profile-container">
    <div className="edit-profile-card">
      <h2 className="edit-profile-title">Modifier le profil du livreur</h2>

      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Téléphone</label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Adresse</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />
        </div>



        <button type="submit" className="submit-button">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  </div>
);
};

export default EditRiderProfile;
