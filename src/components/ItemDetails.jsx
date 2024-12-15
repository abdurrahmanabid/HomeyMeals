import { Clock, DollarSign, Eye, Image, MapPin, Tag } from "lucide-react";
import React from "react";

const ItemDetails = ({ selectedItem }) => {

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center space-x-6 mb-6">
        {selectedItem.imagePreview ? (
          <img
            src={selectedItem.imagePreview}
            alt={selectedItem.itemName}
            className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg transform hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
            <Image className="text-gray-500" size={48} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-purple-800 mb-2">
            {selectedItem.itemName}
          </h2>
          <p className="text-gray-600 italic">
            <Eye className="inline-block mr-2 text-blue-500" size={18} />
            {selectedItem.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Tag className="text-green-500 mr-2" size={20} />
            <span className="text-sm font-medium text-gray-500">Category</span>
          </div>
          <p className="text-gray-800 font-semibold">
            {selectedItem.category || "Uncategorized"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Clock className="text-blue-500 mr-2" size={20} />
            <span className="text-sm font-medium text-gray-500">Status</span>
          </div>
          <p
            className={`font-semibold ${
              selectedItem.status === "pending"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {selectedItem.status}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <MapPin className="text-purple-500 mr-2" size={20} />
            <span className="text-sm font-medium text-gray-500">Stock</span>
          </div>
          <p
            className={`font-semibold ${
              selectedItem.stock === "active"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedItem.stock === "active" ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <DollarSign className="text-emerald-500 mr-2" size={20} />
            <span className="text-sm font-medium text-gray-500">Pricing</span>
          </div>
          <div>
            <p className="text-gray-800 font-bold text-xl">
              ${selectedItem.price.toFixed(2)}
            </p>
            {selectedItem.discountPrice > 0 && (
              <p className="text-green-600 text-sm line-through">
                Discount: ${selectedItem.discountPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>Created: {selectedItem.createdAt.split("T")[0]}</p>
        <p>Last Updated: {selectedItem.updatedAt.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
