import React, { useState } from "react";
import "./partner.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const Partner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // User info (propriétaire)
    ownerFullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmpassword: "",

    // Restaurant info
    businesstype: "",
    businessName: "",
    cuisineType: "",
    businessAddress: "",
    businessDescription: "",
    businessLicense: null,
    imageresto: null,
    agreeToTerms: false,
  });

  //type de cuisine
  const cuisineOptions = [
    { value: "francaise", label: "Française" },
    { value: "japonaise", label: "Japonaise" },
    { value: "italienne", label: "Italienne" },
    { value: "moyen-orient", label: "Moyen-Orient" },
    { value: "fast-food", label: "Fast Food" },
    { value: "americaine", label: "Américaine" },
    { value: "mexicaine", label: "Mexicaine" },
    { value: "chinoise", label: "Chinoise" },
    { value: "indienne", label: "Indienne" },
    { value: "thailandaise", label: "Thaïlandaise" },
    { value: "espagnole", label: "Espagnole" },
    { value: "coreenne", label: "Coréenne" },
    { value: "vegetarienne", label: "Végétarienne" },
    { value: "vegetalienne", label: "Végétalienne" },
    { value: "africaine", label: "Africaine" },
    { value: "mediterraneenne", label: "Méditerranéenne" },
    { value: "bresilienne", label: "Brésilienne" },
    { value: "turque", label: "Turque" },
    { value: "allemande", label: "Allemande" },
    { value: "vietnamienne", label: "Vietnamienne" },
    { value: "libanaise", label: "Libanaise" },
    { value: "breakfast", label: "Breakfast (Petit-déjeuner)" },
    { value: "pizza", label: "Pizza" },
    { value: "salads", label: "Salads (Salades)" },
    { value: "soupes", label: "Soupes" },
    { value: "sandwiches", label: "Sandwiches" },
    { value: "desserts", label: "Desserts" },
    { value: "grillades", label: "Grillades" },
    { value: "tacos", label: "Tacos" },
    { value: "fruits-de-mer", label: "Fruits de mer" },
    { value: "autre", label: "Autre" },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit the form
      setIsSubmitted(true);
      console.log(formData);
      submitForm();
    }
  };

  async function submitForm() {
    try {
      // 1. Create user
      const userResponse = await axios.post("http://localhost:8000/api/users", {
        name: formData.ownerFullName,
        email: formData.emailAddress,
        phone: formData.phoneNumber,
        password: formData.password,
        password_confirmation: formData.confirmpassword,
        type: "admin",
      });

      const userId = userResponse.data.user.id;

      // 2. Create FormData for restaurant (file upload needs this)
      const restaurantForm = new FormData();
      restaurantForm.append("user_id", userId);
      restaurantForm.append("name", formData.businessName);
      restaurantForm.append("business_type", formData.businesstype);
      restaurantForm.append("cuisine_type", formData.cuisineType);
      restaurantForm.append("address", formData.businessAddress);
      restaurantForm.append("description", formData.businessDescription);
      restaurantForm.append(
        "agree_to_terms",
        formData.agreeToTerms ? "1" : "0"
      );

      restaurantForm.append("status", "pending");

      // Add files only if selected
      if (formData.businessLicense) {
        restaurantForm.append("business_license", formData.businessLicense);
      }
      if (formData.imageresto) {
        restaurantForm.append("logo", formData.imageresto);
      }

      // 3. Submit to backend
      await axios.post(
        "http://localhost:8000/api/restaurants",
        restaurantForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Partner and restaurant created successfully!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.error("Validation errors:", error.response.data.errors);
        alert(
          "Validation error: " + JSON.stringify(error.response.data.errors)
        );
      } else {
        console.error("Error submitting form:", error);
        alert("Unexpected error occurred.");
      }
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div className="onboarding-container">
        <div className="placeholder-area"></div>
        <div className="form-area">
          <div className="form-header">
            <h1>Let's grow your restaurant together!</h1>
            <button className="close-button">×</button>
          </div>

          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2>Registration Successful!</h2>
            <p>We'll be in touch soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      <div className="placeholder-area"></div>
      <div className="form-area">
        <div className="form-header">
          <h1>Let's grow your restaurant together!</h1>
          <button className="close-button">×</button>
        </div>

        <div className="progress-indicators">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <form onSubmit={handleNext}>
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="businesstype">Business Type</label>
                <select
                  id="businesstype"
                  name="businesstype"
                  value={formData.businesstype}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">-- Select type --</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cuisineType">Type of Cuisine</label>
                <Select
                  options={cuisineOptions}
                  value={cuisineOptions.find(
                    (option) => option.value === formData.cuisineType
                  )}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      cuisineType: selectedOption.value,
                    })
                  }
                  placeholder="Sélectionner un type de cuisine"
                  isSearchable
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessAddress">Business Address</label>
                <input
                  type="text"
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="ownerFullName">Owner's Full Name</label>
                <input
                  type="text"
                  id="ownerFullName"
                  name="ownerFullName"
                  value={formData.ownerFullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm your Password</label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-group">
                <label htmlFor="businessLicense">
                  Business License (Upload)
                </label>
                <input
                  type="file"
                  id="businessLicense"
                  name="businessLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageresto">
                  restaurant/Cafe image (Upload)
                </label>
                <input
                  type="file"
                  id="imageresto"
                  name="imageresto"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessDescription">
                  Business Description
                </label>
                <textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
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

          <div className="form-navigation">
            {step > 1 && (
              <button
                type="button"
                className="prev-button"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            <button type="submit" className="next-button">
              {step < 3 ? "Next" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Partner;
