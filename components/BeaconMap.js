// Engaging Map View for Active QR Beacons

import React from 'react';
import { Map, Marker } from 'react-map-gl';

const BeaconMap = ({ beacons }) => {
  return (
    <Map
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 4,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {beacons.map((beacon) => (
        <Marker key={beacon.id} longitude={beacon.longitude} latitude={beacon.latitude}>
          <div className="beacon-marker" />
        </Marker>
      ))}
    </Map>
  );
};

export default BeaconMap;
