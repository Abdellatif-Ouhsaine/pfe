import React, { useState } from "react";
import axios from "axios";
import "./livreur_partener.css";

const Livreure = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    vehicleType: "",
    vehicleModel: "",
    licensePlate: "",
    idDocument: null,
    drivingLicense: null,
    agreeToTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Prepare multipart form data
      const formPayload = new FormData();
      formPayload.append("fullName", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append("password", formData.password);
      formPayload.append("password_confirmation", formData.confirm_password);
      formPayload.append("phone", formData.phone);
      formPayload.append("vehicleType", formData.vehicleType);
      formPayload.append("vehicleModel", formData.vehicleModel);
      formPayload.append("licensePlate", formData.licensePlate);
      formPayload.append("idDocument", formData.idDocument);
      formPayload.append("drivingLicense", formData.drivingLicense);
      formPayload.append("type", "admin");

      try {
        const response = await axios.post(
          "http://localhost:8000/api/register-rider",
          formPayload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201 || response.status === 200) {
          setIsSubmitted(true);
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          const messages = Object.values(error.response.data.errors)
            .flat()
            .join("\n");
          alert("Registration failed:\n" + messages);
        } else if (error.response && error.response.data.message) {
          alert("Error: " + error.response.data.message);
        } else {
          alert("An unknown error occurred.");
        }
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (isSubmitted) {
    return (
      <div className="livreur-container">
        <div className="livreur-placeholder"></div>
        <div className="livreur-form">
          <div className="livreur-header">
            <h1>Welcome to the delivery team!</h1>
            <button className="livreur-close">×</button>
          </div>
          <div className="livreur-success">
            <div className="livreur-success-icon">✓</div>
            <h2>Application Submitted!</h2>
            <p>We'll contact you shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="livreur-container">
      <div className="livreur-placeholder"></div>
      <div className="livreur-form">
        <div className="livreur-header">
          <h1>Join as a Delivery Partner</h1>
          <button className="livreur-close">×</button>
        </div>

        <div className="livreur-progress">
          <div className={`livreur-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`livreur-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`livreur-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <form onSubmit={handleNext}>
          {step === 1 && (
            <>
              <div className="livreur-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="livreur-group">
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select vehicle type
                  </option>
                  <option value="bike">Bike</option>
                  <option value="scooter">Motor</option>
                  <option value="car">Car</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="livreur-group">
                <label htmlFor="vehicleModel">Vehicle Model</label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group">
                <label htmlFor="licensePlate">License Plate</label>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="livreur-group">
                <label htmlFor="idDocument">Upload ID Document</label>
                <input
                  type="file"
                  id="idDocument"
                  name="idDocument"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group">
                <label htmlFor="drivingLicense">Upload Driving License</label>
                <input
                  type="file"
                  id="drivingLicense"
                  name="drivingLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="livreur-group livreur-checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  I agree to the Terms and Conditions
                </label>
              </div>
            </>
          )}

          <div className="livreur-navigation">
            {step > 1 && (
              <button
                type="button"
                className="livreur-prev"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            <button type="submit" className="livreur-next">
              {step < 3 ? "Next" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Livreure;
