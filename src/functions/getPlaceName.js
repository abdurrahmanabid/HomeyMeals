import axios from "axios";

const getPlaceName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    if (response.data && response.data.display_name) {
      const addressParts = response.data.display_name.split(", ");
      const filteredAddress = addressParts.slice(0, 3).join(", ");
      return filteredAddress;
    } else {
      console.log("No location found for these coordinates.");
    }
  } catch (error) {
    console.error("Error fetching location:", error.message);
  }
};

export default getPlaceName;
