"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <span className="logo-text">Pizza Hut</span>
          </Link>

          <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
            <Link to="/Resto" className={location.pathname === "/" ? "active" : ""}>
              Restaurent
            </Link>
            <Link to="/Cafe">
              Cafe
            </Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Link>
          </div>
        </div>

        <div className="navbar-right">
          <div className="cart-icon">
            <span className="material-icons">shopping_cart</span>
            <span className="cart-count"></span>
          </div>
          <button className="btn btn-primary login-btn">Login / Signup</button>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <span className="material-icons">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
