import "./Map.css"


const Map = () => {
  return (
    <section className="map-section1">
      <div className="map-header">
        <h2 className="map-title">Cities nearby</h2>
        <button className="display-cities-btn">
          Display all cities
          <i className="map-icon building-icon"></i>
        </button>
      </div>

      <div className="map-container">
        <img src={"placeholder.svg"} alt="Map showing nearby cities" className="map-image" />
      </div>
    </section>
  )
}

export default Map
