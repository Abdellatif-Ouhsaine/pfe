"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import "./Filters.css"

const Filters = () => {
  const [cuisines, setCuisines] = useState({
    Italian: false,
    Japanese: false,
    American: false,
    Chinese: false,
    Mexican: false,
    Indian: false,
  })

  const [ratings, setRatings] = useState({
    "4+": false,
    "3+": false,
  })

  const [distance, setDistance] = useState(5)
  const [freeDelivery, setFreeDelivery] = useState(false)

  const handleCuisineChange = (cuisine) => {
    setCuisines({
      ...cuisines,
      [cuisine]: !cuisines[cuisine],
    })
  }

  const handleRatingChange = (rating) => {
    setRatings({
      ...ratings,
      [rating]: !ratings[rating],
    })
  }

  return (
    <div className="filters-sidebar">
      <h2 className="filters-title">Filters</h2>

      <div className="filter-section">
        <h3 className="filter-heading">Cuisine</h3>
        <div className="filter-options">
          {Object.keys(cuisines).map((cuisine) => (
            <label key={cuisine} className="filter-option">
              <input type="checkbox" checked={cuisines[cuisine]} onChange={() => handleCuisineChange(cuisine)} />
              <span className="filter-label">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">Rating</h3>
        <div className="filter-options">
          {Object.keys(ratings).map((rating) => (
            <label key={rating} className="filter-option">
              <input type="checkbox" checked={ratings[rating]} onChange={() => handleRatingChange(rating)} />
              <span className="filter-label">
                {rating} <Star size={14} className="star-icon" />
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">Distance</h3>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="10"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="distance-slider"
          />
          <div className="slider-value">{distance} km</div>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">Delivery Options</h3>
        <label className="filter-option toggle">
          <input type="checkbox" checked={freeDelivery} onChange={() => setFreeDelivery(!freeDelivery)} />
          <span className="toggle-slider"></span>
          <span className="filter-label">Free Delivery</span>
        </label>
      </div>

      <button className="apply-filters-btn">Apply Filters</button>
      <button className="clear-filters-btn">Clear All</button>
    </div>
  )
}

export default Filters
