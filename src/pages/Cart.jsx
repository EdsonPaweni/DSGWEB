import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const { showToast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRemoveItem = (itemId, itemName) => {
    removeFromCart(itemId);
    showToast(`${itemName} removed from cart`);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      showToast('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      showToast('Your cart is empty');
      return;
    }

    // Save purchases to user account
    const existingPurchases = JSON.parse(localStorage.getItem(`purchases_${currentUser.email}`) || '[]');
    const newPurchases = cartItems.map(item => ({
      ...item,
      date: new Date().toISOString(),
      orderId: Math.random().toString(36).substr(2, 9)
    }));
    
    localStorage.setItem(`purchases_${currentUser.email}`, JSON.stringify([...existingPurchases, ...newPurchases]));
    
    showToast(`Order placed successfully! Total: $${getCartTotal().toFixed(2)}`);
    clearCart();
    navigate('/dashboard');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ minHeight: 'calc(100vh - 80px)', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#c17b2c', marginBottom: '20px' }}></i>
          <h2>Your Cart is Empty</h2>
          <p style={{ color: '#bbd1e6', marginBottom: '30px' }}>Browse our geospatial data products and add items to your cart</p>
          <Link to="/explore" className="btn-primary">
            <i className="fas fa-map"></i> Explore Datasets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ minHeight: 'calc(100vh - 80px)', padding: '40px 20px' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px', color: '#c17b2c' }}>
          <i className="fas fa-shopping-cart"></i> Shopping Cart
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Cart Items */}
          <div>
            <div style={{ background: '#0f212e', borderRadius: '20px', padding: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Cart Items ({cartItems.length})</h3>
              
              {cartItems.map((item) => (
                <div key={item.id} style={{ 
                  borderBottom: '1px solid rgba(193,123,44,0.2)', 
                  padding: '15px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '5px' }}>{item.name}</h4>
                    <p style={{ color: '#bbd1e6', fontSize: '0.9rem' }}>
                      <i className="fas fa-tag"></i> Price: ${item.price}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <strong style={{ color: '#c17b2c', fontSize: '1.1rem' }}>${item.price}</strong>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      style={{
                        background: '#dc3545',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: 'white'
                      }}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                style={{
                  background: 'transparent',
                  border: '1px solid #dc3545',
                  color: '#dc3545',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                <i className="fas fa-trash-alt"></i> Clear All
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: '#0f212e', borderRadius: '20px', padding: '20px', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Subtotal ({cartItems.length} items)</span>
                  <strong>${getCartTotal().toFixed(2)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Processing Fee</span>
                  <strong>$0.00</strong>
                </div>
                <div style={{ borderTop: '1px solid rgba(193,123,44,0.2)', marginTop: '10px', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                    <span><strong>Total</strong></span>
                    <strong style={{ color: '#c17b2c' }}>${getCartTotal().toFixed(2)} USD</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  background: '#c17b2c',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                <i className="fas fa-lock"></i> Proceed to Checkout
              </button>

              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.85rem', color: '#bbd1e6', textAlign: 'center' }}>
                  <i className="fas fa-shield-alt"></i> Secure payment processing<br/>
                  Instant download after purchase<br/>
                  <i className="fas fa-credit-card"></i> EcoCash, PayNow, Visa/Mastercard
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to="/explore" style={{ color: '#c17b2c', textDecoration: 'none' }}>
            <i className="fas fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;