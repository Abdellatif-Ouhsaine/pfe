import "./MapSection.css"

const MapSection = () => {
  return (
    <div className="map-section">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sPizza%20Hut!5e0!3m2!1sen!2sus!4v1652445299564!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pizza Hut Location"
        ></iframe>
      </div>
      <div className="location-info">
        <h3>Pizza Hut</h3>
        <div className="rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-count">(484)</span>
          <span className="price-range">$$</span>
        </div>
        <p className="address">123 Main Street, New York, NY 10001</p>
        <a href="https://goo.gl/maps/123" target="_blank" rel="noopener noreferrer" className="directions-link">
          Get Directions
        </a>
      </div>
    </div>
  )
}

export default MapSection
