"use client";

import { useEffect, useState } from "react";
import "./Reviews.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reviews = () => {
  const { id } = useParams();
  const [Reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");

  

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/reviews/${id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= Reviews.length ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(Reviews.length - 4, 0) : prevIndex - 1
    );
  };

  const visibleReviews = Reviews.slice(currentIndex, currentIndex + 4);
  console.log(Reviews);
  console.log(visibleReviews);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="overall-rating">
          <div className="rating-number">4.1</div>
          <div className="rating-stars">
            {renderStars(4)}
            <span className="total-reviews">({Reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      <div className="reviews-container">
        {visibleReviews?.map((review) => (
          <div className="review-card" key={review?.id}>
            <div className="review-header">
              <div className="reviewer-name">{review.user?.name}</div>
              <div className="review-date">
                {new Date(review.created_at).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="review-rating">{renderStars(review?.rating)}</div>
            <p className="review-comment">{review?.comment}</p>
          </div>
        ))}
      </div>

      <div className="reviews-navigation">
        <button className="nav-btn prev-btn" onClick={prevReview}>
          &#8592;
        </button>
        <button className="nav-btn next-btn" onClick={nextReview}>
          &#8594;
        </button>
      </div>

      {/* add review */}
      <div className="add-review">
        <h3>Leave a Review</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newReview.rating < 1) {
              setMessage("Please select a rating.");
              return;
            }
            axios
              .post("http://localhost:8000/api/reviews", {
                restaurant_id: id,
                user_id: JSON.parse(localStorage.getItem('user')).id,
                rating: newReview.rating,
                comment: newReview.comment,
              })
              .then((res) => {
                setReviews([res.data, ...Reviews]);
                setNewReview({ rating: 0, comment: "" });
                setMessage("Thank you for your feedback!");
              })
              .catch(() =>
                setMessage("Error submitting your review. Try again.")
              );
          }}
        >
          <div className="stars-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  hoverRating >= star || newReview.rating >= star
                    ? "filled"
                    : ""
                }`}
                onClick={() => setNewReview({ ...newReview, rating: star })}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>

          <div className="floating-label">
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            />
            <label className={newReview.comment ? "active" : ""}>
              Write your comment...
            </label>
          </div>

          <button type="submit">Send Review</button>
          {message && <div className="form-message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Reviews;
