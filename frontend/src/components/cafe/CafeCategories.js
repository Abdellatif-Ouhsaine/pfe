
import { useState } from "react"
import ServiceCard from "./service.jsx"

function CafeCategories() {
    const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const coffeeServices = [
  {
    id: "reserve-table",
    name: "Reserve Table",
    icon: "🪑",
    gradient: "amber-orange-gradient",
    popular: true,
    description: "Book your perfect spot",
    fullDescription:
      "Reserve your table in advance and enjoy a premium coffee experience with guaranteed seating. Perfect for dates, meetings, or casual dining.",
    duration: "1-3 hours",
    price: "Free reservation",
    features: ["Guaranteed seating", "Priority service", "Special occasions setup", "Flexible timing"],
  },
  {
    id: "quick-pickup",
    name: "Quick Pickup",
    icon: "⚡",
    gradient: "green-emerald-gradient",
    popular: true,
    description: "Grab & go in minutes",
    fullDescription:
      "Order ahead and skip the line. Your coffee will be ready when you arrive, saving you valuable time.",
    duration: "2-5 minutes",
    price: "No extra charge",
    features: ["Skip the line", "Order ahead", "Mobile notifications", "Express service"],
  },
  {
    id: "coffee-tasting",
    name: "Coffee Tasting",
    icon: "☕",
    gradient: "brown-amber-gradient",
    popular: false,
    description: "Premium tasting experience",
    fullDescription:
      "Join our expert baristas for an exclusive coffee tasting session and discover new flavors from around the world.",
    duration: "45-60 minutes",
    price: "$25 per person",
    features: ["Expert guidance", "5 coffee varieties", "Tasting notes", "Take-home samples"],
  },
  {
    id: "business-meeting",
    name: "Business Meeting",
    icon: "💼",
    gradient: "blue-indigo-gradient",
    popular: true,
    description: "Professional dining space",
    fullDescription:
      "Professional atmosphere with quiet spaces, WiFi, and meeting-friendly seating arrangements for productive business discussions.",
    duration: "1-4 hours",
    price: "Minimum $50 order",
    features: ["Quiet environment", "High-speed WiFi", "Power outlets", "Meeting packages"],
  },
  {
    id: "group-dining",
    name: "Group Dining",
    icon: "👥",
    gradient: "purple-pink-gradient",
    popular: false,
    description: "Tables for large groups",
    fullDescription:
      "Large tables and group packages perfect for celebrations, meetings, or casual gatherings with friends and family.",
    duration: "2-4 hours",
    price: "Group discounts available",
    features: ["Large tables", "Group menus", "Special pricing", "Event coordination"],
  },
  {
    id: "barista-experience",
    name: "Barista Experience",
    icon: "👨‍🍳",
    gradient: "red-orange-gradient",
    popular: true,
    description: "Learn coffee making",
    fullDescription:
      "Learn the art of coffee making from our professional baristas in hands-on workshops. Perfect for coffee enthusiasts.",
    duration: "90 minutes",
    price: "$45 per person",
    features: ["Hands-on training", "Professional equipment", "Certificate", "Take-home coffee"],
  },
  {
    id: "study-space",
    name: "Study Space",
    icon: "📚",
    gradient: "teal-cyan-gradient",
    popular: true,
    description: "Quiet work environment",
    fullDescription:
      "Quiet zones with comfortable seating, power outlets, and unlimited WiFi for productive work sessions and studying.",
    duration: "2-8 hours",
    price: "Minimum $15 order",
    features: ["Quiet zones", "Unlimited WiFi", "Power outlets", "Comfortable seating"],
  },
  {
    id: "date-night",
    name: "Date Night",
    icon: "💕",
    gradient: "rose-pink-gradient",
    popular: false,
    description: "Romantic coffee dates",
    fullDescription:
      "Intimate seating arrangements and romantic ambiance for your special coffee dates with mood lighting and privacy.",
    duration: "1-3 hours",
    price: "Special date packages",
    features: ["Intimate seating", "Romantic ambiance", "Special desserts", "Privacy"],
  },
  {
    id: "private-events",
    name: "Private Events",
    icon: "🎉",
    gradient: "violet-purple-gradient",
    popular: false,
    description: "Exclusive celebrations",
    fullDescription:
      "Exclusive venue rental for birthdays, anniversaries, and corporate events with custom menus and dedicated service.",
    duration: "3-6 hours",
    price: "Starting from $200",
    features: ["Exclusive venue", "Custom menus", "Dedicated staff", "Event planning"],
  },
]

const handleServiceClick = (service) => {
  setSelectedService(service)
  setShowModal(true)
  setActiveCategory(service.id)
}
 
return (

<section className="gobite-services-section">
  <div className="gobite-section-container">
    <div className="gobite-section-intro">
      <h2 className="gobite-section-title">Coffee Services & Reservations</h2>
      <div className="gobite-title-underline"></div>
      <p className="gobite-section-description">
        Choose your perfect coffee experience - from quick pickups to memorable dining experiences
      </p>
    </div>

    <div className="gobite-services-grid">
      {coffeeServices.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isActive={activeCategory === service.id}
          onClick={handleServiceClick}
        />
      ))}
    </div>
  </div>
</section>
)
}
export default CafeCategories
