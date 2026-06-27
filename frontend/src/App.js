import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderSuccessScreen from './pages/OrderSuccessScreen'; // 👈 Naya page import kiya

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} /> 
          <Route path="/login" element={<LoginScreen />} /> 
          <Route path="/register" element={<RegisterScreen />} /> 
          <Route path="/shipping" element={<ShippingScreen />} /> 
          <Route path="/payment" element={<PaymentScreen />} /> 
          <Route path="/placeorder" element={<PlaceOrderScreen />} /> 
          <Route path="/ordersuccess" element={<OrderSuccessScreen />} /> {/* 👈 Success screen ka route set kiya */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;