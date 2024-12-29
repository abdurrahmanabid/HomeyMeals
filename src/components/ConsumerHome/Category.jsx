import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'flowbite-react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/getCategory');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-purple-600 font-bold text-lg">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-white bg-red-500 rounded-lg shadow-lg" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className=" p-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <Card 
            key={index} 
            className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl bg-white/95 backdrop-blur"
          >
            <div className="flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
              
              <div className="flex items-center mb-4 relative">
                <div className="w-3 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-r mr-4"></div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  {category.name}
                </h5>
              </div>
              
              <p className="font-normal text-gray-700 flex-grow text-lg">
                {category.description}
              </p>
              
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Category;