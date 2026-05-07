import React from 'react';

const LayerControls = ({ layers, onToggleLayer }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const layerGroups = [
    {
      title: "Cadastral Data",
      layers: [
        { id: "provinces", name: "Provinces (Administrative Boundaries)", defaultChecked: true },
        { id: "parcels", name: "Land Parcels (Sample)", defaultChecked: false }
      ]
    },
    {
      title: "Topography",
      layers: [
        { id: "contours", name: "Contour Lines", defaultChecked: false },
        { id: "rivers", name: "Rivers & Waterbodies", defaultChecked: false }
      ]
    },
    {
      title: "Infrastructure",
      layers: [
        { id: "roads", name: "Road Network", defaultChecked: false },
        { id: "railways", name: "Railways", defaultChecked: false }
      ]
    }
  ];

  const datasets = [
    { name: "Complete Cadastral Database", price: 299, desc: "All provincial parcels & boundaries" },
    { name: "Topographic Map Series (1:50k)", price: 199, desc: "Full national coverage" },
    { name: "Satellite Imagery 2025", price: 399, desc: "High-res 0.5m resolution" },
    { name: "Land Use / Land Cover", price: 149, desc: "Classified LULC 2025" },
    { name: "Surveyor General Plans", price: 89, desc: "Historical SG diagrams" }
  ];

  return (
    <>
      <button 
        className="menu-toggle" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'absolute',
          left: '10px',
          top: '90px',
          zIndex: 1002,
          background: 'var(--primary-accent)',
          color: 'var(--dark-bg)',
          padding: '10px 15px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          border: 'none'
        }}
      >
        <i className="fas fa-bars"></i> Layers & Data
      </button>

      <div className="sidebar" style={{ 
        position: 'absolute',
        left: sidebarOpen ? '0' : '-340px',
        transition: '0.3s',
        width: '340px',
        background: 'rgba(15, 33, 46, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRight: '1px solid rgba(193, 123, 44, 0.3)',
        overflowY: 'auto',
        padding: '1.5rem',
        zIndex: 1001,
        height: 'calc(100vh - 80px)'
      }}>
        <h3><i className="fas fa-layer-group"></i> Map Layers</h3>
        
        {layerGroups.map((group, idx) => (
          <div key={idx} className="layer-control" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(193,123,44,0.2)' }}>
            <h4>{group.title}</h4>
            {group.layers.map(layer => (
              <label key={layer.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: '8px 0' }}>
                <input 
                  type="checkbox" 
                  defaultChecked={layer.defaultChecked}
                  onChange={(e) => onToggleLayer(layer.id, e.target.checked)}
                />
                {layer.name}
              </label>
            ))}
          </div>
        ))}
        
        <div className="layer-control">
          <h4><i className="fas fa-store"></i> Available for Purchase</h4>
          <div className="datasets-list">
            {datasets.map((ds, idx) => (
              <div key={idx} className="dataset-item" style={{ border: '1px solid rgba(193,123,44,0.3)', marginBottom: '10px', padding: '10px', borderRadius: '12px' }}>
                <strong><i className="fas fa-map"></i> {ds.name}</strong><br/>
                <small>{ds.desc}</small><br/>
                <strong style={{ color: '#c17b2c' }}>${ds.price}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayerControls;