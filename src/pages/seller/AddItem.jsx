import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../utils/useAuth";

const AddItem = () => {
  const { id } = useAuth();
  console.log("🚀 ~ AddItem ~ user:", id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    discountPrice: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const fileInputRef = useRef(null);
  const [profileDataError, setProfileDataError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/get/${id}`
        );
        if (!response.data) {
          throw new Error("Profile data not found");
        }
      } catch (error) {
        setProfileDataError(error.message || "Error fetching profile data");
      }
    };

    fetchProfileData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else setImagePreview(null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for profile data error first
    if (profileDataError) {
      Swal.fire({
        title: "Set Up Your Profile",
        text: "Please set up your profile before adding items.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Set Your Profile",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("../profile");
        }
      });
      return;
    }

    const { itemName, description, price, discountPrice, image } = formData;

    // Validation checks
    if (!itemName || !description || !price || !image) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (discountPrice && parseFloat(discountPrice) > parseFloat(price)) {
      Swal.fire({
        title: "Error!",
        text: "Discount price must be less than or equal to the original price.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSubmit.append(key, value)
    );

    // Set loading to true before submitting
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/item/${id}/post-a-item`,
        {
          method: "POST",
          body: formDataToSubmit,
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Food item added successfully!",
          icon: "success",
          confirmButtonText: "Great!",
        });
        navigate("/seller/my-items");
        window.location.reload();
      } else {
        throw new Error("Failed to add item");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 mb-10 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add New Food Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["itemName", "description", "price", "discountPrice"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field === "itemName"
                ? "Item Name:"
                : field === "description"
                ? "Description:"
                : field === "price"
                ? "Price:"
                : "Discount Price:"}
            </label>
            {field === "description" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                rows="4"
                required={field !== "discountPrice"}
                placeholder={
                  field === "description"
                    ? "Describe the food item"
                    : field === "discountPrice"
                    ? "Enter discount price (optional)"
                    : "Enter price"
                }
              />
            ) : (
              <input
                type={
                  field === "price" || field === "discountPrice"
                    ? "number"
                    : "text"
                }
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                required={field !== "discountPrice"}
                min="0"
                step="0.01"
                placeholder={
                  field === "itemName"
                    ? "Enter item name"
                    : field === "discountPrice"
                    ? "Enter discount price (optional)"
                    : "Enter price"
                }
              />
            )}
          </div>
        ))}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleChange}
            className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            accept="image/*"
            required
          />
          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin">Loading...</span>
          ) : (
            "Add Item"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
