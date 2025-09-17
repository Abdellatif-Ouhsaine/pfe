import "./Cafe.css"

import HeroSection from "../components/cafe/HeroSection"
import FeaturedCafes from "../components/cafe/FeaturedCafes"
import CafeCategories from "../components/cafe/CafeCategories"
import CafeList from "../components/cafe/CafeList"
import { useState } from "react"

function Cafe() {
  const [selectedCategory, setSelectedCategory] = useState("Café") // default category

  return (
    <div className="coffee-discovery-wrapper">
      <HeroSection />
      <div className="main-content-container">
        <FeaturedCafes />
        {/* <CafeCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        /> */}
        <CafeList selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}

export default Cafe
