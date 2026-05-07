import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const Home = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (name, price) => {
    addToCart({ name, price });
    showToast(`${name} added to cart!`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-badge"><i className="fas fa-globe-africa"></i> Web GIS E-Commerce Platform</div>
            <h1>Visualize, Access & Purchase <span>Geospatial Data</span> Online</h1>
            <p>Empowering surveyors, planners, developers & citizens with instant access to cadastral maps, topographic data & survey records anywhere, anytime.</p>
            <div className="hero-buttons">
              <Link to="/explore" className="btn-primary"><i className="fas fa-cart-shopping"></i> Explore Data Shop</Link>
              <Link to="/explore" className="btn-secondary"><i className="fas fa-map"></i> Interactive Map Viewer</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><h3>200+</h3><p>Datasets Ready</p></div>
              <div className="stat-item"><h3>24/7</h3><p>Instant Delivery</p></div>
              <div className="stat-item"><h3>✔️</h3><p>Secure Payments</p></div>
            </div>
          </div>
          <div className="preview-card" onClick={() => window.location.href='/explore'}>
            <div className="preview-header">
              <span><i className="fas fa-layer-group"></i> Cadastral Preview (Harare)</span>
            </div>
            <div className="map-demo">
              <div className="badge-layer"><i className="fas fa-eye"></i> Preview before purchase</div>
            </div>
            <p style={{marginTop: "16px", fontSize: "0.8rem"}}><i className="fas fa-check-circle" style={{color:"var(--primary-accent)"}}></i> Test spatial queries & verify coverage — Buy & download instantly.</p>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container mission-flex">
          <div className="mission-text">
            <h2 style={{fontSize: "1.9rem"}}>Modernising Land & Geospatial Data Access</h2>
            <p style={{marginTop: "20px"}}>The Surveyor General Department leads Zimbabwe's national mapping and cadastral surveying. Our new Web GIS E-Commerce Platform integrates interactive mapping, real-time data previews, and secure e-commerce to <strong>eliminate physical queues, reduce delays, and unlock revenue</strong>. Fully aligned with National Spatial Data Infrastructure (NSDI) principles.</p>
            <div style={{marginTop: "25px"}}><i className="fas fa-chart-line" style={{color:"var(--primary-accent)"}}></i> <span style={{fontWeight:"600"}}>From days to minutes:</span> download cadastral diagrams instantly after payment.</div>
          </div>
          <div className="mission-icon">
            <i className="fas fa-landmark"></i>
            <p style={{marginTop: "12px"}}><strong>Surveyor General</strong><br/>Department Zimbabwe</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-title">Integrated Web-GIS & E‑commerce Capabilities</div>
          <div className="section-sub">Built using open-source standards (GeoServer, PostGIS, Leaflet) to deliver scalability and interoperability</div>
          <div className="card-grid">
            {[
              { icon: "fa-chalkboard-user", title: "Interactive Map Viewer", desc: "Zoom, pan, identify parcels, measure distance and preview layers such as topography, cadastre, and land use." },
              { icon: "fa-shopping-cart", title: "Online Data Store", desc: "Add geospatial datasets to cart, preview metadata, and securely checkout using mobile money or cards." },
              { icon: "fa-database", title: "Spatial Database & SDI Ready", desc: "PostgreSQL/PostGIS backbone ensures efficient storage of cadastral records and topographic maps." },
              { icon: "fa-shield-alt", title: "Secure Authentication & Payments", desc: "User roles, SSL encryption, PCI-ready payment gateway simulation ensures secure transactions." },
              { icon: "fa-chart-simple", title: "Revenue Dashboard", desc: "Analytics for department: track popular datasets, sales trends, user activity." },
              { icon: "fa-print", title: "Digital Deliverables", desc: "Download vector data (GeoJSON, Shapefile) and georeferenced PDF maps instantly." }
            ].map((feature, idx) => (
              <div key={idx} className="feature-card" onClick={() => window.location.href='/explore'}>
                <div className="feature-icon"><i className={`fas ${feature.icon}`}></i></div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-preview">
        <div className="container">
          <h2 style={{fontSize: "2rem"}}>Browse Popular Geospatial Products</h2>
          <p style={{marginBottom: "20px"}}>Instant preview + secure download. Supporting land administration, urban planning & real estate.</p>
          <div className="data-showcase">
            {[
              { icon: "fa-draw-polygon", name: "Cadastral Diagram (1:2500)", price: "from $12 USD" },
              { icon: "fa-mountain-city", name: "Topographic Map Sheet", price: "from $18 USD" },
              { icon: "fa-vector-square", name: "Survey General Plan (SG Plans)", price: "from $9 USD" },
              { icon: "fa-city", name: "Land Use & Zoning", price: "from $25 USD" }
            ].map((item, idx) => (
              <div key={idx} className="data-item" onClick={() => window.location.href='/explore'}>
                <i className={`fas ${item.icon}`}></i> {item.name}<br/>
                <span className="price-tag">{item.price}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop: "44px"}}>
            <Link to="/explore" className="btn-primary" style={{background: "#1e4663"}}><i className="fas fa-store"></i> Visit Full Data Catalogue →</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;