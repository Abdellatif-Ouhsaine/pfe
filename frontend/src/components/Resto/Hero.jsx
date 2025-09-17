import "./Hero.css"
import burg from './10000.png'
import pizza from './1111.avif'
import piza from "./1111.png"
import fod from "./1112.png"
const Hero = () => {
  return (
    <div className="hero-section5">
      <div className="hero-content5">
        <h1 className="hero-title5">Find Local Flavors You Love — Delivered Fast</h1>
        <div className="hero-tags5">
          <span className="tag trending">🔥 Trending Now</span>
          <span className="tag new">🆕 New on GoBite</span>
          <span className="tag healthy">🌿 Healthy Picks</span>
        </div>
        <div className="hero-search">
          <input type="text" placeholder="Enter your delivery address" className="hero-search-input" />
          <button className="hero-search-btn">Find Food</button>
        </div>
      </div>
      <div className="hero-animation">
        {/* Animated icons/doodles would go here */}
        <div className="animated-icon food-icon-1"><img src={fod} /></div>
      </div>
    </div>
  )
}

export default Hero
