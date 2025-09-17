"use client"

import React from "react"
import { X } from "lucide-react"
import "./RecentlyViewed.css"

const recentItems = [
  {
    id: 1,
    name: "Pizza Palace",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Sushi World",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Burger Joint",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const RecentlyViewed = () => {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <div className="recently-viewed-container">
      <div className="recently-viewed-header">
        <h3>Recently Viewed</h3>
        <button className="close-btn" onClick={() => setIsVisible(false)}>
          <X size={16} />
        </button>
      </div>
      <div className="recently-viewed-items">
        {recentItems.map((item) => (
          <div key={item.id} className="recent-item">
            <img src={item.image || "/placeholder.svg"} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
