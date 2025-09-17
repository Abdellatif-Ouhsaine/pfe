"use client";
import React from "react";
import axios from "axios";
import "./RequestTable.css";

const RequestTable = ({
  requests,
  type,
  onViewDetails,
  onUpdateStatus, 
}) => {
 
  const getApplicationStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "application-status-pending";
      case "approved":
        return "application-status-approved";
      case "rejected":
        return "application-status-rejected";
      default:
        return "";
    }
  };

  const getStatusDisplayText = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  //accept 
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/${type === "rider" ? "riders" : "restaurants"}/${id}/approve`
      );
      if (onUpdateStatus) onUpdateStatus(id, "approved");
      alert("accept est secceus")
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve the request.");
    }
  };

  // Refese
  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/${type === "rider" ? "riders" : "restaurants"}/${id}/reject`
      );
      if (onUpdateStatus) onUpdateStatus(id, "rejected");
      alert("refus request ❌")
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject the request.");
    }
  };

const renderRiderApplicationsTable = () => (
  <table className="applications-data-table">
    <thead>
      <tr>
        <th>CONTACT</th>
        <th>VEHICLE</th>
        <th>LICENSE PLATE</th>
        <th>DOCUMENTS</th>
        <th>STATUS</th>
        <th>DATE</th>
        <th>ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      {requests.map((rider) => (
        <tr key={rider.id}>
          <td>
            <div>
              <strong>{rider.user.name}</strong><br />
              <small>{rider.user.email}</small><br />
              <small>{rider.user.phone}</small>
            </div>
          </td>
          <td>
            {rider.vehicle_type} - {rider.vehicle_model}
          </td>
          <td>{rider.license_plate}</td>
          <td>
            <ul>
               <li>
                 <a
                   href={`http://localhost:8000/storage/${rider.id_document_path}`}
                   target="_blank"
                   rel="noreferrer"
                 >
                   ID Document
                 </a>
               </li>
               <li>
                 <a
                   href={`http://localhost:8000/storage/${rider.driving_license_path}`}
                   target="_blank"
                   rel="noreferrer"
                 >
                   Driving License
                 </a>
               </li>
          </ul>

         </td>
          <td>
            <span className={`badge badge-${rider.status}`}>
              {rider.status}
            </span>
          </td>
          <td>{new Date(rider.created_at).toLocaleDateString()}</td>
          <td>
              <div className="table-row-actions">
                <button
                  className="table-action-button view-details-btn"
                  onClick={() => onViewDetails(rider)}
                  title="View Details"
                >
                  👁️
                </button>
                {rider.status === "pending" && (
                  <>
                    <button
                      className="table-action-button approve-request-btn"
                      onClick={() => handleApprove(rider.id)}
                      title="Approve"
                    >
                      ✅
                    </button>
                    <button
                      className="table-action-button reject-request-btn"
                      onClick={() => handleReject(rider.id)}
                      title="Reject"
                    >
                      ❌
                    </button>
                  </>
                )}
              </div>
            </td>
        </tr>
      ))}
    </tbody>
  </table>
);


  const renderRestaurantApplicationsTable = () => (
    <table className="applications-data-table">
      <thead>
        <tr>
          <th>APPLICANT</th>
          <th>CONTACT</th>
          <th>ADDRESS</th>
          <th>RESTAURANT</th>
          <th>CUISINE TYPE</th>
          <th>LOGO</th>
          <th>BUSINESS LICENSE</th>
          <th>STATUS</th>
          <th>DATE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            <td>
              <div className="restaurant-applicant-info">
                <div className="restaurant-owner-avatar">
                  {request.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="restaurant-owner-details">
                  <div className="restaurant-owner-name">{request.user.name}</div>
                </div>
              </div>
            </td>
            <td>
              <div className="restaurant-contact-details">
                <div className="restaurant-email-address">{request.user.email}</div>
                <div className="restaurant-phone-number">{request.user.phone}</div>
              </div>
            </td>
            <td>{request.address}</td>
            <td>{request.name}</td>
            <td>{request.cuisine_type}</td>
            <td>
              {request.logo ? (
                <img
                  src={`http://localhost:8000/storage/${request.logo}`}
                  alt={`${request.name} logo`}
                  className="restaurant-logo-img"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                "N/A"
              )}
            </td>
            <td>
              {request.business_license ? (
                <a
                   href={`http://localhost:8000/storage/${request.business_license}`}
                   target="_blank"
                   rel="noreferrer"
                 >
                  View License
                </a>
              ) : (
                "N/A"
              )}
            </td>
            <td>
              <span
                className={`application-status-badge ${getApplicationStatusClass(
                  request.status
                )}`}
              >
                {getStatusDisplayText(request.status)}
              </span>
            </td>
            <td>{request.date}</td>
            <td>
              <div className="table-row-actions">
                <button
                  className="table-action-button view-details-btn"
                  onClick={() => onViewDetails(request)}
                  title="View Details"
                >
                  👁️
                </button>
                {request.status === "pending" && (
                  <>
                    <button
                      className="table-action-button approve-request-btn"
                      onClick={() => handleApprove(request.id)}
                      title="Approve"
                    >
                      ✅
                    </button>
                    <button
                      className="table-action-button reject-request-btn"
                      onClick={() => handleReject(request.id)}
                      title="Reject"
                    >
                      ❌
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="applications-table-wrapper">
      {type === "rider"
        ? renderRiderApplicationsTable()
        : renderRestaurantApplicationsTable()}
    </div>
  );
};

export default RequestTable;
