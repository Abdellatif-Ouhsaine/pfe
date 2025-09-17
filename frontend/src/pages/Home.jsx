
import Nav from "../components/mm/Nav"
import Hero from "../components/mm/Hero"
import RestaurantCafe from "../components/mm/RestaurantCafe"
import Map from "../components/mm/Map"
import Partners from "../components/mm/Partners"
import "./Home.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function Home() {
  

  return (
    <div className="app-container">
      <main>
        <Hero />
        <RestaurantCafe />
        <Partners />
      </main>
    </div>
  )
}

export default Home
