import "./Hero.css"
import logo from "./1.png"

const Hero = () => {
  return (
    <section className="hero-section2">
      <div className="hero-content2">
        <div className="hero-text">
          <p className="hero-subtitle">Order Restaurant food, takeaway and groceries.</p>
          <h1 className="hero-title">
            Taste the Best,
            <span className="hero-highlight">Fresh Every Time</span>
          </h1>

          <div className="hero-search">
            <input type="text" className="hero-search-input" placeholder="Search for a restaurant" />
            <button className="hero-search-btn">Search</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={logo} alt="Food delivery illustration" />
        </div>
      </div>
    </section>
  )
}

export default Hero
