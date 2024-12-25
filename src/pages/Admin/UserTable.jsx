import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, User, Search } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack } from 'react-icons/io';
import { Button } from 'flowbite-react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { role } = useParams(); // Extract role from URL parameters
const navigate =useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/get/getUsers');
        const filteredData = data.filter(user => user.role === role); // Filter by role
        setUsers(filteredData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [role]); // Refetch users if the role changes

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (userId) => {
    navigate(`/admin/user-details/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
          });
      
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:8000/api/auth/delete/${userId}`);
            
            // Update the state
            setUsers(users.filter(user => user._id !== userId));
      
            // Show success message
            Swal.fire(
              'Deleted!',
              'The user has been deleted.',
              'success'
            );
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire(
            'Error!',
            'Failed to delete user. Please try again.',
            'error'
          );
        }
      };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="p-14 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <Button
  onClick={() => navigate(-1)} // Navigate back to the previous page
  color="gray"
  className="mb-6 flex items-center gap-2 border border-blue-500" // Added gap for spacing between the icon and text
>
  <IoIosArrowBack className="text-xl mt-1.5" /> {/* Adjusted icon size */}
  <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-extrabold text-gray-800 capitalize">
            {role} Users
          </h2>
        </div></Button>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${role} users...`}
            className="pl-12 pr-4 py-3 w-80 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-800">{user.fullName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'Student' ? 'bg-green-100 text-green-800' : 
                        user.role === 'Seller' ? 'bg-blue-100 text-blue-800' : 
                        'bg-purple-100 text-purple-800'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(user.createDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex gap-4">
  {/* View Button */}
  <button
    onClick={() => handleView(user._id)}
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
  >
    View
  </button>
  {/* Delete Button */}
  <button
    onClick={() => handleDelete(user._id)}
    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
    Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
