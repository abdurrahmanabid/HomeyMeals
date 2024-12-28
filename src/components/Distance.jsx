import { Clipboard } from "flowbite-react";
import L from "leaflet"; // For creating custom markers
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LocationDisplay from "./LocationDisplay";

// Initial center and zoom level for the map (can be set to Rider's location or dynamic position)
const zoom = 13;

function Distance({ dLat, dLng, rLat, rLng }) {
  console.log("🚀 ~ Distance ~ rLat, rLng:", rLat, rLng)
  const [map, setMap] = useState(null);
  const [riderLocation, setRiderLocation] = useState({
    lat: rLat, // Rider's location (can be dynamic)
    lng: rLng,
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: dLat, 
    lng: dLng, 
  });
  const [distance, setDistance] = useState(null); // Store the calculated distance

  // Calculate the distance between the rider's location and the specific location
  useEffect(() => {
    if (riderLocation && currentLocation) {
      const riderLatLng = L.latLng(riderLocation);
      const currentLatLng = L.latLng(currentLocation);
      const calculatedDistance = riderLatLng.distanceTo(currentLatLng); // In meters
      setDistance(calculatedDistance);
    }
  }, [riderLocation, currentLocation]);

  // Memoized map component to prevent unnecessary re-renders
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={riderLocation}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Rider's current position marker */}
        <Marker
          position={riderLocation} // Rider's location marker
          icon={
            new L.Icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
            })
          }
        >
          <Popup>
            <strong>Rider's Current Location</strong>
            <br />
            <LocationDisplay lat={riderLocation.lat} lng={riderLocation.lng} />
            <br />
            <Clipboard.WithIconText
              valueToCopy={`https://www.google.com/maps/search/?api=1&query=${riderLocation.lat},${riderLocation.lng}`}
            />
          </Popup>
        </Marker>

        {/* Specific location marker */}
        <Marker
          position={currentLocation} // Specific location marker
          icon={
            new L.Icon({
              iconUrl:
                "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
            })
          }
        >
          <Popup>
            <strong>Delivery Location</strong>
            <br />
            <LocationDisplay
              lat={currentLocation.lat}
              lng={currentLocation.lng}
            />
            <Clipboard.WithIconText
              valueToCopy={`https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`}
            />
          </Popup>
        </Marker>
      </MapContainer>
    ),
    [riderLocation, currentLocation]
  );

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <FaUtensils className="text-4xl text-blue-500 mr-4 animate-spin-slow" />
        <h1 className="text-2xl font-semibold">Current Delivery Tracking</h1>
      </div>

      {displayMap}

      {distance && (
        <div className="text-center mt-4">
          <p className="font-bold text-lg">
            Distance to Goal Location: {distance.toFixed(2)} meters - {" "}
            {distance>1000 ?(`${(distance/1000).toFixed(2)} km`):null}
          </p>
        </div>
      )}

      <div className="mt-4">
        <h2 className="font-semibold text-lg text-center">
          Delivery Status: On the Way 🚚
        </h2>
        <p className="text-center mt-2">
          Track your delivery in real-time on the map.
        </p>
      </div>
    </div>
  );
}

export default Distance;
