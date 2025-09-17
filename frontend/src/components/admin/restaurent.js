import React, { useEffect, useState } from "react"
import axios from "axios"
import "./restarent.css"

const RestaurantApplications = () => {
  const [restaurants, setRestaurants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/api/restaurants/approved")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error("Error fetching restaurants:", err))
  }, [])

  const handleView = (restaurant) => {
    alert(`Viewing:\nName: ${restaurant.name}\nEmail: ${restaurant.email}`)
  }

  const handleReject = (restaurantId) => {
    if (window.confirm("Are you sure you want to reject this restaurant?")) {
      axios.put(`http://localhost:8000/api/restaurants/${restaurantId}/reject`)
        .then(() => {
          setRestaurants(prev => prev.filter(r => r.id !== restaurantId))
        })
        .catch(err => console.error("Error rejecting restaurant:", err))
    }
  }

  const filteredRestaurants = restaurants.filter(r =>
    r.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="restaurantApp-container">
      <div className="restaurantApp-header">
        <h2>Pending Restaurant Applications</h2>
        <input
          type="text"
          placeholder="Search by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="restaurantApp-search"
        />
      </div>

      {filteredRestaurants.length === 0 ? (
        <p className="restaurantApp-noResults">No matching applications.</p>
      ) : (
        <table className="restaurantApp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((r) => (
              <tr key={r.id}>
                <td>{r.user.name}</td>
                <td>{r.user.email}</td>
                <td>{r.user.phone}</td>
                <td>{r.address}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="restaurantApp-actions">
                  <button className="restaurantApp-viewBtn" onClick={() => handleView(r)}>View</button>
                  <button className="restaurantApp-rejectBtn" onClick={() => handleReject(r.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RestaurantApplications
