"use client"

import { useState } from "react"

function CategoriesAndProducts() {
  const [activeTab, setActiveTab] = useState("Espresso")

  const categories = [
    { id: 1, name: "Espresso", image: "https://via.placeholder.com/100x100" },
    { id: 2, name: "Latte", image: "https://via.placeholder.com/100x100" },
    { id: 3, name: "Cappuccino", image: "https://via.placeholder.com/100x100" },
    { id: 4, name: "Cold Brew", image: "https://via.placeholder.com/100x100" },
    { id: 5, name: "Bakery", image: "https://via.placeholder.com/100x100" },
    { id: 6, name: "Snacks", image: "https://via.placeholder.com/100x100" },
    { id: 7, name: "Hot Chocolate", image: "https://via.placeholder.com/100x100" },
  ]

  const tabs = ["Espresso", "Latte", "Bakery", "Iced", "Snacks"]

  const products = {
    Espresso: [
      { id: 1, name: "Classic Espresso", price: "$3.99", image: "https://via.placeholder.com/300x200" },
      { id: 2, name: "Double Shot", price: "$4.99", image: "https://via.placeholder.com/300x200" },
      { id: 3, name: "Ristretto", price: "$4.49", image: "https://via.placeholder.com/300x200" },
    ],
    Latte: [
      { id: 1, name: "Vanilla Latte", price: "$4.49", image: "https://via.placeholder.com/300x200" },
      { id: 2, name: "Caramel Latte", price: "$4.79", image: "https://via.placeholder.com/300x200" },
      { id: 3, name: "Hazelnut Latte", price: "$4.99", image: "https://via.placeholder.com/300x200" },
    ],
    Bakery: [
      { id: 1, name: "Croissant", price: "$2.99", image: "https://via.placeholder.com/300x200" },
      { id: 2, name: "Chocolate Muffin", price: "$3.49", image: "https://via.placeholder.com/300x200" },
      { id: 3, name: "Cinnamon Roll", price: "$3.99", image: "https://via.placeholder.com/300x200" },
    ],
    Iced: [
      { id: 1, name: "Iced Americano", price: "$3.49", image: "https://via.placeholder.com/300x200" },
      { id: 2, name: "Iced Latte", price: "$4.29", image: "https://via.placeholder.com/300x200" },
      { id: 3, name: "Cold Brew", price: "$4.79", image: "https://via.placeholder.com/300x200" },
    ],
    Snacks: [
      { id: 1, name: "Chocolate Chip Cookie", price: "$2.49", image: "https://via.placeholder.com/300x200" },
      { id: 2, name: "Almond Biscotti", price: "$1.99", image: "https://via.placeholder.com/300x200" },
      { id: 3, name: "Cheese Danish", price: "$3.29", image: "https://via.placeholder.com/300x200" },
    ],
  }

  return (
    <div className="categories-wrapper">
      <h2 className="categories-heading">Coffee Categories</h2>

      <div className="categories-scroll-area">
        {categories.map((category) => (
          <div className="category-circle-item" key={category.id}>
            <img src={category.image || "/placeholder.svg"} alt={category.name} className="category-circle-img" />
            <p className="category-circle-label">{category.name}</p>
          </div>
        ))}
      </div>

      <div className="coffee-tabs-row">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`coffee-tab-btn ${activeTab === tab ? "coffee-tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="coffee-products-grid">
        {products[activeTab].map((product) => (
          <div className="coffee-product-item" key={product.id}>
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="coffee-product-img" />
            <h3 className="coffee-product-title">{product.name}</h3>
            <p className="coffee-product-cost">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesAndProducts
