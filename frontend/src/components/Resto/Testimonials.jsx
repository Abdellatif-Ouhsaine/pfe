"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./Testimonials.css";
import axios from "axios";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    location: "New York, NY",
    rating: 5,
    quote:
      "GoBite has completely changed how I order food. The delivery is always on time and the food arrives hot!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Chicago, IL",
    rating: 5,
    quote:
      "I love the variety of restaurants available. I've discovered so many new favorite places through GoBite.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Jessica L.",
    location: "Los Angeles, CA",
    rating: 4,
    quote:
      "The app is super easy to use and the customer service is excellent. Highly recommend!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

const Testimonials = () => {
  const [Reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des reviews :", error);
      });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setActiveIndex((prevIndex) =>
//       Reviews.length > 0 ? (prevIndex + 1) % Reviews.length : 0
//     );
//   }, 5000);

//   return () => clearInterval(interval);
// }, [Reviews]);

  return (
    <div className="testimonials-section">
      <h2 className="section-title">What Our Customers Say</h2>

      <div className="testimonials-container">
        <div className="testimonials-carousel">
          {Reviews.map((rev, index) => (
            <div
              key={rev.id}
              className={`testimonial-card ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <div className="testimonial-avatar">
                {rev.user?.avatar ? (
                  <img src={rev.user.avatar} alt={rev.user.name} />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {rev.user?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>

              <div className="testimonial-content">
                <p className="testimonial-quote">"{rev.comment}"</p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < rev.rating ? "#FFD700" : "none"}
                      color={i < rev.rating ? "#FFD700" : "#ccc"}
                    />
                  ))}
                </div>
                <p className="testimonial-author">{rev.user.name}</p>
                <p className="testimonial-location">{rev.user.address}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-dots">
          {Reviews.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
