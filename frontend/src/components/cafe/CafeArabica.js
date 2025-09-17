"use client"

import { useState } from "react"

function CafeArabica() {
  const [activeFilter, setActiveFilter] = useState("Popular")

  const filters = ["Popular", "New Items", "Special"]

  const products = [
    { id: 1, name: "Signature Coffee", price: "$6.99", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Signature Coffee", price: "$6.99", image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Signature Coffee", price: "$6.99", image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Signature Coffee", price: "$6.99", image: "https://via.placeholder.com/300x200" },
  ]

  return (
    <div className="arabica-section-wrapper">
      <h2 className="arabica-section-heading">Cafe Arabica</h2>

      <div className="arabica-filter-row">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`arabica-filter-btn ${activeFilter === filter ? "arabica-filter-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="arabica-products-grid">
        {products.map((product) => (
          <div className="arabica-product-item" key={product.id}>
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="arabica-product-img" />
            <h3 className="arabica-product-title">{product.name}</h3>
            <p className="arabica-product-cost">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CafeArabica
