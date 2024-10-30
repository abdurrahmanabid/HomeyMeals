import React from "react";
import { GiFoodTruck } from "react-icons/gi";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Button from "./Button";

const ProductDetail = () => {
  const productDetailItem = {
    images: [
      "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
    ],
    title: "Bread Toast",
    reviews: "150",
    availability: true,
    brand: "Lailatul Borat",
    category: "Fast Food",
    sku: "BE45VGTRK",
    price: 450,
    previousPrice: 599,
    description:
      "Experience luxury and comfort with this Italian-inspired sofa, designed with precision and crafted from the finest materials to bring elegance and relaxation to your living space.",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Gray", "Violet", "Red"],
  };

  return (
    <section className="container mx-auto  py-10 lg:flex  gap-10 ">
      {/* Product Image */}
      <div className="px-4 lg:px-0">
        <img
          src={productDetailItem.images[0]}
          alt={productDetailItem.title}
          className="w-96 lg:min-w-96  rounded-lg shadow-md"
        />
      </div>

      {/* Product Details */}
      <div className="px-5 lg:px-0 space-y-2">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800">
          {productDetailItem.title}
        </h2>

        {/* Ratings and Reviews */}
        <div className="flex items-center">
          <Rater
            total={5}
            interactive={false}
            rating={4}
            style={{ fontSize: "20px" }}
          />
          <span className="ml-3 text-sm text-gray-500">
            {productDetailItem.reviews} Reviews
          </span>
        </div>

        {/* Availability */}
        <p className="text-lg font-medium">
          Availability:{" "}
          <span
            className={`font-semibold ${
              productDetailItem.availability ? "text-green-600" : "text-red-600"
            }`}
          >
            {productDetailItem.availability ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        {/* Brand, Category, SKU */}
        <p className="text-lg font-medium">
          Seller:{" "}
          <span className="text-gray-700 font-normal">
            {productDetailItem.brand}
          </span>
        </p>
        <p className="text-lg font-medium">
          Category:{" "}
          <span className="text-gray-700 font-normal">
            {productDetailItem.category}
          </span>
        </p>
        <p className="text-lg font-medium">
          SKU:{" "}
          <span className="text-gray-700 font-normal">
            {productDetailItem.sku}
          </span>
        </p>

        {/* Price */}
        <p className="text-3xl font-bold text-secondary">
          ${productDetailItem.price}{" "}
          <span className="text-lg text-gray-400 line-through ml-2">
            ${productDetailItem.previousPrice}
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {productDetailItem.description}
        </p>
        <Button className="flex bg-secondary hover:bg-accent1 hover:text-gray-900 mt-5">
          <GiFoodTruck size={30} /> Order Now
        </Button>
      </div>
    </section>
  );
};

export default ProductDetail;
