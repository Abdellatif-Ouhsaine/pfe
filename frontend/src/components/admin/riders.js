import React, { useEffect, useState } from "react"
import axios from "axios"
import "./rider.css"

const RiderApplications = () => {
  const [riders, setRiders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/api/riders/approved")
      .then(res => setRiders(res.data))
      .catch(err => console.error("Error fetching riders:", err))
  }, [])

  
  const handleView = (rider) => {
      alert(`Viewing rider:\nName: ${rider.name}\nEmail: ${rider.email}`)
  }

  const handleReject = (riderId) => {
    if (window.confirm("Are you sure you want to reject this rider?")) {
        axios.put(`http://localhost:8000/api/riders/${riderId}/reject`)
        .then(() => {
          setRiders(prev => prev.filter(r => r.id !== riderId))
        })
        .catch(err => console.error("Error rejecting rider:", err))
    }
}

const filteredRiders = riders.filter(rider =>
    rider.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.user.address?.toLowerCase().includes(searchTerm.toLowerCase())
)
console.log(riders)
console.log(filteredRiders)

  return (
    <div className="rider-applications-container">
      <div className="rider-applications-header">
        <h2>Rider Applications</h2>
        <input
          type="text"
          placeholder="Search by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRiders.length === 0 ? (
        <p className="no-results-text">No matching rider applications.</p>
      ) : (
        <table className="rider-table">
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
            {filteredRiders.map((rider) => (
              <tr key={rider.id}>
                <td>{rider.user.name}</td>
                <td>{rider.user.email}</td>
                <td>{rider.user.phone}</td>
                <td>{rider.address}</td>
                <td>{new Date(rider.created_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button className="view-btn" onClick={() => handleView(rider)}>View</button>
                  <button className="reject-btn" onClick={() => handleReject(rider.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RiderApplications
