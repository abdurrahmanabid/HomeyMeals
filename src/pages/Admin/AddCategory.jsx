import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'flowbite-react';
import { IoIosArrowBack } from 'react-icons/io';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send
    const categoryData = {
      name: categoryName,
      description: categoryDescription,
    };

    try {
      // Send a POST request to your API endpoint
      const response = await axios.post('http://localhost:8000/api/categories/add', categoryData);

      // Show a success message
      Swal.fire({
        icon: 'success',
        title: 'Category Added',
        text: response.data.message,
      });

      // Reset form fields after success
      setCategoryName('');
      setCategoryDescription('');
    } catch (error) {
      // Show an error message if something went wrong
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue adding the category.',
      });
    }
  };
  const handleNavigate = () => {
    window.history.back();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 m-10 bg-white rounded-lg shadow-md">
            <Button
          onClick={handleNavigate} // Navigate back to the previous page
          color="gray"
          className="mb-6 flex items-center gap-2 border border-blue-500" // Added gap for spacing between the icon and text
        >
          <IoIosArrowBack className="text-xl mt-1.5" /> 
          <h1 className="text-2xl font-bold text-center">Add New Category</h1>
        </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700">Category Name</label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="categoryDescription" className="block text-lg font-medium text-gray-700">Category Description</label>
          <textarea
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter a short description"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
