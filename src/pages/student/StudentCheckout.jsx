import React from "react";

const StudentCheckout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 lg:px-40">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h1>
      
      {/* Main Checkout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Shipping Details Section */}
        <section className="bg-white p-6 shadow-lg rounded-lg lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Details</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <input 
              type="text" 
              placeholder="Street Address" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <input 
              type="text" 
              placeholder="City" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
            <div className="flex space-x-4">
              <input 
                type="text" 
                placeholder="State/Province" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
              <input 
                type="text" 
                placeholder="Zip Code" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            </div>
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" 
            />
          </form>
        </section>
        
        {/* Order Summary Section */}
        <section className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Product 1</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between">
              <span>Product 2</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between">
              <span>Product 3</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-200 pt-4">
              <span>Total</span>
              <span>$45.00</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            Place Order
          </button>
        </section>
      </div>

      {/* Payment Method Section */}
      <section className="mt-8 bg-white p-6 shadow-lg rounded-lg lg:col-span-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" id="credit-card" className="h-4 w-4 text-blue-600 focus:ring-0" />
            <label htmlFor="credit-card" className="text-gray-700">Credit Card</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" id="paypal" className="h-4 w-4 text-blue-600 focus:ring-0" />
            <label htmlFor="paypal" className="text-gray-700">PayPal</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" name="payment" id="bank-transfer" className="h-4 w-4 text-blue-600 focus:ring-0" />
            <label htmlFor="bank-transfer" className="text-gray-700">Bank Transfer</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentCheckout;
