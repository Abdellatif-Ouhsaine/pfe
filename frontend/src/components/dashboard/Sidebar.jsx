import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/style.css';

export default function Sidebar() {
  return (
    <div className="sideba1">
      <img className="sidebar-logo" alt="logo" />
      <br />
      <NavLink to="/Dashboardpartner" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
  Dashboard
</NavLink>
      <NavLink to="/Dashboardpartner/orders" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>Orders</NavLink>
      <NavLink to="/Dashboardpartner/reservations" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>Reservations</NavLink>
      <NavLink to="/Dashboardpartner/analytics" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>Analytics</NavLink>
      <NavLink to="/Dashboardpartner/menu/menulist" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>Menu</NavLink>
    </div>
  );
}

