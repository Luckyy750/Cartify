import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🧠 Sahi import kiya
import { CartContext } from '../context/CartContext';
import './ProductScreen.css';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Initial state khali object rahegi, jo API se fill hogi
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 🔌 Yeh aapke backend controller (getProductById) ko hit karega
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching live product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="product-screen-container">
      <Link to="/" className="back-btn">⬅️ Back to Products</Link>

      {product.name ? (
        <>
          <div className="product-main-grid">
            <div className="product-image-box">
              <img src={product.image} alt={product.name} className="product-large-img" />
            </div>

            <div className="product-info-box">
              <h1 className="product-main-title">{product.name}</h1>
              <p className="product-price-tag">₹{product.price?.toLocaleString('en-IN')}</p>
              <p className="product-desc-text">{product.description}</p>

              <div className="stock-status-row">
                Status: {product.countInStock > 0 ? (
                  <span className="status-in">In Stock ({product.countInStock})</span>
                ) : (
                  <span className="status-out">Out of Stock</span>
                )}
              </div>

              {product.countInStock > 0 && (
                <div className="action-selectors">
                  <div className="qty-row">
                    <span>Qty:</span>
                    <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="qty-dropdown">
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={addToCartHandler} className="add-to-cart-big-btn">Add to Cart 🛒</button>
                </div>
              )}
            </div>
          </div>

          {/* 🌟 DYNAMIC TABS SECTION: Jo database ke array/fields se data uthayega */}
          <div className="product-extra-tabs-section">
            <div className="tabs-header-bar">
              <button className={`tab-toggle-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>Key Features</button>
              <button className={`tab-toggle-btn ${activeTab === 'warranty' ? 'active' : ''}`} onClick={() => setActiveTab('warranty')}>Warranty Info</button>
              <button className={`tab-toggle-btn ${activeTab === 'returns' ? 'active' : ''}`} onClick={() => setActiveTab('returns')}>Returns & Policy</button>
            </div>

            <div className="tab-content-display-box">
              {activeTab === 'features' && (
                <ul className="features-bullet-list">
                  {/* Agar database me features na ho toh fallback string dikhao */}
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => <li key={index}>✨ {feature}</li>)
                  ) : (
                    <li>✨ Premium quality guaranteed.</li>
                  )}
                </ul>
              )}
              {activeTab === 'warranty' && (
                <p className="tab-pane-text">{product.warranty || "1 Year standard warranty applies."}</p>
              )}
              {activeTab === 'returns' && (
                <p className="tab-pane-text">{product.returns || "7-day easy return policy."}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading product from database... ⏳</p>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;