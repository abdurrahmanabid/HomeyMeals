import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Search } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack } from 'react-icons/io';
import { Button, Modal } from 'flowbite-react';
import ItemsDetails from './ItemsDetails';

const ItemTable = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/item/items');
        const filteredData =
          category === 'AllItems'
            ? data
            : data.filter((item) => item.status === category);
        setItems(filteredData);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (itemId) => {
    const item = items.find((item) => item._id === itemId);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedItem = { ...selectedItem, status: newStatus };
      await axios.put(`http://localhost:8000/api/item/update-item/${selectedItem._id}`, updatedItem);
      setItems(items.map((item) => (item._id === selectedItem._id ? updatedItem : item)));
      Swal.fire('Success!', 'Item status updated.', 'success');
      handleCloseModal();
    } catch (error) {
      console.error('Error updating item status:', error);
      Swal.fire('Error!', 'Failed to update item status. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => navigate(-1)}
          color="gray"
          className="flex items-center gap-2 border border-blue-500"
        >
          <IoIosArrowBack className="text-xl mt-1.5" />
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-extrabold text-gray-800 capitalize">
              {category} Items
            </h2>
          </div>
        </Button>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${category} items by name or category...`}
            className="pl-12 pr-4 py-3 w-96 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Item Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
  {filteredItems.length > 0 ? (
    filteredItems.map((item) => ( // Removed extra curly braces
      <tr key={item._id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.itemName}</td>
        <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full 
              ${
                item.status === 'pending'
                  ? 'bg-yellow-300 text-yellow-900'
                  : item.status === 'approved'
                  ? 'bg-green-300 text-green-900'
                  : item.status === 'idle'
                  ? 'bg-red-300 text-red-900'
                  : 'bg-gray-300 text-gray-900'
              }`}
          >
            {item.status}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">৳{item.price}</td>
        <td className="px-6 py-4 flex gap-4">
          <button
            onClick={() => handleView(item._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            View
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center text-red-500">No items found</td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {selectedItem && (
        <Modal show={true} onClose={handleCloseModal}>
          <Modal.Header>Item Details</Modal.Header>
          <Modal.Body>
            <ItemsDetails
              item={selectedItem}
              handleStatusChange={handleStatusChange}
              handleClose={handleCloseModal}
            />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ItemTable;
