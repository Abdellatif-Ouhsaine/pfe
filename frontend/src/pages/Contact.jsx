"use client"

import { useState } from "react"
import "./Contact.css"
import MapSection from "../components/MapSection"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to a server
    console.log("Contact form data:", formData)
    setFormSubmitted(true)
  }

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>

        <div className="contact-content">
          <div className="contact-info-section">
            <div className="contact-card">
              <h3>Our Location</h3>
              <MapSection />
            </div>

            <div className="contact-card">
              <h3>Contact Information</h3>
              <ul className="contact-list">
                <li>
                  <span className="contact-label">Address:</span>
                  <span className="contact-value">123 Main Street, New York, NY 10001</span>
                </li>
                <li>
                  <span className="contact-label">Phone:</span>
                  <span className="contact-value">+1234444443</span>
                </li>
                <li>
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">info@pizzahut.com</span>
                </li>
                <li>
                  <span className="contact-label">Website:</span>
                  <span className="contact-value">http://pizzahut.com/</span>
                </li>
              </ul>
            </div>

            <div className="contact-card">
              <h3>Opening Hours</h3>
              <ul className="hours-list">
                <li>
                  <span className="day">Monday - Friday:</span>
                  <span className="hours">8:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span className="day">Saturday:</span>
                  <span className="hours">9:00 AM - 11:00 PM</span>
                </li>
                <li>
                  <span className="day">Sunday:</span>
                  <span className="hours">10:00 AM - 10:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="contact-form-section">
            {formSubmitted ? (
              <div className="form-success">
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <div className="contact-form-container">
                <h2>Send Us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
