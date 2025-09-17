import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ima from './1.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await axios.post('http://localhost:8000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        phone: formData.phone,
        address: formData.address,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="left-section">
        <div className="left-content">
          <h1>Join Our Community</h1>
          <p>Create an account to unlock exclusive features and start your journey with us.</p>
          <div className="image-container">
            <img src={ima} alt="People enjoying food delivery service" className="auth-image" />
          </div>
        </div>
      </div>

      <div className="right-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create password" required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
          </div>

          <div className="terms-group">
            <label>
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
              I agree to the terms & conditions
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn">Sign Up</button>

          <div className="auth-link">
            Already have an account? <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
