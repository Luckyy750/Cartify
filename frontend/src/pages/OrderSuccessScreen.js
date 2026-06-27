import React from 'react';
import { Link } from 'react-router-dom';
import './AuthScreen.css'; 

function OrderSuccessScreen() {
  return (
    <div className="auth-screen-container" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
      
      <h1 className="auth-title" style={{ marginBottom: '10px' }}>Order Placed!</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.6' }}>
        Thank you for shopping with us. Your order has been successfully placed and is being processed.
      </p>

      {/* 🧠 Samjho: Humne text-align center aur center flex layout dekar button ko ekdum middle me la diya hai */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Link 
          to="/" 
          className="auth-btn" 
          style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
        >
          Continue Shopping 🛍️
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccessScreen;