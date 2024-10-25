import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import deliveryLottie from "../../assets/lottie/review.json";

const HowToDeliver = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Grid Layout for Steps and Animation */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Steps Section */}
          <div>
            {/* Step 1 */}
            <div className="flex items-start mb-8">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">
                  Accept Delivery Request
                </h3>
                <p className="text-gray-600">
                  Review and accept delivery requests in your app to start
                  delivering meals to customers.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start mb-8">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Pick Up the Meal</h3>
                <p className="text-gray-600">
                  Head to the seller's location, collect the prepared meal, and
                  ensure it's secure for transport.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Deliver to Customer</h3>
                <p className="text-gray-600">
                  Follow the best route to the customer’s location. Complete the
                  delivery and confirm in the app.
                </p>
              </div>
            </div>
          </div>

          {/* Lottie Animation Section */}
          <div className="flex justify-center">
            <div className="w-3/4 relative">
              <Player
                autoplay
                loop
                src={deliveryLottie} // Replace with your own Lottie JSON URL or local file
                style={{ height: "400px", width: "400px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToDeliver;
