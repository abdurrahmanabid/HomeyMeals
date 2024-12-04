import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

// Debugging styles
const mapStyle = { height: "500px", width: "100%", backgroundColor: "#f0f0f0" };

const CustomLocation = () => {
  const [customLocation, setCustomLocation] = useState(null);

  // Component to handle map clicks for custom location
  const CustomMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCustomLocation({ lat, lng });
        alert(
          `Custom location set at:\nLatitude: ${lat.toFixed(
            4
          )}\nLongitude: ${lng.toFixed(4)}`
        );
      },
    });
    return null;
  };

  useEffect(() => {
    console.log("Custom Location Component Loaded");

    // Check if the leaflet map container is visible in the DOM
    const mapElement = document.querySelector(".leaflet-container");
    if (mapElement) {
      console.log("Leaflet map container found:", mapElement);
    } else {
      console.error("Leaflet map container not found.");
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">Custom Location</h1>
        <p>Click on the map to set a custom location.</p>
      </div>

      {/* Display Custom Location */}
      <div className="text-center mb-4">
        {customLocation && (
          <p>
            <strong>Custom Location:</strong> Latitude:{" "}
            {customLocation.lat.toFixed(4)}, Longitude:{" "}
            {customLocation.lng.toFixed(4)}
          </p>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={customLocation || [22.3314, 91.8127]} // Default center
        zoom={13} // Zoom level to ensure map is visible
        style={mapStyle}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Handle map clicks for custom location */}
        <CustomMarker />

        {/* Custom Location Marker */}
        {customLocation && (
          <Marker
            position={customLocation}
            draggable={true}
            eventHandlers={{
              drag: (e) => {
                const { lat, lng } = e.target.getLatLng();
                setCustomLocation({ lat, lng });
              },
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                setCustomLocation({ lat, lng });
                alert(
                  `Custom location moved to:\nLatitude: ${lat.toFixed(
                    4
                  )}\nLongitude: ${lng.toFixed(4)}`
                );
              },
            }}
          >
            <Popup>
              <strong>Custom Location</strong>
              <br />
              Latitude: {customLocation.lat.toFixed(4)}
              <br />
              Longitude: {customLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default CustomLocation;
