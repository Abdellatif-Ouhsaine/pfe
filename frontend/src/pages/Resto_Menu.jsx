import React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import "./Resto_Menu.css"
import Menu from "./Menu"
import MenuCard from "../components/MenuCard"
import MapSection from "../components/MapSection"
import Reviews from "../components/Reviews"
import { menuData } from "../data/menuData"
import axios from 'axios' ;
import { useSelectedRestaurant } from ".././context/SelectedRestaurantContext";




const popularRestaurants = [
  { id: "mcdonalds", name: "McDonald's", image: "/placeholder.svg?height=60&width=60" },
  { id: "tacobell", name: "Taco Bell", image: "/placeholder.svg?height=60&width=60" },
  { id: "kfc", name: "KFC", image: "/placeholder.svg?height=60&width=60" },
  { id: "subway", name: "Subway", image: "/placeholder.svg?height=60&width=60" },
  { id: "burgerking", name: "Burger King", image: "/placeholder.svg?height=60&width=60" },
  { id: "starbucks", name: "Starbucks", image: "/placeholder.svg?height=60&width=60" },
]

const Resto = () => {
   
  const [resto, setResto] = useState();
  const {id} = useParams()
  const [Contact,setContact] = useState() ;
  const [SimilarRestaurants,setSimilarRestaurants] = useState([])

  // const location = useLocation();

  // useEffect(() => {
  //   if (location.state?.resto) {
  //     setResto(location.state.resto);
  //   } 
  // }, [location]);


  const [menu,setMenu] = useState([]) ;

  useEffect(() => {
    if (!id) return; 

    axios.get(`http://localhost:8000/api/restaurants/${id}/menus`)
      .then(response => {
        setResto(response.data.restaurant_name);
        setMenu(response.data.categories);
        setContact(response.data.user)
      })
      .catch(err => {
        console.error('Erreur lors de la récupération du menu:', err);
      });
  }, [resto]);

  useEffect(() => {
  axios.get(`http://localhost:8000/api/restaurants/${id}/similar`)
    .then(res => {
      setSimilarRestaurants(res.data);
    })
    .catch(err => console.error(err));
}, [id]);

  if (!resto) return <p>Loading restaurant...</p>;


  

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>{resto}</h1>
              <p className="delivery-info">Delivery in 10-20 Minutes</p>
              <div className="hero-buttons">
                <Link to="/menu/pizza" className="btn btn-primary">
                  Order Now
                </Link>
                <Link to="/reservation/" className="btn btn-outline">
                  Make a Reservation
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section className="order-section section">
        <div className="container">
          <h2 className="section-title">Order from {resto}</h2>
            {/* menu */}
           <Menu menus={menu}/>
          <h3 className="sub-section-title">Popular Items</h3>
          <div className="view-all-container">
            <Link to="/menu/pizza" className="btn btn-outline">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Location</h2>
          <MapSection />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section">
        <div className="container">
          <Reviews />
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>Delivery Information</h3>
              <ul className="info-list">
                <li>
                  <span className="day">Monday:</span>
                  <span className="hours">9:00 AM - 10:00 PM</span>
                </li>
                <li>
                  <span className="day">Tuesday:</span>
                  <span className="hours">9:00 AM - 10:00 AM</span>
                </li>
                <li>
                  <span className="day">Wednesday:</span>
                  <span className="hours">9:00 AM - 10:00 PM</span>
                </li>
                <li>
                  <span className="day">Thursday:</span>
                  <span className="hours">9:00 AM - 10:00 AM</span>
                </li>
                <li>
                  <span className="day">Friday:</span>
                  <span className="hours">9:00 AM - 10:00 PM</span>
                </li>
                <li>
                  <span className="day">Saturday:</span>
                  <span className="hours">9:00 AM - 10:00 AM</span>
                </li>
                <li>
                  <span className="day">Sunday:</span>
                  <span className="hours">9:00 AM - 10:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Contact Information</h3>
              <ul className="info-list">
                <li>
                  <span className="info-label">Phone number:</span>
                  <span className="info-value">{Contact?.user.phone}</span>
                </li>
                <li>
                  <span className="info-label">Email:</span>
                  <span className="info-value">{Contact?.user.email}</span>
                </li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Operational Times</h3>
              <ul className="info-list">
                <li>
                  <span className="day">Monday:</span>
                  <span className="hours">8:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span className="day">Tuesday:</span>
                  <span className="hours">8:00 AM - 11:00 AM</span>
                </li>
                <li>
                  <span className="day">Wednesday:</span>
                  <span className="hours">8:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span className="day">Thursday:</span>
                  <span className="hours">8:00 AM - 11:00 AM</span>
                </li>
                <li>
                  <span className="day">Friday:</span>
                  <span className="hours">8:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span className="day">Saturday:</span>
                  <span className="hours">8:00 AM - 11:00 AM</span>
                </li>
                <li>
                  <span className="day">Sunday:</span>
                  <span className="hours">8:00 AM - 11:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="popular-restaurants section">
        <div className="container">
          <h2 className="section-title">Similar Restaurants</h2>
          <div className="restaurants-grid">
            {SimilarRestaurants?.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                <div className="restaurant-image">
                  <img src={`http://localhost:8000/storage/${restaurant.logo}`} alt={restaurant.name} />
                </div>
                <h3>{restaurant.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Resto ;
