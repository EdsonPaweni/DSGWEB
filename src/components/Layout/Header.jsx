import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore Data' },
    { path: '/themes', label: 'Themes' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="site-header">
      <div className="container-header">
        <div className="header-flex">
          <Link to="/" className="logo-area">
            <div className="logo-icon">
              <img 
                src="/logo.png" 
                alt="Surveyor General Department Zimbabwe" 
              />
            </div>
            <div className="logo-text">
              <h1>SURVEYOR GENERAL DEPT.</h1>
              <p>Zimbabwe | Geospatial & Cadastral Authority</p>
            </div>
          </Link>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="header-actions">
            {currentUser ? (
              <Link to="/dashboard" className="btn-outline">
                <i className="fas fa-user-check"></i> {currentUser.name || currentUser.email?.split('@')[0]}
              </Link>
            ) : (
              <Link to="/login" className="btn-outline">
                <i className="fas fa-user"></i> Sign In
              </Link>
            )}
            <Link to="/cart" className="cart-link">
              <i className="fas fa-shopping-cart"></i> Cart 
              <span className="cart-badge">{cartItems.length}</span>
            </Link>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to={currentUser ? "/dashboard" : "/login"} 
              onClick={() => setMobileMenuOpen(false)}
            >
              {currentUser ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;