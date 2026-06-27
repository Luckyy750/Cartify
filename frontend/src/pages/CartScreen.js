import React, { useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import './CartScreen.css';

function CartScreen() {
  const navigate = useNavigate(); // 🧠 Samajhna: Yeh page badalne ki takat deta hai
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-screen-container">
      <h1 className="cart-title">Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-box">
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Your cart is empty. Let's add some style!
          </p>
          <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <div className="cart-layout-grid">
          
          {/* Left Side: Cart Items List */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <div className="cart-item-img-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                
                <div className="cart-item-details">
                  <Link to={`/product/${item._id}`} className="item-name">{item.name}</Link>
                  <span className="item-price">₹{item.price.toLocaleString('en-IN')}</span>
                </div>

                <div className="cart-item-actions">
                  <select 
                    value={item.qty} 
                    className="qty-select"
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  
                  <button 
                    className="delete-btn" 
                    onClick={() => removeFromCart(item._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="cart-summary-box">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Items ({totalItems}):</span>
              <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="summary-total">
              <span>Total Amount:</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            
            {/* 👇 Yahan humne onClick handler jod diya hai */}
            <button className="checkout-btn" onClick={() => navigate('/shipping')}>
              Proceed to Checkout 💳
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartScreen;