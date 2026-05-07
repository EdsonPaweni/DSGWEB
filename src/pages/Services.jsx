import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Cadastral Surveying",
      icon: "fas fa-draw-polygon",
      description: "Professional land surveying services for property boundaries, subdivisions, and consolidations.",
      features: ["Boundary demarcation", "Property subdivision", "Land registration", "Survey diagrams"]
    },
    {
      id: 2,
      title: "GIS Consulting",
      icon: "fas fa-chart-line",
      description: "Expert GIS consulting services for urban planning, natural resource management, and development projects.",
      features: ["Spatial analysis", "Data migration", "System design", "Training & support"]
    },
    {
      id: 3,
      title: "Data Processing",
      icon: "fas fa-server",
      description: "Professional data processing and conversion services for various geospatial formats.",
      features: ["Data conversion", "Digitization", "Georeferencing", "Quality control"]
    },
    {
      id: 4,
      title: "Map Production",
      icon: "fas fa-map",
      description: "Custom map production services for print and digital formats.",
      features: ["Thematic maps", "Topographic maps", "Cadastral maps", "Interactive web maps"]
    },
    {
      id: 5,
      title: "Training & Workshops",
      icon: "fas fa-chalkboard-user",
      description: "Professional training programs in GIS, surveying, and geospatial technologies.",
      features: ["GIS fundamentals", "Advanced spatial analysis", "Surveying techniques", "Web GIS development"]
    },
    {
      id: 6,
      title: "Data Hosting",
      icon: "fas fa-cloud",
      description: "Secure cloud hosting solutions for your geospatial data and web mapping applications.",
      features: ["WMS/WFS services", "API access", "Secure storage", "24/7 uptime"]
    }
  ];

  return (
    <div className="services-page">
      <div className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Professional geospatial and surveying services for government, private sector, and individuals</p>
        </div>
      </div>

      <div className="container">
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}><i className="fas fa-check-circle"></i> {feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="service-btn">Request Service</Link>
            </div>
          ))}
        </div>

        <div className="service-cta">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>Our team of experts can help you with specialized geospatial requirements</p>
            <Link to="/contact" className="btn-primary">Contact Our Team</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;