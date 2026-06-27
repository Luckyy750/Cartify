import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // 🚀 Agar kuch type kiya hai, toh search query ke sath home page par bhejo
      navigate(`/?search=${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 30px', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      
      {/* 1. Logo */}
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: '800' }}>
        CartiFy.
      </div>

      {/* 2. 🔍 NEW: MODERN SEARCH BAR */}
      <form onSubmit={searchSubmitHandler} style={{ display: 'flex', flex: '0 1 400px', margin: '0 20px' }}>
        <input
          type="text"
          placeholder="Search products, brands and more..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px 0 0 6px',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0 6px 6px 0',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>

      {/* 3. Right Menu Links (Home, Cart, Sign In) */}
      <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontWeight: '600' }}>Home</span>
        <span onClick={() => navigate('/cart')} style={{ cursor: 'pointer', fontWeight: '600' }}>Cart</span>
        <button onClick={() => navigate('/login')} style={{ background: '#000000', color: '#ffffff', padding: '8px 16px', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
      </div>

    </nav>
  );
}

export default Navbar;