import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useMemo, useState } from "react";
import { FaCopy, FaTruck } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LocationDisplay from "./LocationDisplay";

const zoom = 13;

const Distance = ({ dLat, dLng, rLat, rLng }) => {
  const [map, setMap] = useState(null);
  const [riderLocation, setRiderLocation] = useState({
    lat: rLat,
    lng: rLng,
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: dLat,
    lng: dLng,
  });
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (riderLocation && currentLocation) {
      const riderLatLng = L.latLng(riderLocation);
      const currentLatLng = L.latLng(currentLocation);
      const calculatedDistance = riderLatLng.distanceTo(currentLatLng);
      setDistance(calculatedDistance);
    }
  }, [riderLocation, currentLocation]);

  const getDeliveryStatus = (distance) => {
    if (distance < 100) return { text: "Arriving", color: "text-green-500" };
    if (distance < 1000)
      return { text: "Nearly There", color: "text-blue-500" };
    return { text: "On the Way", color: "text-orange-500" };
  };

  const status = getDeliveryStatus(distance);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={riderLocation}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-[400px] w-full rounded-lg shadow-lg"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={riderLocation}
          icon={
            new L.Icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })
          }
        >
          <Popup className="custom-popup">
            <div className="p-2">
              <div className="font-bold mb-2 text-blue-600">
                Delivery Driver
              </div>
              <LocationDisplay
                lat={riderLocation.lat}
                lng={riderLocation.lng}
              />
              <button
                onClick={() =>
                  copyToClipboard(
                    `https://www.google.com/maps/search/?api=1&query=${riderLocation.lat},${riderLocation.lng}`
                  )
                }
                className="mt-2 flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <FaCopy className="mr-1" /> Copy Location
              </button>
            </div>
          </Popup>
        </Marker>

        <Marker
          position={currentLocation}
          icon={
            new L.Icon({
              iconUrl:
                "https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })
          }
        >
          <Popup>
            <div className="p-2">
              <div className="font-bold mb-2 text-red-600">
                Delivery Location
              </div>
              <LocationDisplay
                lat={currentLocation.lat}
                lng={currentLocation.lng}
              />
              <button
                onClick={() =>
                  copyToClipboard(
                    `https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`
                  )
                }
                className="mt-2 flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <FaCopy className="mr-1" /> Copy Location
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    ),
    [riderLocation, currentLocation]
  );

  return (
    <div className=" mx-auto ">
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTruck className="text-3xl text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">
                Live Delivery Tracking
              </h1>
            </div>
            <div
              className={`px-4 py-1 rounded-full ${status.color} bg-white font-semibold`}
            >
              {status.text}
            </div>
          </div>
        </div>

        <div className="p-4">
          {displayMap}

          {distance && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow">
                  <div className="text-center">
                    <div className="text-gray-500 text-sm">
                      Distance Remaining
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {distance > 1000
                        ? `${(distance / 1000).toFixed(2)} km`
                        : `${distance.toFixed(0)} m`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow">
                  <div className="text-center">
                    <div className="text-gray-500 text-sm">Estimated Time</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.ceil(distance / 250)} mins
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Distance;
