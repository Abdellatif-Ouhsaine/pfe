import React from "react";

export default function Card({ title, description, buttonText, onClick,image}) {
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">{title}</h2>
      <div className="dashboard-card-image-container">
        {image && (
        <img src={image} alt={title} className="dashboard-card-image" />
      )}
      </div>
      <p className="dashboard-card-description">{description}</p>
      <button className="dashboard-card-button" onClick={onClick}>{buttonText}</button>
    </div>
  );
}
