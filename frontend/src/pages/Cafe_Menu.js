"use client"

import { useEffect, useState } from "react"
import photo1 from '../20.jpg';
import "./cafe_Menu.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Cafe_Menu() {
  const {id} = useParams();
  const [cafe,setcafe] = useState() ;
  const [menu,setmenu] = useState([]) ;
  const [contact,setcontact] = useState() ;
  // State for reservation form
  const [reservationDate, setReservationDate] = useState("")
  const [reservationTime, setReservationTime] = useState("")
  const [guestCount, setGuestCount] = useState(2)
  const [sortBy, setSortBy] = useState("default")
  const navigate = useNavigate() ;
  
  //setReviews
  const [Reviews,setReviews] = useState([])

  // State for active tab
  const [activeTab, setActiveTab] = useState("Menu")

  // State for active category
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    if (!id) return; 

    axios.get(`http://localhost:8000/api/restaurants/${id}/menus`)
      .then(response => {
        setcafe(response.data.restaurant_name);
        setmenu(response.data.categories);
        setcontact(response.data.user)
      })
      .catch(err => {
        console.error('Erreur lors de la récupération du menu:', err);
      });


    // reviews
    axios.get(`http://localhost:8000/api/reviews/${id}`).then(res => {
      setReviews(res.data)
    }).catch(err=>{
      console.error(err) ; 
    })

  }, [cafe]);

  //popular cafes
  const [popularcafe,setpopularcafes] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8000/api/cafes/popular").then(res=> {
      setpopularcafes(res.data)
    }).catch(err=>{
      console.error(err)
    })
  },[])

  if (!cafe) return <p>Loading restaurant...</p>;


  // Operational hours data
  const operationalHours = [
    { day: "Monday", hours: "8:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 10:00 PM" },
    { day: "Friday", hours: "8:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 10:00 PM" },
  ]

  //reservatoin
  const got_to_reservation = () => {
       navigate(`/reservation/${id}`)
  }

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>,
        )
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <span key={i} className="star half-filled">
            ★
          </span>,
        )
      } else {
        stars.push(
          <span key={i} className="star">
            ☆
          </span>,
        )
      }
    }
    return stars
  }

  console.log(menu) ;
  console.log(contact.user) ;

  const categories = menu?.map(cat => ({ id: cat.id, name: cat.name }))

  const currentItems = activeCategory
    ? menu.find(cat => cat.name === activeCategory)?.items || []
    : menu.flatMap(cat => cat.items) || []

  const sortItems = (items) => {
    switch (sortBy) {
      case "price-asc":
        return [...items].sort((a, b) => a?.price - b?.price)
      case "price-desc":
        return [...items].sort((a, b) => b?.price - a?.price)
      case "name-asc":
        return [...items].sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return [...items].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return items
    }
  }

  const sortedItems = sortItems(currentItems)
 

  return (
    <div className="app1">
      {/* Navbar */}

      {/* Hero Section */}
      <section
        className="hero-section1"
        style={{ backgroundImage: `url(${photo1})` }}
        >
        <div className="hero-content1">
          <h1>{cafe}</h1>
          <div className="search-bar">
            <div className="search-inputs">
              <div className="search-input">
                <input type="text" placeholder="Search..." />
              </div>
              <div className="search-filter">
                <select>
                  <option>All Menu</option>
                  <option>Drinks</option>
                  <option>Food</option>
                </select>
              </div>
              <div className="search-location">
                <input type="text" placeholder="Location" />
              </div>
              <button className="search-button">Search</button>
            </div>
          </div>
        </div>
        <div className="open-info">
          <span className="open-icon">🟢</span>
          <span>Open until 10 PM</span>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="restaurant-info">
        <h2>{cafe}</h2>
        <div className="rating-info">
          <div className="stars">
            {renderStars(4.2)}
            <span className="rating-number">4.2</span>
          </div>
          <div className="reviews-count">
            <span>531 reviews</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content1">
        <div className="content-left">
    

          {/* Categories */}
          <div className="categories-container">
            <div className="our-menu">
              <h3>Our Menu</h3>
            </div>
            <div className="categories">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category ${activeCategory === category.name ? "category-active" : ""}`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  <img src={category.image || "/placeholder.svg"}  />
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coffee Products */}
          <div className="coffee-section">
            <div className="coffee-header">
              <h3>Coffe</h3>
              <div className="sort-by">
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
            <div className="coffee-products">
              {sortedItems?.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={`${product.image}`} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <div className="product-header">
                      <h4>{product.name}</h4>
                      <span className="product-price">{product.price} $</span>
                    </div>
                    <p className="product-description" style={{ color: "brown" }}>{product.description}</p>
                    <p className="product-description">{activeCategory? activeCategory : ''}</p>
                    {/* <div className="product-actions">
                      <button className="add-to-cart">Add to Cart</button>
                      <button className="view-details">View Details</button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-right">
          {/* Reservation Form */}
          <div className="reservation-form1">
            <h3>Make a reservation</h3>
            <div className="form-group">
              <div className="guest-count">
                <span className="icon">👥</span>
                <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)}>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <option value="6">6+ people</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group date">
                <span className="icon">📅</span>
                <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
              </div>
              <div className="form-group time">
                <span className="icon">🕒</span>
                <input type="time" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} />
              </div>
            </div>
            <button className="choose-table-btn" onClick={got_to_reservation}>Choose your Table</button>
            <div className="special-request">
              <span className="icon">📝</span>
              <span>Special & more notes</span>
            </div>
          </div>

          {/* Operational Times */}
          <div className="operational-times">
            <h3>
              <span className="icon">🕒</span>
              Operational Times
            </h3>
            <div className="times-list">
              {operationalHours.map((item, index) => (
                <div key={index} className="time-item">
                  <span className="day">{item.day}</span>
                  <span className="hours">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <h3>
              <span className="icon">📞</span>
              Contact Information
            </h3>
            <div className="contact-details">
              <div className="contact-item">
                <span className="label">Phone number</span>
                <span className="value">{contact?.user.phone}</span>
              </div>
              <div className="contact-item">
                <span className="label">Email</span>
                <span className="value">{contact?.user.email}</span>
              </div>
            </div>
          </div>

          {/* Advertisement */}
          {/* <div className="advertisement">
            <h2>Adds</h2>
          </div> */}
        </div>
      </div>

      {/* Map Section */}
      {/* <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sStarbucks!5e0!3m2!1sen!2sus!4v1652813333264!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
        <div className="map-info">
          <h3>Starbucks</h3>
          <div className="map-rating">
            {renderStars(4.2)}
            <span>(793) - 50 - 100 MAD</span>
          </div>
          <div className="map-category">
            <span>Café</span>
            <span className="map-icon">☕</span>
          </div>
        </div>
      </section> */}

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-container">
          {Reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="reviewer-name">{review?.user.name}</span>
               <span className="review-date">
                   {new Date(review?.created_at).toLocaleDateString()}
               </span>
              </div>
              <div className="review-rating">{renderStars(review.rating)}</div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))}
        </div>
        
      </section>

      {/* Popular Restaurants */}
      <section className="popular-restaurants">
        <h2>Simular Restaurants</h2>
        <div className="restaurant-logos">
          {popularcafe?.map((cafe) => (
            <div key={cafe.id} className="restaurant-logo">
              <img src={`http://localhost:8000/storage/${cafe.logo}`} alt={cafe.cover_image} />
              <span>{cafe.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}

export default Cafe_Menu
