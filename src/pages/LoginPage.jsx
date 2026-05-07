import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: ''
  });
  
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (!formData.email) {
        showToast('Please enter your email');
        return;
      }
      login(formData.email, formData.password);
      showToast('Login successful!');
      navigate('/dashboard');
    } else {
      if (!formData.email || !formData.name) {
        showToast('Please fill in all required fields');
        return;
      }
      register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        organization: formData.organization
      });
      showToast('Registration successful! Welcome aboard.');
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Sign in to access your purchased data' : 'Register to purchase geospatial datasets'}</p>
          </div>

          <div className="login-tabs">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Full Name *</label>
                  <div className="input-icon">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Surveyor"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Organization</label>
                  <div className="input-icon">
                    <i className="fas fa-building"></i>
                    <input
                      type="text"
                      name="organization"
                      placeholder="Your organization (optional)"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email Address *</label>
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="form-group">
                <label>Password</label>
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label>Password *</label>
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <button type="submit" className="login-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Register here' : 'Sign in here'}
              </button>
            </p>
          </div>

          <div className="login-info">
            <i className="fas fa-shield-alt"></i>
            <p>Your data is secure. All transactions are encrypted.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;