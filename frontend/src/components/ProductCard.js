import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // Alag file se design link

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
        />
      </div>

      <div className="product-info">
        <span className="product-category">{product.brand}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">
            ₹{product.price ? product.price.toLocaleString('en-IN') : '0'}
          </span>
          <button className="add-to-cart-btn">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;