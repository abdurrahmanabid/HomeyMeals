import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import orderLottie from '../../assets/lottie/order.json';

const HowToOrder = () => {
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
                <h3 className="text-xl font-semibold">Choose Your Meal</h3>
                <p className="text-gray-600">
                  Browse the delicious home-cooked meals available from nearby
                  households. Choose what you love.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start mb-8">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Place Your Order</h3>
                <p className="text-gray-600">
                  Add your selected meal to the cart and proceed to checkout.
                  It's easy and convenient.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Enjoy Your Meal</h3>
                <p className="text-gray-600">
                  Your food will be delivered by our rider. Sit back, relax, and
                  enjoy your fresh, homemade meal.
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
                src={orderLottie} // Replace with your own Lottie JSON URL or local file
                style={{ height: "400px", width: "400px" }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
