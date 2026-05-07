import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to an API
    showToast('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with the Surveyor General Department for inquiries and support</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Visit Us</h3>
              <p>Surveyor General Department</p>
              <p>Cnr. Samora Machel & 9th Avenue</p>
              <p>Harare, Zimbabwe</p>
            </div>

            <div className="info-card">
              <i className="fas fa-phone-alt"></i>
              <h3>Call Us</h3>
              <p>Main Line: +263 242 700123</p>
              <p>Support: +263 242 700124</p>
              <p>Fax: +263 242 700125</p>
            </div>

            <div className="info-card">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>General: info@surveys.gov.zw</p>
              <p>Support: support@surveys.gov.zw</p>
              <p>Sales: sales@surveys.gov.zw</p>
            </div>

            <div className="info-card">
              <i className="fas fa-clock"></i>
              <h3>Working Hours</h3>
              <p>Monday - Thursday: 8:00 - 16:30</p>
              <p>Friday: 8:00 - 15:30</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Surveyor"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="map-section">
          <h3>Find Us</h3>
          <div className="location-map">
            <iframe
              title="Surveyor General Department Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.678901234567!2d31.0522!3d-17.8292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4b8c9d5e6f7%3A0x123456789abcdef!2sHarare!5e0!3m2!1sen!2szw!4v1234567890123!5m2!1sen!2szw"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;