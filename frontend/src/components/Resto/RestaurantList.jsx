import { Star, Clock, MapPin, Heart } from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom';
import "./RestaurantList.css"
import kfc from "./13.jpeg"
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useSelectedRestaurant } from "../../context/SelectedRestaurantContext";


const RestaurantCard = ({ restaurant,selectedCategory }) => {
  const [isFavorite, setIsFavorite] = React.useState(restaurant.isFavorite)

  const navigate = useNavigate();
  const { setSelectedRestaurant } = useSelectedRestaurant();

  const gotoResto = (res) => {
    setSelectedRestaurant(restaurant); // stocke dans le contexte
    navigate(`/Resto/${res.id}`); // navigation simple sans données
  };
 

  return (
    <div className="resto-card" onClick={()=>gotoResto(restaurant)}>
      <div className="resto-image">
        <img src={`http://localhost:8000/storage/${restaurant.logo}`} />
        <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={() => setIsFavorite(!isFavorite)}>
          <Heart fill={isFavorite ? "#ff4757" : "none"} color={isFavorite ? "#ff4757" : "#666"} />
        </button>
        <div className="restaurant-badges">
          
        
        </div>
      </div>

      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <div className="restaurant-cuisines">{restaurant.cuisine_type}</div>

        <div className="restaurant-meta">
          <div className="meta-item">
            <Star size={14} className="meta-icon" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} className="meta-icon" />
            <span>{restaurant.deliveryTime} min</span>
          </div>
          <div className="meta-item">
            <MapPin size={14} className="meta-icon" />
            <span>{restaurant.address}</span>
          </div>
        </div>

        <div className={`restaurant-status ${restaurant.isOpen ? "open" : "closed"}`}>
          {"🟢 Open Now"}
        </div>
      </div>
    </div>
  )
}



const RestaurantList = ({selectedCategori}) => {

// Mock data for restaurants
const [restaurants, setRestaurant] = useState([])

useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/restaurants")
      setRestaurant(response.data)
    } catch (error) {
      console.error("Erreur lors du chargement des restaurants :", error)
    }
  }

  fetchRestaurants() 
}, [])
  
  return (
    <div className="resto-list-section">
      <h2 className="section-title">Populair Restaurants</h2>
      <div className="resto-grid">
        {(selectedCategori == null || selectedCategori == "autre") ? (restaurants?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant}  />
        ))) : (restaurants.filter(cuis => cuis.cuisine_type == selectedCategori)?.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant}  />
        )))}
      </div>

      <div className="trending-section">
        <h2 className="section-title">Trending This Week</h2>
        <div className="trending-scroll">
          {restaurants.slice(0, 4).map((restaurant) => (
            <div key={restaurant.id} className="trending-item">
              <img src={`http://localhost:8000/storage/${restaurant.logo}`} alt={restaurant.name} className="trending-image" />
              <div className="trending-info">
                <h3>{restaurant.name}</h3>
                <span className="trending-badge">{restaurant.id % 2 === 0 ? "🔥 HOT" : "🆕 New"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RestaurantList
