import { Star } from "lucide-react"
import "./CustomerFavorites.css"
import { useEffect, useState } from "react"
import axios from "axios"


const CustomerFavorites = () => {

  const [Favorites,setFavorites] = useState([]) ;
    useEffect(() => {
    axios.get('http://localhost:8000/api/reports/most-ordered-menu')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données :', error);
      });
  }, []);


  return (
    <div className="customer-favorites-section">
      <h2 className="section-title">Customer Favorites</h2>
      <p className="section-description">Most Ordered this week</p>

      <div className="favorites-container">
        {Favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <div className="favorite-image">
              <img src={favorite.menu_image !== null ?favorite.menu_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74WUxw1vUwnSD1aJxW1laEHpcpfJdeJQrDw&s"} alt={favorite.name} />
            </div>
            <div className="favorite-info">
              <h3 className="favorite-name">{favorite.menu_name}</h3>
              <p className="favorite-restaurant">{favorite.restaurant_name}</p>
              <div className="favorite-rating">
                <Star size={14} className="star-icon" />
                <span>{favorite.restaurant_rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerFavorites
