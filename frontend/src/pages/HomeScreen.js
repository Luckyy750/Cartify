import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 👈 1. Yeh import karna zaroori hai URL padhne ke liye
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Aapka jo bhi card component ho

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 2. URL se "?search=keyword" nikalne ka jugaad
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || ''; // Agar search kiya hai toh keyword milega, nahi toh khali string

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // 1. Backend se products mangwaye
      const { data } = await axios.get(`/api/products?keyword=${searchQuery}`);
      
      // 🎯 CHAMATKAR: Agar koi search query hai, toh perfect match wale ko sabse upar laao!
      if (searchQuery) {
        const sortedProducts = [...data].sort((a, b) => {
          const query = searchQuery.toLowerCase();
          const aIndex = a.name.toLowerCase().indexOf(query);
          const bIndex = b.name.toLowerCase().indexOf(query);

          // Agar keyword 'a' ke naam mein pehle aata hai, toh use upar bhejo
          if (aIndex !== bIndex) {
            return aIndex - bIndex;
          }
          
          // Agar dono ka index same hai, toh chote naam wale (exact match) ko upar rakho
          return a.name.length - b.name.length;
        });

        setProducts(sortedProducts); // Sorted products state mein daale
      } else {
        setProducts(data); // Normal flow mein bina sort kiye dikhao
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };
  
  fetchProducts();
}, [searchQuery]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading products... ⏳</div>;

  return (
    <div style={{ padding: '30px' }}>
      {/* Agar user ne search kiya hai toh heading badal do */}
      <h2 style={{ marginBottom: '20px', fontWeight: '800' }}>
        {searchQuery ? `Search Results for "${searchQuery}" 🔍` : 'Latest Products 🛍️'}
      </h2>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>
          <h3>No products found! 😢</h3>
          <p>Kuch aur search karke dekhiye...</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;