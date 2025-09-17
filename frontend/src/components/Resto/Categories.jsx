"use client"

import React from "react"
import "./Categories.css"

const categories = [
  { id: 1, name: "francaise", icon: "🥖" },
  { id: 2, name: "japonaise", icon: "🍱" },
  { id: 3, name: "italienne", icon: "🍝" },
  { id: 4, name: "moyen-orient", icon: "🥙" },
  { id: 5, name: "fast-food", icon: "🍔" },
  { id: 6, name: "americaine", icon: "🌭" },
  { id: 7, name: "mexicaine", icon: "🌮" },
  { id: 8, name: "chinoise", icon: "🥡" },
  { id: 9, name: "indienne", icon: "🍛" },
  { id: 10, name: "thailandaise", icon: "🍲" },
  { id: 11, name: "espagnole", icon: "🥘" },
  { id: 12, name: "coreenne", icon: "🍜" },
  { id: 13, name: "vegetarienne", icon: "🥗" },
  { id: 14, name: "vegetalienne", icon: "🌿" },
  { id: 15, name: "africaine", icon: "🍲" },
  { id: 16, name: "mediterraneenne", icon: "🫒" },
  { id: 17, name: "bresilienne", icon: "🥩" },
  { id: 18, name: "turque", icon: "🍢" },
  { id: 19, name: "allemande", icon: "🥨" },
  { id: 20, name: "vietnamienne", icon: "🍜" },
  { id: 21, name: "libanaise", icon: "🥙" },
  { id: 22, name: "breakfast", icon: "🍳" },
  { id: 23, name: "pizza", icon: "🍕" },
  { id: 24, name: "salads", icon: "🥗" },
  { id: 25, name: "soupes", icon: "🥣" },
  { id: 26, name: "sandwiches", icon: "🥪" },
  { id: 27, name: "desserts", icon: "🍰" },
  { id: 28, name: "grillades", icon: "🔥" },
  { id: 29, name: "tacos", icon: "🌮" },
  { id: 30, name: "fruits-de-mer", icon: "🦐" },
  { id: 31, name: "autre", icon: "🍽️" }
];


const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="categories-section44">
      <h2 className="section-title">Popular Categories</h2>
      <div className="categories-wrapper44">
        <div className="categories-container44">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item44 ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            >
              <div className="category-icon44">{category.icon}</div>
              <div className="category-name44">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Categories
