import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4>Surveyor General Dept.</h4>
          <p style={{fontSize:"0.8rem"}}>Cnr. Samora Machel & 9th Ave, Harare, Zimbabwe<br/>+263 242 700123</p>
        </div>
        <div className="footer-col">
          <h4>Geospatial Services</h4>
          <Link to="/explore">Cadastral Data</Link>
          <Link to="/explore">Topographic Maps</Link>
          <Link to="/explore">Survey Records</Link>
          <Link to="/services">Orthophoto & Imagery</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/faq">FAQs</Link>
          <Link to="/payment-help">Payment Help</Link>
          <Link to="/licensing">Data Licensing</Link>
          <Link to="/api-docs">API Access</Link>
        </div>
        <div className="footer-col">
          <h4>Legal & Policies</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/nsdi">NSDI Zimbabwe</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Surveyor General Department, Zimbabwe — All Rights Reserved | A Web GIS E-Commerce Initiative aligned with National Digital Transformation Agenda</p>
      </div>
    </footer>
  );
};

export default Footer;