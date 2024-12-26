import axios from "axios";
import {
  BadgeInfo,
  CalendarIcon,
  PackageIcon,
  StoreIcon,
  TagIcon,
  TrashIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ItemDetails from "../../components/ItemDetails";
import Modal from "../../components/Modal";
import useAuth from "../../utils/useAuth";
import { calculateDiscount } from "./../../functions/calculateDiscount";
import AddItem from "./AddItem";

const SellerItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addItemModal, setAddItemModal] = useState(false);
  const [detailsItemModal, setDetailsItemModal] = useState(false);
  const [specificItem, setSpecificItem] = useState(false);
  const user = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/item/items/seller/${user.id}`
        );
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-700 bg-green-100";
      case "idle":
        return "text-red-700 bg-red-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const handleAddClick = () => {
    setAddItemModal(true);
  };

  const handleDetailsClick = (item) => {
    setDetailsItemModal(true);
    setSpecificItem(item);
  };

  const handleDeleteItem = async (itemId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If user confirms deletion
    if (result.isConfirmed) {
      try {
        // Make DELETE request to the backend
        await axios.delete(`http://localhost:8000/api/item/delete/${itemId}`);

        // Remove item from local state
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );

        // Show success notification
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The item has been deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        // Handle any errors during deletion
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while deleting the item.",
          footer: error.message,
        });
      }
    }
  };

  const handleStockToggle = async (itemId, currentStock) => {
    try {
      const newStock = currentStock === "active" ? "stock-out" : "active";

      // Update backend
      await axios.put(`http://localhost:8000/api/item/update-item/${itemId}`, {
        stock: newStock,
      });

      // Update local state
      setItems(
        items.map((item) =>
          item._id === itemId ? { ...item, stock: newStock } : item
        )
      );
    } catch (error) {
      console.error("Error updating stock status:", error);
      // Optionally, you could add error handling UI here
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse text-4xl text-gray-500">
          Loading your items...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10">
      <div className="container mx-auto max-w-7xl">
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center sm:text-left w-full sm:w-auto">
            My Listed Items
          </h1>
          <button
            className="w-full sm:w-auto bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-800 transition text-base sm:text-lg font-semibold shadow-md"
            onClick={handleAddClick}
          >
            + Add New Item
          </button>
        </div>

        {/* Empty State */}
        {items?.length === 0 || !items ? (
          <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-16 text-center">
            <PackageIcon
              className="mx-auto mb-4 sm:mb-8 text-gray-400"
              size={80}
            />
            <p className="text-xl sm:text-2xl text-gray-600 mb-4 sm:mb-6">
              You haven't listed any items yet
            </p>
            <button
              onClick={handleAddClick}
              className="bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-800 transition text-base sm:text-xl font-semibold shadow-lg"
            >
              List Your First Item
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-2xl rounded-2xl overflow-x-auto">
            {/* Mobile View - Card Layout */}
            <div className="block md:hidden">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition"
                >
                  {/* Mobile Item Card */}
                  <div className="flex space-x-4 mb-4">
                    {item.imagePreview ? (
                      <img
                        src={item.imagePreview}
                        alt={item.itemName}
                        className="w-24 h-24 object-cover rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                        <PackageIcon className="text-gray-500" size={48} />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        {item.itemName}
                      </h2>
                      <div className="text-green-600 font-semibold mb-2">
                        ${item.discountPrice || item.price.toFixed(2)}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleDetailsClick(item)}
                      className="flex items-center justify-center bg-gray-500 text-white px-2 py-2 rounded-lg hover:bg-gray-600 transition space-x-1 text-sm"
                    >
                      <BadgeInfo size={16} />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="flex items-center justify-center bg-red-600 text-white px-2 py-2 rounded-lg hover:bg-red-700 transition space-x-1 text-sm"
                    >
                      <TrashIcon size={16} />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => handleStockToggle(item._id, item.stock)}
                      className={`flex items-center justify-center text-white px-2 py-2 rounded-lg transition space-x-1 text-sm ${
                        item.stock === "active"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      <StoreIcon size={16} />
                      <span>{item.stock === "active" ? "Out" : "Active"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <table className="w-full hidden md:table">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="p-6 text-left text-gray-700 font-bold text-lg">
                    Item Details
                  </th>
                  <th className="p-6 text-left text-gray-700 font-bold text-lg">
                    Pricing
                  </th>
                  <th className="p-6 text-left text-gray-700 font-bold text-lg">
                    Stock
                  </th>
                  <th className="p-6 text-left text-gray-700 font-bold text-lg">
                    Status
                  </th>
                  <th className="p-6 text-left text-gray-700 font-bold text-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const discountPercentage = calculateDiscount(
                    item.originalPrice || item.price,
                    item.discountPrice
                  );

                  return (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-6">
                        <div className="flex items-center space-x-6">
                          {item.imagePreview ? (
                            <img
                              src={item.imagePreview}
                              alt={item.itemName}
                              className="w-32 h-32 object-cover rounded-xl shadow-lg"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
                              <PackageIcon
                                className="text-gray-500"
                                size={64}
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                              {item.itemName}
                            </h2>
                            <p className="text-lg text-gray-600 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-4 text-gray-500">
                              <div className="flex items-center space-x-2">
                                <CalendarIcon size={20} />
                                <span className="text-base">
                                  Listed:{" "}
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <TagIcon size={20} />
                                <span className="text-base">
                                  Category: {item.category || "Uncategorized"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          {item.discountPrice ? (
                            <>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-2xl font-bold text-green-600">
                                  ${item.discountPrice.toFixed(2)}
                                </span>
                                {discountPercentage > 0 && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                                    {discountPercentage}% OFF
                                  </span>
                                )}
                              </div>
                              <span className="text-base text-gray-500 line-through">
                                ${(item.originalPrice || item.price).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <StoreIcon size={20} className="text-gray-500" />
                          <span className="text-lg font-semibold">
                            {item.stock === "active" ? "On Stock" : "Stock-Out"}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span
                          className={`px-4 py-2 rounded-full text-base font-semibold ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col space-y-3">
                          <button
                            onClick={() => handleDetailsClick(item)}
                            className="flex items-center justify-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition space-x-2"
                          >
                            <BadgeInfo size={25} />
                            <span>Details</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition space-x-2"
                          >
                            <TrashIcon size={20} />
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() =>
                              handleStockToggle(item._id, item.stock)
                            }
                            className={`flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg transition space-x-2 ${
                              item.stock === "active"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >
                            <StoreIcon size={20} />{" "}
                            {item.stock === "active"
                              ? "Set Stock Out"
                              : "Set Active"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {addItemModal && (
        <Modal
          handleModalClose={() => setAddItemModal(false)}
          title={"Add A item"}
          size="max-w-4xl"
          height="full"
        >
          <AddItem />
        </Modal>
      )}

      {detailsItemModal && specificItem && (
        <Modal
          handleModalClose={() => {
            setDetailsItemModal(false);
            setSpecificItem(null);
          }}
          title={"Food Details"}
        >
          <ItemDetails selectedItem={specificItem} />
        </Modal>
      )}
    </div>
  );
};

export default SellerItems;
