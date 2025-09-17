"use client"

import { useState } from "react"
import "./MenuCard.css"
import { useCart } from "../context/CartContext"
import imaga from "../3.avif"

const MenuCard = ({ item }) => {
  const { id, name, description, image, price } = item
  const [selectedSize, setSelectedSize] = useState('medieum')
  const { addToCart , cartItems } = useCart()

  // const getPrice = () => {
  //   return sizes?.find((s) => s.size === selectedSize).price
  // }

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      image,
      price,
    })
  }

  

  return (
    <div className="menu-card">
      <div className="menu-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="menu-card-content">
        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-description">{description}</p>

        {/* <div className="menu-card-sizes">
          {sizes?.map((sizeOption) => (
            <button
              key={sizeOption.size}
              className={`size-btn ${selectedSize === sizeOption.size ? "active" : ""}`}
              onClick={() => setSelectedSize(sizeOption.size)}
            >
              {sizeOption.size}
            </button>
          ))}
        </div> */}

        <div className="menu-card-footer">
          <span className="menu-card-price">{price} DH</span>
          <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuCard
