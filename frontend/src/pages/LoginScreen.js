import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthScreen.css';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/shipping'); 
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="auth-screen-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h1 className="auth-title">Sign In</h1>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="auth-input" />
        <button type="submit" className="auth-btn">Sign In</button>
        <p className="auth-redirect">New Customer? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default LoginScreen;