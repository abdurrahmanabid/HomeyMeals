import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { HiUser, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { Card, Button } from 'flowbite-react';
import { IoIosArrowBack } from 'react-icons/io';
import { use } from 'react';

const UserDetails = () => {
  const [users, setUsers] = useState(null);
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null); // State to store the address
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate(); // Create navigate instance for navigation

  // Function to convert lat/lng to a real address using OpenStreetMap Nominatim API
  const getAddressFromLatLng = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const response = await axios.get(url);
      const address = response.data.display_name;
      setAddress(address); // Update the state with the address
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(null); // In case of error, reset address
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/get/getUsers/${id}`);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsersProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/profile/get/${id}`);
        setProfile(data.profile);
        if (data.profile.lat && data.profile.lng) {
          getAddressFromLatLng(data.profile.lat, data.profile.lng); // Call to convert lat/lng to address
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchUsersProfile();
  }, [id]);

//   if (loading) return <div className="text-center py-10 container mx-auto p-6">
//      <Button
//   onClick={() => navigate(-1)} // Navigate back to the previous page
//   color="gray"
//   className="mb-6 flex items-center gap-2 border border-blue-500" // Added gap for spacing between the icon and text
// >
//   <IoIosArrowBack className="text-xl mt-1.5" /> {/* Adjusted icon size */}
//   <h1 className="text-2xl font-bold text-center">User Details</h1>
// </Button>

//     Loading...</div>;

//   if (!users || !profile) return <div className="text-center py-10 container mx-auto p-6">
//      <Button
//   onClick={() => navigate(-1)} // Navigate back to the previous page
//   color="gray"
//   className="mb-6 flex items-center gap-2 border border-blue-500" // Added gap for spacing between the icon and text
// >
//   <IoIosArrowBack className="text-xl mt-1.5" /> {/* Adjusted icon size */}
//   <h1 className="text-2xl font-bold text-center">User Details</h1>
// </Button>

//     No data available</div>;

  return (
    <div className="container mx-auto p-6">
      
      <Button
  onClick={() => navigate(-1)} // Navigate back to the previous page
  color="gray"
  className="mb-6 flex items-center gap-2 border border-blue-500" // Added gap for spacing between the icon and text
>
  <IoIosArrowBack className="text-xl mt-1.5" /> {/* Adjusted icon size */}
  <h1 className="text-2xl font-bold text-center">User Details</h1>
</Button>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {users?
        <Card className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">User Information</h2>
          <div className="flex items-center mb-2">
            <HiUser className="text-blue-500 mr-3" />
            <p><strong>Full Name:</strong> {users.fullName}</p>
          </div>
          <div className="flex items-center mb-2">
            <HiMail className="text-blue-500 mr-3" />
            <p><strong>Email:</strong> {users.email}</p>
          </div>
          <div className="flex items-center mb-2">
            <HiPhone className="text-blue-500 mr-3" />
            <p><strong>Phone:</strong> {users.phone}</p>
          </div>
          <div className="flex items-center mb-2">
            <p><strong>Role:</strong> {users.role}</p>
          </div>
          <div className="flex items-center mb-4">
            <p><strong>Account Created On:</strong> {new Date(users.createDate).toLocaleDateString()}</p>
          </div>
        </Card>:<div>no data provided</div>}

        {/* Profile Information Card */}
        {profile?  <Card className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile Information</h2>
          <div className="flex items-center mb-2">
            <HiLocationMarker className="text-green-500 mr-3" />
            <p><strong>Upazilla:</strong> {profile.upazilla}</p>
          </div>
          <div className="flex items-center mb-2">
            <HiLocationMarker className="text-green-500 mr-3" />
            <p><strong>District:</strong> {profile.district}</p>
          </div>
          <div className="flex items-center mb-2">
            <HiLocationMarker className="text-green-500 mr-3" />
            <p><strong>Division:</strong> {profile.division}</p>
          </div>
          <div className="flex items-center mb-2">
            <p><strong>Description:</strong> {profile.description}</p>
          </div>
          <div className="flex items-center mb-4">
            <p><strong>Location (Lat, Lng):</strong> {profile.lat}, {profile.lng}</p>
          </div>
          <div className="flex items-center mb-4">
            <p><strong>Address:</strong> {address ? address : 'Loading address...'}</p> 
          </div>
        </Card>:< Card className="p-6 border rounded-lg shadow-lg bg-white">no data provided for Profile</Card>}
      </div>
    </div>
  );
};

export default UserDetails;
