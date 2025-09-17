import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="https://placeholder.svg?height=40&width=40" alt="Logo" />
            <p>Everything for the love of food! Discover the best restaurants, cafés & bars in your area.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#reviews">Reviews</a>
                </li>
                <li>
                  <a href="#updates">Updates</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#partners">Partners</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#newsletter">Newsletter</a>
                </li>
                <li>
                  <a href="#events">Events</a>
                </li>
                <li>
                  <a href="#help">Help Center</a>
                </li>
                <li>
                  <a href="#tutorials">Tutorials</a>
                </li>
                <li>
                  <a href="#support">Support</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#terms">Terms</a>
                </li>
                <li>
                  <a href="#privacy">Privacy</a>
                </li>
                <li>
                  <a href="#cookies">Cookies</a>
                </li>
                <li>
                  <a href="#licenses">Licenses</a>
                </li>
                <li>
                  <a href="#settings">Settings</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Café Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookies Settings</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer
