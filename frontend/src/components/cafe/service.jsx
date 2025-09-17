"use client"

import "./service.css"

const ServiceCard = ({ service, isActive, onClick }) => {
  return (
    <div
      className={`gobite-service-card ${isActive ? "gobite-service-card-active" : ""} ${service.gradient}`}
      onClick={() => onClick(service)}
    >
      {service.popular && <div className="gobite-popular-badge">HOT</div>}

      <div className="gobite-service-icon">{service.icon}</div>
      <span className="gobite-service-name">{service.name}</span>
      <span className="gobite-service-description">{service.description}</span>

      {service.id === "reserve-table" && <div className="gobite-pulse-overlay"></div>}
    </div>
  )
}

export default ServiceCard