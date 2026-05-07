import React from 'react';
import { Link } from 'react-router-dom';

const Themes = () => {
  const themes = [
    {
      id: 1,
      title: "Cadastral Data",
      icon: "fas fa-draw-polygon",
      description: "Land parcels, property boundaries, ownership records, and cadastral maps for urban and rural areas.",
      datasets: 45,
      price: "from $12",
      color: "#c17b2c"
    },
    {
      id: 2,
      title: "Topographic Maps",
      icon: "fas fa-mountain",
      description: "Contour lines, elevation data, terrain models, and physical features of Zimbabwe's landscape.",
      datasets: 32,
      price: "from $18",
      color: "#2a9d8f"
    },
    {
      id: 3,
      title: "Hydrography",
      icon: "fas fa-water",
      description: "Rivers, dams, lakes, wetlands, and water catchment areas across Zimbabwe.",
      datasets: 28,
      price: "from $15",
      color: "#1E90FF"
    },
    {
      id: 4,
      title: "Infrastructure",
      icon: "fas fa-road",
      description: "Road networks, railways, bridges, airports, and utility infrastructure data.",
      datasets: 38,
      price: "from $20",
      color: "#DC143C"
    },
    {
      id: 5,
      title: "Land Use & Land Cover",
      icon: "fas fa-tree",
      description: "Agricultural land, forests, urban areas, wetlands, and land classification data.",
      datasets: 25,
      price: "from $25",
      color: "#2ecc71"
    },
    {
      id: 6,
      title: "Administrative Boundaries",
      icon: "fas fa-border-all",
      description: "Provincial, district, ward, and constituency boundaries for Zimbabwe.",
      datasets: 52,
      price: "from $10",
      color: "#e74c3c"
    },
    {
      id: 7,
      title: "Satellite Imagery",
      icon: "fas fa-satellite",
      description: "High-resolution satellite imagery, orthophotos, and remote sensing data.",
      datasets: 18,
      price: "from $99",
      color: "#9b59b6"
    },
    {
      id: 8,
      title: "Survey Records",
      icon: "fas fa-file-alt",
      description: "Historical survey plans, SG diagrams, and land registration documents.",
      datasets: 120,
      price: "from $8",
      color: "#f39c12"
    }
  ];

  return (
    <div className="themes-page">
      <div className="page-hero">
        <div className="container">
          <h1>Geospatial Data Themes</h1>
          <p>Explore our comprehensive collection of geospatial datasets organized by theme</p>
        </div>
      </div>

      <div className="container">
        <div className="themes-grid">
          {themes.map(theme => (
            <div key={theme.id} className="theme-card" style={{ borderTopColor: theme.color }}>
              <div className="theme-icon" style={{ color: theme.color }}>
                <i className={theme.icon}></i>
              </div>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
              <div className="theme-stats">
                <span><i className="fas fa-database"></i> {theme.datasets} datasets</span>
                <span><i className="fas fa-tag"></i> {theme.price}</span>
              </div>
              <Link to="/explore" className="theme-btn">
                Browse Datasets <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>

        <div className="custom-request">
          <div className="custom-request-content">
            <i className="fas fa-headset"></i>
            <h3>Need a custom dataset?</h3>
            <p>Can't find what you're looking for? Contact us for custom data extraction and processing services.</p>
            <Link to="/contact" className="btn-primary">Request Custom Data</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;