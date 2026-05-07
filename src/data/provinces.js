export const provincesData = {
    "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "properties": { "province": "Matabeleland North", "prov_code": 15, "area_km2": 75448.43, "pop_density": 9, "price_usd": 89, "color": "#f4a261" }, "geometry": { "type": "Point", "coordinates": [27.2, -18.4] } },
        { "type": "Feature", "properties": { "province": "Matabeleland South", "prov_code": 16, "area_km2": 54123.01, "pop_density": 12, "price_usd": 79, "color": "#e9c46a" }, "geometry": { "type": "Point", "coordinates": [28.9, -21.2] } },
        { "type": "Feature", "properties": { "province": "Manicaland", "prov_code": 11, "area_km2": 35840.49, "pop_density": 44, "price_usd": 95, "color": "#2a9d8f" }, "geometry": { "type": "Point", "coordinates": [32.2, -19.4] } },
        { "type": "Feature", "properties": { "province": "Mashonaland Central", "prov_code": 12, "area_km2": 28189.00, "pop_density": 35, "price_usd": 85, "color": "#264653" }, "geometry": { "type": "Point", "coordinates": [30.2, -17.0] } },
        { "type": "Feature", "properties": { "province": "Mashonaland East", "prov_code": 13, "area_km2": 32171.03, "pop_density": 35, "price_usd": 85, "color": "#8ecae6" }, "geometry": { "type": "Point", "coordinates": [31.8, -18.4] } },
        { "type": "Feature", "properties": { "province": "Mashonaland West", "prov_code": 14, "area_km2": 57677.68, "pop_density": 21, "price_usd": 82, "color": "#219ebc" }, "geometry": { "type": "Point", "coordinates": [29.2, -17.2] } },
        { "type": "Feature", "properties": { "province": "Masvingo", "prov_code": 18, "area_km2": 56455.70, "pop_density": 23, "price_usd": 84, "color": "#fb8500" }, "geometry": { "type": "Point", "coordinates": [30.8, -20.5] } },
        { "type": "Feature", "properties": { "province": "Midlands", "prov_code": 17, "area_km2": 49364.67, "pop_density": 30, "price_usd": 80, "color": "#e76f51" }, "geometry": { "type": "Point", "coordinates": [29.5, -19.2] } },
        { "type": "Feature", "properties": { "province": "Bulawayo", "prov_code": 10, "area_km2": 546.26, "pop_density": 1239, "price_usd": 120, "color": "#f4a261" }, "geometry": { "type": "Point", "coordinates": [28.6, -20.15] } },
        { "type": "Feature", "properties": { "province": "Harare", "prov_code": 19, "area_km2": 939.98, "pop_density": 2017, "price_usd": 150, "color": "#e9c46a" }, "geometry": { "type": "Point", "coordinates": [31.05, -17.83] } }
    ]
};

export const sampleData = {
  parcels: {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature", "properties": { "owner": "Harare City Council", "parcel_id": "HR001", "area_ha": 12.5 }, "geometry": { "type": "Polygon", "coordinates": [[[31.03, -17.82], [31.04, -17.82], [31.04, -17.83], [31.03, -17.83], [31.03, -17.82]]] } },
      { "type": "Feature", "properties": { "owner": "Private - Surveyor General", "parcel_id": "HR002", "area_ha": 5.2 }, "geometry": { "type": "Polygon", "coordinates": [[[31.045, -17.825], [31.055, -17.825], [31.055, -17.835], [31.045, -17.835], [31.045, -17.825]]] } }
    ]
  },
  contours: {
    "type": "FeatureCollection",
    "features": [
      { "type": "Feature", "properties": { "elevation": 1500 }, "geometry": { "type": "LineString", "coordinates": [[30.5, -18.5], [30.6, -18.4], [30.7, -18.3], [30.8, -18.2]] } },
      { "type": "Feature", "properties": { "elevation": 1400 }, "geometry": { "type": "LineString", "coordinates": [[30.4, -18.6], [30.5, -18.5], [30.6, -18.4]] } }
    ]
  }
};