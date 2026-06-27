import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🔌 Backend API calling ke liye
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // 👤 User token uthane ke liye
import './CartScreen.css';

function PlaceOrderScreen() {
  const navigate = useNavigate();
  
  // 🧠 Context se data aur cart clear karne ka function pull kiya
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);

  // Calculations (Aapki original settings)
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 2000 ? 0 : 150; 
  const taxPrice = Math.round(0.18 * itemsPrice); 
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      // 🚨 Safety Check: Agar user logged in nahi hai toh redirect karo login par
      if (!userInfo) {
        alert('Please login first to place your order! 👤');
        navigate('/login');
        return;
      }

      // Security guards aur token headers pass kiye
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
const placeOrderHandler = async () => {
    try {
      if (!userInfo) {
        alert('Please login first to place your order! 👤');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // 🔌 1. Response ko `data` variable mein capture karo
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        config
      );

      // 🛒 2. Ab cart khali karo (Database mein save hone ke BAAD)
      if (clearCart) clearCart(); 
      
      // 🚀 3. CHATMATKAR: User ko specific order details ya success page par bhejो, data ke sath!
      // Agar tumne `/order/:id` page banaya hai toh wahan bhej sakte ho, ya fir /ordersuccess par state pass kar do
      navigate('/ordersuccess', { state: { order: data } });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order processing failed in backend database ❌");
    }
  };

      // 🛒 Order successfully hone ke baad frontend cart state khali karo
      if (clearCart) clearCart(); 
      
      // Seedha success screen par bhej do!
      navigate('/ordersuccess');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order processing failed in backend database ❌");
    }
  };

  return (
    <div className="cart-screen-container">
      <h1 className="cart-title">Review Your Order 📋</h1>
      
      <div className="cart-layout-grid">
        
        <div className="cart-items-list" style={{ gap: '30px' }}>
          
          {/* Shipping Address Section */}
          <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>📍 Shipping</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
              <strong>Address: </strong> 
              {shippingAddress?.address}, {shippingAddress?.city}, {shippingAddress?.postalCode}, {shippingAddress?.country}
            </p>
          </div>

          {/* Payment Method Section */}
          <div style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>💳 Payment Method</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              <strong>Method: </strong> {paymentMethod}
            </p>
          </div>

          {/* Order Items Section */}
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📦 Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cartItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                      <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '600' }}>{item.name}</Link>
                    </div>
                    <div style={{ fontWeight: '700' }}>
                      {item.qty} x ₹{item.price.toLocaleString('en-IN')} = ₹{(item.qty * item.price).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Order Summary Billing Box */}
        <div className="cart-summary-box">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Items Total:</span>
            <strong>₹{itemsPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping Charges:</span>
            <strong>{shippingPrice === 0 ? <span className="free-shipping">FREE</span> : `₹${shippingPrice}`}</strong>
          </div>
          <div className="summary-row">
            <span>Tax (GST 18%):</span>
            <strong>₹{taxPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div className="summary-total">
            <span>Total Payable:</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          
          <button 
            className="checkout-btn" 
            disabled={cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order 🚀
          </button>
        </div>

      </div>
    </div>
  );
}

export default PlaceOrderScreen;