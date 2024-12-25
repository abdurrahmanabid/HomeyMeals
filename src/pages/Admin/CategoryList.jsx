import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/getCategory');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/categories/delete/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Category Deleted',
        text: response.data.message,
      });
      fetchCategories(); // Refresh categories list
    } catch (error) {
      console.error('Error deleting category:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue deleting the category.',
      });
    }
  };

  // Call fetchCategories when component is mounted
  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category button handler
  const handleAddCategory = () => {
    navigate('/Admin/add-category'); // Navigate to the 'Add Category' page
  };

  if (loading) return <div className="text-center py-10">Loading categories...</div>;

  if (!categories.length) return <div className="text-center py-10">No categories available</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 m-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Category List</h1>

      {/* Button to add a new category */}
      <div className="text-right mb-6">
        <button
          onClick={handleAddCategory}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none"
        >
          Add New Category
        </button>
      </div>

      {/* Category Table */}
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-gray-700">Category Name</th>
            <th className="px-6 py-3 text-left text-gray-700">Category Description</th>
            <th className="px-6 py-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{category.name}</td>
              <td className="px-6 py-3">{category.description}</td>
              <td className="px-6 py-3">
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
