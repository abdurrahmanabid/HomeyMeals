import { useEffect, useState } from "react";
import getPlaceName from './../functions/getPlaceName';

const LocationDisplay = ({ lat, lng }) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        console.log("Fetching address for:", lat, lng); // Debug log
        const result = await getPlaceName(lat, lng);
        console.log("Result:", result); // Debug log
        if (result) {
          setAddress(result);
        } else {
          setError("Location not found");
        }
      } catch (error) {
        console.error("Error details:", error); // Debug log
        setError("Failed to fetch location");
      } finally {
        setLoading(false);
      }
    };

    if (lat && lng) {
      fetchAddress();
    }
  }, [lat, lng]);

  // Add coordinate display for debugging
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">
        Coordinates: {lat}°, {lng}°
      </p>
      {loading && <p className="text-sm text-gray-500">Loading address...</p>}
      {error && <p className="text-sm text-rose-500">{error}</p>}
      {!loading && !error && address && (
        <p className="text-sm text-gray-600 mt-2">{address}</p>
      )}
    </div>
  );
};
export default LocationDisplay;