import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { BASE_URL } from "../utils/ServerBaseURL";
import useAuth from "../utils/useAuth";

const ProfileEdit = ({data}) => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuth()
  console.log("🚀 ~ App ~ user:", user)
  // Fetch Divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://bdapis.com/api/v1.2/divisions"
        );
        setDivisions(data.data);
      } catch (error) {
        console.error("Failed to fetch divisions", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDivisions();
  }, []);

  // Fetch Districts based on selected division
  const fetchDistricts = async (division) => {
    if (division) {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
         `https://bdapis.com/api/v1.2/division/${division}`
        );
        setDistricts(data.data || []); // Use optional chaining and default value
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch Upazillas based on selected district
  const fetchUpazillas = (district) => {
    if (district) {
      const districtData = districts.find((d) => d.district === district);
      if (districtData) {
        setUpazillas(districtData.upazilla || []);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    selectedDivision: Yup.string().required("Division is required"),
    selectedDistrict: Yup.string().required("District is required"),
    selectedUpazilla: Yup.string().required("Upazilla is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed()
      .required("Avatar is required")
      .test(
        "fileSize",
        "File is too large",
        (value) => !value || value.size <= 1024 * 1024
      ),
  });

  // Handle form submission
const handleSave = async (values) => {
  try {
    let base64Image = null;

    // Convert the file to base64 if an image is selected
    if (image) {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });

      base64Image = await base64Promise; // Wait for base64 conversion
    }

    // Prepare the payload
    const payload = {
      division: values.selectedDivision,
      district: values.selectedDistrict,
      upazilla: values.selectedUpazilla,
      description: values.description,
      profilePicture: base64Image, // Add base64-encoded image here
    };

    console.log("Sending payload:", payload);

    // Send POST request with JSON data
    await axios.post(`${BASE_URL}profile/post/${user.id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    data(payload)
    console.log("Profile saved successfully!");
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};

  

  return (
    <div className="">
      <Formik
        initialValues={{
          selectedDivision: "",
          selectedDistrict: "",
          selectedUpazilla: "",
          description: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            {/* Header Section */}
            <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
              <div className="shrink-0 mr-auto sm:py-3">
                <p className="font-medium">Account Details</p>
                <p className="text-sm text-gray-600">
                  Edit your account details
                </p>
              </div>
              <button
                type="submit"
                className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700"
              >
                Save
              </button>
            </div>

            {/* Address Section */}
            <p className="font-medium">Address</p>
            <div className="flex gap-4 border-b py-4">
              <Field
                as="select"
                name="selectedDivision"
                className="w-full rounded-md border px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                onChange={(e) => {
                  setFieldValue("selectedDivision", e.target.value);
                  fetchDistricts(e.target.value); // Fetch districts based on division
                }}
              >
                <option value="">Select Division</option>
                {divisions.map((division) => (
                  <option key={division.division} value={division.division}>
                    {division.division}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="selectedDivision"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                as="select"
                name="selectedDistrict"
                className="w-full rounded-md border px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                onChange={(e) => {
                  setFieldValue("selectedDistrict", e.target.value);
                  fetchUpazillas(e.target.value); // Fetch upazillas based on district
                }}
                disabled={!values.selectedDivision}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.district} value={district.district}>
                    {district.district}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="selectedDistrict"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                as="select"
                name="selectedUpazilla"
                className="w-full rounded-md border px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                disabled={!values.selectedDistrict}
              >
                <option value="">Select Upazilla</option>
                {upazillas.map((upazilla, index) => (
                  <option key={index} value={upazilla}>
                    {upazilla}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="selectedUpazilla"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-4 border-b py-4">
              <p className="font-medium">Description</p>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter a brief description..."
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Avatar Section */}
            <div className="shrink-0 w-32 sm:py-4">
              <p className="font-medium">Avatar</p>
            </div>
            <div className="flex flex-col gap-4 py-4 lg:flex-row">
              <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5">
                {/* Image Preview */}
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                )}
                {/* File input */}
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                    handleImageUpload(e);
                  }}
                  accept="image/*"
                  className="mt-2 rounded-l-lg"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {image && <p className="text-sm">{image.name}</p>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEdit;