import { useNavigate } from "react-router-dom"
import "./Partners.css"

const Partners = () => {
  const navigate = useNavigate()
  return (
    <section className="partners-section" >
      <h2>Be Partner with Us</h2> <br />
      <div className="partners-cards" >
        <div className="partner-card restaurant-partner" onClick={()=>navigate('/partner')}>
          <div className="partner-content">
            <h2 className="partner-title">Partner with us</h2>
            <button className="partner-btn">Get Started</button>
          </div>
        </div>

        <div className="partner-card rider-partner" onClick={()=>navigate('/lelivreur')}>
          <div className="partner-content">
            <h2 className="partner-title">Ride with us</h2>
            <button className="partner-btn">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
