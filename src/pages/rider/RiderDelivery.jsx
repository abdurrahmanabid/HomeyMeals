import { Button } from "flowbite-react";
import React from "react";
import {
      IoMdCheckmarkCircleOutline,
      IoMdCloseCircleOutline,
} from "react-icons/io";

const RiderDelivery = () => {
  const data = {
    title: "Fish Curry",
    quantity: 2,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptate vero soluta voluptatum error non.",
    user: "Ab Rahman",
    address: "PCIU",
    sales: 258,
    imageSrc: "https://placehold.co/600x400",
    status: "Accepted", // New status field for delivery
  };

  return (
    <section className="w-full flex flex-wrap lg:flex-nowrap h-screen bg-accent5 justify-center">
      <div className="lg:w-screen lg:m-5">
        <div className="m-4 mx-auto rounded-md border border-gray-100 text-gray-600 shadow-md bg-white ">
          <div className="relative flex flex-col text-gray-600 md:flex-row">
            <div className="p-8 md:w-4/6 w-screen">
              <div className="flex flex-col md:flex-row">
                <h2 className="mb-2 text-2xl font-black">{data.title}</h2>
                <span className="ml-2 text-xs uppercase font-bold">
                  {data.quantity}x
                </span>
              </div>
              <p className="mt-3 font-sans text-base tracking-normal">
                {data.description}
              </p>
              <div className="flex flex-col md:flex-row md:items-end mt-6">
                <p className="font-bold">
                  <span className="font-medium">Customer:</span> {data.user}
                </p>
                <p className="font-bold mt-2 md:ml-4">
                  <span className="font-medium">Address:</span> {data.address}
                </p>
              </div>

              {/* Delivery Status Section */}
              <div className="mt-6">
                <p className="font-medium text-gray-600">Status:</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    data.status === "Pending"
                      ? "bg-yellow-200 text-yellow-600"
                      : data.status === "Accepted"
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600"
                  }`}
                >
                  {data.status}
                </span>
              </div>

              {/* Actions for Rider */}
              <div className="mt-8 flex flex-col sm:flex-row">
                <button
                  className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500"
                  onClick={() => alert("Accepted")}
                >
                  <IoMdCheckmarkCircleOutline className="mr-2 h-4 w-4" />
                  Accept
                </button>
                <Button
                  className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white "
                  onClick={() => alert("Declined")}
                >
                  <IoMdCloseCircleOutline className="mr-2 h-4 w-4" />
                  Decline
                </Button>
              </div>
            </div>

            {/* Delivery Image Section */}
            <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
              <img
                className="lg:block h-auto max-w-64 min-w-64 rounded-md shadow-lg hidden"
                src={data.imageSrc}
                alt="Order image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiderDelivery;
