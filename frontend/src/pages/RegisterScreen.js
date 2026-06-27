import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthScreen.css';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext); 
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      console.log('Registering user:', name, email);
      await register(name, email, password); 
      navigate('/shipping'); 
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-screen-container">
      <form className="auth-form" onSubmit={submitHandler}>
        <h1 className="auth-title">Create Account ✨</h1>
        
        <input 
          type="text" 
          placeholder="Enter your full name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Enter password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Re-enter password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" className="auth-btn">Register</button>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterScreen;