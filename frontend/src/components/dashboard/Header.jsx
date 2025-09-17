import React from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.startsWith("/menu")) {
      return "Menu";
    }

    switch (location.pathname) {
      case "/":
        return "Welcome to your Dashboard";
      case "/orders":
        return "Orders For Today";
      case "/reservations":
        return "Reservations For Today";
      case "/analytics":
        return "Analytics";
      case "/zones":
        return "Zone de Reservation";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">{getTitle()}</h1>
      <div className="header-right">
        <img src="kkkk" alt="Logo" className="header-logo" />
      </div>
    </div>
  );
}
