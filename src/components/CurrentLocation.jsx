import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CurrentLocation = ({setLocation}) => {
  const [userLocation, setUserLocation] = useState(null);

  // Function to get the user's current location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setLocation(location)
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (!userLocation) {
      getUserLocation(); // Automatically fetch location on component mount if not available
    }
  }, [userLocation, getUserLocation]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <FaLocationArrow className="text-4xl text-blue-500 mr-4 animate-spin-slow" />
        <h1 className="text-2xl font-semibold">Auto Location</h1>
      </div>

      {/* Button to Get User's Location */}
      <div className="flex justify-center mb-4">
        <button
          onClick={getUserLocation}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Get My Location
        </button>
      </div>

      {/* Display User Location */}
      <div className="text-center mb-4">
        {userLocation && (
          <p>
            <strong>Auto Location:</strong> Latitude:{" "}
            {userLocation.lat.toFixed(4)}, Longitude:{" "}
            {userLocation.lng.toFixed(4)}
          </p>
        )}
      </div>

      {/* Map */}
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13} // Adding zoom level
          style={{ height: "500px", width: "100%" }}
          className="leaflet-container" // Make sure the map container has the proper class
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>
              <strong>Auto Location</strong>
              <br />
              Latitude: {userLocation.lat.toFixed(4)}
              <br />
              Longitude: {userLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p> // Optional loading state while waiting for location
      )}
    </div>
  );
};

export default CurrentLocation;
