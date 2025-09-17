"use client"

import { useEffect, useState } from "react"
import RequestTable from "./RequestTable"
import DetailModal from "./DetailModal"
import "./PartnershipRequests.css"
import axios from "axios"

const PartnershipRequests = () => {
  const [activeTab, setActiveTab] = useState("rider")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newRequestsOnly, setNewRequestsOnly] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const [riderRequests,setriderRequests] = useState([]) ;

    useEffect(() => {
    axios.get("http://localhost:8000/api/riders/pending")
      .then((res) => {
        setriderRequests(res.data)
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des restaurants :", err)
      })
  }, [])
    

  const [restaurantRequests,setrestaurantRequests] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/restaurants/pending")
      .then((res) => {
        setrestaurantRequests(res.data)
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des restaurants :", err)
      })
  }, [])

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
  }

  const handleCloseModal = () => {
    setSelectedRequest(null)
  }

  const handleApprove = (id) => {
    console.log("Approve request:", id)
    setSelectedRequest(null)
  }

  const handleReject = (id) => {
    console.log("Reject request:", id)
    setSelectedRequest(null)
  }

  return (
    <div className="partnership-requests-container">
      <div className="requests-content-header">
        <div className="application-type-tabs">
          <button
            className={`application-tab ${activeTab === "rider" ? "tab-selected" : ""}`}
            onClick={() => setActiveTab("rider")}
          >
            Rider Applications
          </button>
          <button
            className={`application-tab ${activeTab === "restaurant" ? "tab-selected" : ""}`}
            onClick={() => setActiveTab("restaurant")}
          >
            Restaurant Applications
          </button>
        </div>

        <div className="new-requests-checkbox-filter">
          <input
            type="checkbox"
            id="newRequestsFilter"
            checked={newRequestsOnly}
            onChange={(e) => setNewRequestsOnly(e.target.checked)}
          />
          <label htmlFor="newRequestsFilter">New Requests Only</label>
        </div>
      </div>

      <div className="search-and-filter-section">
        <div className="search-input-container">
          <span className="magnifying-glass-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="status-dropdown-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <RequestTable
        requests={activeTab === "rider" ? riderRequests : restaurantRequests}
        type={activeTab}
        onViewDetails={handleViewDetails}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {selectedRequest && (
        <DetailModal
          request={selectedRequest}
          type={activeTab}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  )
}

export default PartnershipRequests
