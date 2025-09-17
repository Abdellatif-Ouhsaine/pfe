

import { useState } from "react"
import "./DetailModal.css"

const DetailModal = ({ request, type, onClose, onApprove, onReject }) => {
  const [adminComment, setAdminComment] = useState("")

  const handleApproveApplication = () => {
    onApprove(request.id, adminComment)
  }

  const handleRejectApplication = () => {
    onReject(request.id, adminComment)
  }

  const renderRiderApplicationDetails = () => (
    <div className="application-detail-modal-content">
      <div className="modal-header-section">
        <h2>Rider Application Details</h2>
        <button className="modal-close-button" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="modal-body-section">
        <div className="application-detail-section">
          <h3>Personal Information</h3>
          <div className="detail-information-grid">
            <div className="detail-field-item">
              <label>Full Name</label>
              <span>{request.name}</span>
            </div>
            <div className="detail-field-item">
              <label>Email</label>
              <span>{request.email}</span>
            </div>
            <div className="detail-field-item">
              <label>Phone</label>
              <span>{request.phone}</span>
            </div>
            <div className="detail-field-item">
              <label>Location</label>
              <span>{request.location}</span>
            </div>
          </div>
        </div>

        <div className="application-detail-section">
          <h3>Vehicle Information</h3>
          <div className="detail-information-grid">
            <div className="detail-field-item">
              <label>Vehicle Type</label>
              <span>{request.vehicleType}</span>
            </div>
            <div className="detail-field-item">
              <label>Documents</label>
              <span>{request.documents}</span>
            </div>
          </div>
        </div>

        <div className="application-detail-section">
          <h3>Application Status</h3>
          <div className="detail-information-grid">
            <div className="detail-field-item">
              <label>Current Status</label>
              <span className={`detail-status-indicator ${request.status}`}>{request.status}</span>
            </div>
            <div className="detail-field-item">
              <label>Submission Date</label>
              <span>{request.date}</span>
            </div>
          </div>
        </div>

        <div className="application-detail-section">
          <h3>Admin Comment</h3>
          <textarea
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
            placeholder="Add a comment or message for the applicant..."
            rows="4"
          />
        </div>
      </div>

      <div className="modal-footer-section">
        <button className="modal-action-button secondary-button" onClick={onClose}>
          Cancel
        </button>
        <button className="modal-action-button danger-button" onClick={handleRejectApplication}>
          Reject
        </button>
        <button className="modal-action-button success-button" onClick={handleApproveApplication}>
          Approve
        </button>
      </div>
    </div>
  )

  const renderRestaurantApplicationDetails = () => (
    <div className="application-detail-modal-content">
      <div className="modal-header-section">
        <h2>Restaurant Application Details</h2>
        <button className="modal-close-button" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="modal-body-section">
        <div className="application-detail-section">
          <h3>Owner Information</h3>
          <div className="detail-information-grid">
            <div className="detail-field-item">
              <label>Full Name</label>
              <span>{request.name}</span>
            </div>
            <div className="detail-field-item">
              <label>Role</label>
              <span>{request.role}</span>
            </div>
            <div className="detail-field-item">
              <label>Email</label>
              <span>{request.email}</span>
            </div>
            <div className="detail-field-item">
              <label>Phone</label>
              <span>{request.phone}</span>
            </div>
          </div>
        </div>

        <div className="application-detail-section">
          <h3>Restaurant Information</h3>
          <div className="detail-information-grid">
            <div className="detail-field-item">
              <label>Restaurant Name</label>
              <span>{request.restaurantName}</span>
            </div>
            <div className="detail-field-item">
              <label>Cuisine Type</label>
              <span>{request.cuisineType}</span>
            </div>
            <div className="detail-field-item">
              <label>Location</label>
              <span>{request.location}</span>
            </div>
            <div className="detail-field-item">
              <label>Logo</label>
              {request.logo ? (
                <img
                  src={request.logo}
                  alt={`${request.restaurantName} logo`}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />
              ) : (
                <span>No Logo</span>
              )}
            </div>
            <div className="detail-field-item">
              <label>Business License</label>
              {request.business_license ? (
                <a href={request.business_license} target="_blank" rel="noopener noreferrer">
                  View License
                </a>
              ) : (
                <span>No License</span>
              )}
            </div>
          </div>
        </div>

        <div className="application-detail-section">
          <h3>Application Status</h3>
          <div className="detail-information-grid">
            <div className="detail-field-item">
              <label>Current Status</label>
              <span className={`detail-status-indicator ${request.status}`}>{request.status}</span>
            </div>
            <div className="detail-field-item">
              <label>Submission Date</label>
              <span>{request.date}</span>
            </div>
          </div>
        </div>

        <div className="application-detail-section">
          <h3>Admin Comment</h3>
          <textarea
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
            placeholder="Add a comment or message for the applicant..."
            rows="4"
          />
        </div>
      </div>

      <div className="modal-footer-section">
        <button className="modal-action-button secondary-button" onClick={onClose}>
          Cancel
        </button>
        <button className="modal-action-button danger-button" onClick={handleRejectApplication}>
          Reject
        </button>
        <button className="modal-action-button success-button" onClick={handleApproveApplication}>
          Approve
        </button>
      </div>
    </div>
  )

  return (
    <div className="application-detail-modal-overlay" onClick={onClose}>
      <div className="application-detail-modal-container" onClick={(e) => e.stopPropagation()}>
        {type === "rider" ? renderRiderApplicationDetails() : renderRestaurantApplicationDetails()}
      </div>
    </div>
  )
}

export default DetailModal
