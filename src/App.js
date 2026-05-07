import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Themes from './pages/Themes';
import Services from './pages/Services';
import LoginPage from './pages/LoginPage';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/themes" element={<Themes />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Layout>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;