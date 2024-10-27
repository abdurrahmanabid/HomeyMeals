import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import sellLottie from "../../assets/lottie/seller.json";

const HowToSell = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Grid Layout for Steps and Animation */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Lottie Animation Section */}
          <div className="flex justify-center order-last lg:order-first">
            <div className="w-3/4 relative">
              <Player
                autoplay
                loop
                src={sellLottie} // Replace with your own Lottie JSON URL or local file
                style={{ height: "400px", width: "400px" }}
              />
            </div>
          </div>

          {/* Steps Section */}
          <div>
            {/* Step 1 */}
            <div className="flex items-start mb-8">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Register as a Seller</h3>
                <p className="text-gray-600">
                  Join the HomeyMeals community and set up your seller profile.
                  It’s quick and easy.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start mb-8">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">List Your Dishes</h3>
                <p className="text-gray-600">
                  Upload photos, set prices, and provide descriptions for your
                  delicious home-cooked meals.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Start Selling</h3>
                <p className="text-gray-600">
                  Accept orders and prepare your meals. A rider will handle
                  delivery, ensuring your food reaches customers hot and fresh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToSell;
