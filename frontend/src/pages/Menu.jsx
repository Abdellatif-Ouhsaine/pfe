"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import "./Menu.css"
import MenuCard from "../components/MenuCard"
import Cart from "../components/Cart"
import { menuData } from "../data/menuData"
import mennu from "../utensils-solid.svg" ;

const Menu = ({menus}) => {
  const { id } = useParams()
  const [category,setcategory] = useState() ;
  const [activeCategory, setActiveCategory] = useState()
  const [sortBy, setSortBy] = useState("default")

  useEffect(() => {
    if (category) {
      setActiveCategory(category)
    }
  }, [category])
  

  const categories = menus?.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }))

const currentItems = activeCategory
  ? menus?.find((cat) => cat.name === activeCategory)?.items || []
  : menus?.flatMap(cat => cat.items) || [];
  
  console.log(menus) 
  console.log(currentItems) 

  const sortItems = (items) => {
    switch (sortBy) {
      case "price-asc":
        return [...items].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...items].sort((a, b) => b.price - a.price)
      case "name-asc":
        return [...items].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...items].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return items
    }
  }

const sortedItems = sortItems(currentItems);

const navigate = useNavigate()
const reserver=()=>{
   navigate(`/reservation/${id}`)
}

  return (
    <div className="menu-page">
      <div className="container">
        <div className="menu-header">
          <h1 className="menu-title">Our Menu</h1>
          <button onClick={reserver} className="btn btn-primary reservation-btn">
              Make a Reservation
          </button>
        </div>

        <div className="menu-content">
          <div className="sidebar">
            <div className="categories-sidebar">
              <div className="menu-logoo">
              <img src={mennu} alt="" /> 
              <h3>Menu</h3>
              </div>
              <ul className="categories-list">
                {categories.map((cat) => (
                  <li key={cat.id} >
                    <span onClick={()=>setActiveCategory(cat.name)} className={activeCategory === cat.name ? "active" : ""}>
                      {cat.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="menu-items-container">
            <div className="menu-items-header">
              <h2 className="category-title">{currentItems?.name}</h2>
              <div className="sort-dropdown">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            <div className="menu-items-grid">
              {sortedItems?.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="cart-sidebar">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
