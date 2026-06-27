import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './AuthScreen.css';

function PaymentScreen() {
  const navigate = useNavigate();
  const { paymentMethod, savePaymentMethod } = useContext(CartContext);

  const [selectedPayment, setSelectedPayment] = useState(paymentMethod);

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(selectedPayment);
    navigate('/placeorder');
  };

  return (
    <div className="auth-screen-container">
      <h1 className="auth-title">Payment Method 💳</h1>
      
      <form onSubmit={submitHandler} className="auth-form">
        <div className="form-group">
          <label className="payment-label-main">Select Method</label>
          
          <div className="radio-group">
            <input 
              type="radio" 
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={selectedPayment === 'PayPal'}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="PayPal" className="radio-label">PayPal or Credit Card</label>
          </div>

          <div className="radio-group">
            <input 
              type="radio" 
              id="COD"
              name="paymentMethod"
              value="COD"
              checked={selectedPayment === 'COD'}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="COD" className="radio-label">Cash on Delivery (COD)</label>
          </div>
        </div>

        <button type="submit" className="auth-btn">Continue to Place Order ➡️</button>
      </form>
    </div>
  );
}

export default PaymentScreen;