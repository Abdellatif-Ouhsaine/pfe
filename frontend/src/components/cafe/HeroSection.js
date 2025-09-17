function HeroSection() {
  return (
    <div className="banner-wrapper">
      <div className="banner-dark-overlay">
        <h1 className="banner-main-heading">Let's Explore and Order Coffee Today!</h1>
        <div className="banner-search-box">
          <input type="text" className="banner-input-field" placeholder="Search for your favorite coffee shop…" />
          <button className="banner-search-btn">Search</button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
