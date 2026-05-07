import React from 'react';

const MapTools = ({ onIdentify, onMeasure, onZoom, activeTool }) => {
  return (
    <div className="map-toolbar" style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(15, 33, 46, 0.95)',
      backdropFilter: 'blur(8px)',
      padding: '10px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      zIndex: 1000,
      display: 'flex',
      gap: '8px'
    }}>
      <button 
        className={`toolbar-btn ${activeTool === 'identify' ? 'active' : ''}`}
        onClick={onIdentify}
        style={{
          background: activeTool === 'identify' ? '#c17b2c' : '#0b2b26',
          border: '1px solid #c17b2c',
          color: '#f0f4f8',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: '0.2s'
        }}
      >
        <i className="fas fa-mouse-pointer"></i> Identify
      </button>
      <button 
        className={`toolbar-btn ${activeTool === 'measure' ? 'active' : ''}`}
        onClick={onMeasure}
        style={{
          background: activeTool === 'measure' ? '#c17b2c' : '#0b2b26',
          border: '1px solid #c17b2c',
          color: '#f0f4f8',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: '0.2s'
        }}
      >
        <i className="fas fa-ruler"></i> Measure Area
      </button>
      <button 
        className="toolbar-btn"
        onClick={onZoom}
        style={{
          background: '#0b2b26',
          border: '1px solid #c17b2c',
          color: '#f0f4f8',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: '0.2s'
        }}
      >
        <i className="fas fa-search-location"></i> Zoom to Zim
      </button>
    </div>
  );
};

export default MapTools;