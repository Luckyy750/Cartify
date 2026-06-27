import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './AuthScreen.css';

function ShippingScreen() {
  const navigate = useNavigate();
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);

  // Agar pehle se koi address saved hai toh default state me wahi dikhao
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    // Context me real form data save kar rahe hain
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="auth-screen-container">
      <h1 className="auth-title">Shipping Address 📍</h1>
      
      <form onSubmit={submitHandler} className="auth-form">
        <div className="form-group">
          <label>Address</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter your street address" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter city" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Postal Code / PIN Code</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter postal code" 
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter country" 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">Continue to Payment ➡️</button>
      </form>
    </div>
  );
}

export default ShippingScreen;