import { useState } from "react"
import Hero from "../components/Resto/Hero"
import Filters from "../components/Resto/Filters"
import RestaurantList from "../components/Resto/RestaurantList"
import Categories from "../components/Resto/Categories"
import MapToggle from "../components/Resto/MapToggle"
import ChefsChoice from "../components/Resto/ChefsChoice"
import CustomerFavorites from "../components/Resto/CustomerFavorites"
import AppPromo from "../components/Resto/AppPromo"
import RecentlyViewed from "../components/Resto/RecentlyViewed"
import Testimonials from "../components/Resto/Testimonials"
import "./Restaurent.css"

const Restaurent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  console.log(selectedCategory)

  return (
    <div className="home-container5">
      <Hero />
      <div className="main-content5">
        <div className="sidebar5">
          <Filters />
        </div>
        <div className="content5">
          <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <MapToggle />
          <RestaurantList selectedCategori={selectedCategory} />
          {/* <ChefsChoice /> */}
          <CustomerFavorites />
          <AppPromo />
          <Testimonials />
        </div>
      </div>
      <RecentlyViewed />
    </div>
  )
}

export default Restaurent
