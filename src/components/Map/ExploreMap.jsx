import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { provincesData, sampleData } from '../../data/provinces';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Geometry utility for area calculation
const geodesicArea = (latlngs) => {
  let area = 0;
  const len = latlngs.length;
  if (len < 3) return 0;
  
  for (let i = 0; i < len; i++) {
    const j = (i + 1) % len;
    area += latlngs[i].lng * latlngs[j].lat;
    area -= latlngs[j].lng * latlngs[i].lat;
  }
  area = Math.abs(area) / 2;
  return area * 111319.9 * 111319.9; // Convert to square meters approximately
};

const ExploreMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [layers, setLayers] = useState({});
  const [activeTool, setActiveTool] = useState(null);
  const [measureControl, setMeasureControl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const initializedMap = L.map(mapRef.current).setView([-19.0, 29.5], 6.5);
    
    // Add base tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> & CartoDB',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(initializedMap);

    // Create Provinces Layer
    const provincesLayer = L.geoJSON(provincesData, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
        radius: 12,
        fillColor: feature.properties.color || "#c17b2c",
        color: "#fff",
        weight: 2,
        fillOpacity: 0.8
      }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(`
          <div style="min-width: 180px;">
            <b style="color: #c17b2c;">${props.province}</b><br/>
            <i class="fas fa-draw-polygon"></i> Area: ${props.area_km2.toLocaleString()} km²<br/>
            <i class="fas fa-users"></i> Density: ${props.pop_density}/km²<br/>
            <hr/>
            <strong style="font-size: 1.2rem;">$${props.price_usd}</strong><br/>
            <button class="add-cart-province-btn" data-name="${props.province} Cadastral Bundle" data-price="${props.price_usd}" style="background:#c17b2c; border:none; padding:5px 12px; border-radius:20px; margin-top:8px; cursor:pointer; width:100%;">
              🛒 Add to Cart
            </button>
          </div>
        `);
      }
    }).addTo(initializedMap);

    // Create Parcels Layer
    const parcelsLayer = L.geoJSON(sampleData.parcels, {
      style: { color: "#c17b2c", weight: 2, fillOpacity: 0.3, fillColor: "#e09d42" },
      onEachFeature: (f, l) => l.bindPopup(`
        <b>Parcel ${f.properties.parcel_id}</b><br/>
        Owner: ${f.properties.owner}<br/>
        Area: ${f.properties.area_ha} ha<br/>
        <button class="add-cart-parcel-btn" data-name="Parcel ${f.properties.parcel_id} Data" data-price="25" style="background:#c17b2c; border:none; padding:5px 12px; border-radius:20px; margin-top:8px; cursor:pointer;">
          🛒 Purchase Parcel Data ($25)
        </button>
      `)
    });

    // Create Contours Layer
    const contoursLayer = L.geoJSON(sampleData.contours, { 
      style: { color: "#8B4513", weight: 1.5 } 
    });

    // Create Rivers Layer
    const riversData = {
      "type": "FeatureCollection",
      "features": [
        { "type": "Feature", "properties": { "name": "Save River" }, "geometry": { "type": "LineString", "coordinates": [[31.5, -19.5], [32.0, -20.0], [32.5, -20.5]] } },
        { "type": "Feature", "properties": { "name": "Zambezi River" }, "geometry": { "type": "LineString", "coordinates": [[27.0, -15.5], [28.0, -15.8], [29.0, -16.0]] } }
      ]
    };
    const riversLayer = L.geoJSON(riversData, { style: { color: "#1E90FF", weight: 2 } });

    // Create Roads Layer
    const roadsData = {
      "type": "FeatureCollection",
      "features": [
        { "type": "Feature", "properties": { "name": "A1 Highway" }, "geometry": { "type": "LineString", "coordinates": [[29.5, -17.5], [30.0, -17.8], [30.5, -17.9], [31.05, -17.83]] } }
      ]
    };
    const roadsLayer = L.geoJSON(roadsData, { style: { color: "#DC143C", weight: 3 } });

    // Create Railways Layer
    const railwaysData = {
      "type": "FeatureCollection",
      "features": [
        { "type": "Feature", "properties": { "line": "NRZ Main Line" }, "geometry": { "type": "LineString", "coordinates": [[28.5, -19.5], [29.0, -19.2], [29.5, -19.0], [30.0, -18.8]] } }
      ]
    };
    const railwaysLayer = L.geoJSON(railwaysData, { style: { color: "#FF8C00", weight: 2, dashArray: "5,5" } });

    setLayers({
      provinces: provincesLayer,
      parcels: parcelsLayer,
      contours: contoursLayer,
      rivers: riversLayer,
      roads: roadsLayer,
      railways: railwaysLayer
    });

    setMap(initializedMap);

    // Handle add to cart from popups
    initializedMap.on('popupopen', () => {
      setTimeout(() => {
        // Handle province add to cart
        document.querySelectorAll('.add-cart-province-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart({
              name: btn.dataset.name,
              price: parseFloat(btn.dataset.price)
            });
            showToast(`${btn.dataset.name} added to cart!`);
          });
        });
        
        // Handle parcel add to cart
        document.querySelectorAll('.add-cart-parcel-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart({
              name: btn.dataset.name,
              price: parseFloat(btn.dataset.price)
            });
            showToast(`${btn.dataset.name} added to cart!`);
          });
        });
      }, 100);
    });

    return () => {
      if (initializedMap) initializedMap.remove();
    };
  }, [addToCart, showToast]);

  const toggleLayer = (layerName, isVisible) => {
    if (!map || !layers[layerName]) return;
    
    if (isVisible) {
      map.addLayer(layers[layerName]);
      showToast(`${layerName} layer turned on`);
    } else {
      map.removeLayer(layers[layerName]);
      showToast(`${layerName} layer turned off`);
    }
  };

  const handleIdentify = () => {
    if (!map) return;
    
    if (activeTool === 'identify') {
      map.off('click');
      setActiveTool(null);
      showToast('Identify mode disabled');
    } else {
      if (activeTool === 'measure' && measureControl) {
        map.removeControl(measureControl);
        setMeasureControl(null);
      }
      setActiveTool('identify');
      showToast('Click on any feature to identify it');
      map.on('click', (e) => {
        showToast(`Location: ${e.latlng.lat.toFixed(4)}°, ${e.latlng.lng.toFixed(4)}°`);
      });
    }
  };

  const handleMeasure = () => {
    if (!map) return;
    
    if (measureControl) {
      map.removeControl(measureControl);
      setMeasureControl(null);
      setActiveTool(null);
      showToast('Measurement mode disabled');
      return;
    }

    if (activeTool === 'identify') {
      map.off('click');
      setActiveTool(null);
    }

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: new L.FeatureGroup() },
      draw: { 
        polygon: true, 
        polyline: true, 
        rectangle: true, 
        circle: false, 
        marker: false,
        circlemarker: false
      }
    });
    
    map.addControl(drawControl);
    setMeasureControl(drawControl);
    setActiveTool('measure');
    showToast('Draw a shape on the map to measure area');

    map.once(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      let area = 0;
      let distance = 0;
      
      if (layer.getLatLngs && layer.getLatLngs()[0]) {
        const latlngs = layer.getLatLngs()[0];
        area = geodesicArea(latlngs);
        showToast(`Area: ${(area / 10000).toFixed(2)} hectares (${(area).toFixed(0)} sq meters)`);
      } else if (layer.getLatLngs) {
        const latlngs = layer.getLatLngs();
        for (let i = 0; i < latlngs.length - 1; i++) {
          distance += latlngs[i].distanceTo(latlngs[i + 1]);
        }
        showToast(`Distance: ${(distance / 1000).toFixed(2)} km`);
      }
      
      map.removeControl(drawControl);
      setMeasureControl(null);
      setActiveTool(null);
    });
  };

  const zoomToZimbabwe = () => {
    if (map) {
      map.setView([-19.0, 29.5], 6.5);
      showToast('Zoomed to Zimbabwe');
    }
  };

  const datasets = [
    { name: "Complete Cadastral Database", price: 299, desc: "All provincial parcels & boundaries" },
    { name: "Topographic Map Series (1:50k)", price: 199, desc: "Full national coverage" },
    { name: "Satellite Imagery 2025", price: 399, desc: "High-res 0.5m resolution" },
    { name: "Land Use / Land Cover", price: 149, desc: "Classified LULC 2025" },
    { name: "Surveyor General Plans", price: 89, desc: "Historical SG diagrams" }
  ];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 80px)', position: 'relative' }}>
      {/* Sidebar Toggle Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'absolute',
          left: sidebarOpen ? '310px' : '10px',
          top: '20px',
          zIndex: 1002,
          background: '#c17b2c',
          color: '#0b1a1f',
          padding: '10px 15px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          border: 'none',
          transition: '0.3s'
        }}
      >
        <i className="fas fa-bars"></i> {sidebarOpen ? 'Close' : 'Layers'}
      </button>

      {/* Sidebar */}
      <div style={{
        position: 'absolute',
        left: sidebarOpen ? '0' : '-340px',
        transition: '0.3s',
        width: '320px',
        background: 'rgba(15, 33, 46, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRight: '1px solid rgba(193, 123, 44, 0.3)',
        overflowY: 'auto',
        padding: '20px',
        zIndex: 1001,
        height: '100%'
      }}>
        <h3 style={{ color: '#c17b2c', marginBottom: '20px' }}><i className="fas fa-layer-group"></i> Map Layers</h3>
        
        {/* Cadastral Data */}
        <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(193,123,44,0.2)' }}>
          <h4 style={{ color: '#c17b2c', marginBottom: '10px' }}>Cadastral Data</h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked onChange={(e) => toggleLayer('provinces', e.target.checked)} />
            Provinces (Administrative Boundaries)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
            <input type="checkbox" onChange={(e) => toggleLayer('parcels', e.target.checked)} />
            Land Parcels (Sample)
          </label>
        </div>

        {/* Topography */}
        <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(193,123,44,0.2)' }}>
          <h4 style={{ color: '#c17b2c', marginBottom: '10px' }}>Topography</h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
            <input type="checkbox" onChange={(e) => toggleLayer('contours', e.target.checked)} />
            Contour Lines
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
            <input type="checkbox" onChange={(e) => toggleLayer('rivers', e.target.checked)} />
            Rivers & Waterbodies
          </label>
        </div>

        {/* Infrastructure */}
        <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(193,123,44,0.2)' }}>
          <h4 style={{ color: '#c17b2c', marginBottom: '10px' }}>Infrastructure</h4>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
            <input type="checkbox" onChange={(e) => toggleLayer('roads', e.target.checked)} />
            Road Network
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', cursor: 'pointer' }}>
            <input type="checkbox" onChange={(e) => toggleLayer('railways', e.target.checked)} />
            Railways
          </label>
        </div>

        {/* Tools */}
        <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(193,123,44,0.2)' }}>
          <h4 style={{ color: '#c17b2c', marginBottom: '10px' }}>Spatial Tools</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button 
              onClick={handleIdentify}
              style={{
                background: activeTool === 'identify' ? '#c17b2c' : 'rgba(193,123,44,0.2)',
                border: '1px solid #c17b2c',
                color: activeTool === 'identify' ? '#0b1a1f' : '#f0f4f8',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              <i className="fas fa-mouse-pointer"></i> Identify
            </button>
            <button 
              onClick={handleMeasure}
              style={{
                background: activeTool === 'measure' ? '#c17b2c' : 'rgba(193,123,44,0.2)',
                border: '1px solid #c17b2c',
                color: activeTool === 'measure' ? '#0b1a1f' : '#f0f4f8',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              <i className="fas fa-ruler"></i> Measure
            </button>
          </div>
        </div>

        {/* Available for Purchase */}
        <div>
          <h4 style={{ color: '#c17b2c', marginBottom: '10px' }}><i className="fas fa-store"></i> Available for Purchase</h4>
          {datasets.map((ds, idx) => (
            <div key={idx} style={{ border: '1px solid rgba(193,123,44,0.3)', marginBottom: '10px', padding: '10px', borderRadius: '12px' }}>
              <strong><i className="fas fa-map"></i> {ds.name}</strong><br/>
              <small>{ds.desc}</small><br/>
              <strong style={{ color: '#c17b2c' }}>${ds.price}</strong>
              <button 
                onClick={() => {
                  addToCart({ name: ds.name, price: ds.price });
                  showToast(`${ds.name} added to cart!`);
                }}
                style={{ marginLeft: '8px', background: '#c17b2c', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer' }}
              >
                🛒 Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Toolbar */}
        <div style={{
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
            onClick={zoomToZimbabwe}
            style={{
              background: '#0b2b26',
              border: '1px solid #c17b2c',
              color: '#f0f4f8',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-search-location"></i> Zoom to Zim
          </button>
          <button 
            onClick={() => {
              if (map) {
                map.setView([-17.83, 31.05], 13);
                showToast('Zoomed to Harare');
              }
            }}
            style={{
              background: '#0b2b26',
              border: '1px solid #c17b2c',
              color: '#f0f4f8',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-city"></i> Harare
          </button>
        </div>

        {/* Map Element */}
        <div ref={mapRef} style={{ height: '100%', width: '100%', backgroundColor: '#08141c' }}></div>
      </div>
    </div>
  );
};

export default ExploreMap;