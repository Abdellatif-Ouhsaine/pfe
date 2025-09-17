import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/" },
    { icon: "🏍️", label: "Riders", path: "riders" },
    { icon: "🏪", label: "Restaurants", path: "restaurants" },
    { icon: "🤝", label: "Partnership Requests", path: "", badge: "2" },
  ]

  return (
    <div className="admin-navigation-sidebar">
      <div className="brand-logo-section">
        <div className="gobite-brand-logo">
          <div className="brand-icon-circle">🍔</div>
          <span className="brand-title-text">GOBITE Admin</span>
        </div>
      </div>

      <div className="navigation-menu-container">
        <div className="menu-section-title">MAIN MENU</div>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={`/adminpage/${item.path}`}
            className={`nav-menu-item ${
              location.pathname === item.path ? "nav-item-active" : ""
            }`}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-text">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
