import React from "react";
import Banner from "../../components/ConsumerHome/Banner";
import ExploreMenu from "../../components/ConsumerHome/ExploreMenu";
import FeaturesCard from "../../components/ConsumerHome/FeaturesCard";
import HowToDeliver from "../../components/ConsumerHome/HowToDelivery";
import HowToOrder from "../../components/ConsumerHome/HowtoOrder";
import HowToSell from "../../components/ConsumerHome/HowToSell";
import Review from "../../components/ConsumerHome/Review";
import Sector from "../../components/Sector";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <Banner />
      <FeaturesCard />
      <Sector>How to Order</Sector>
      <HowToOrder />
      <Sector>How To Sell</Sector>
      <HowToSell/>
      <Sector>How To Delivery</Sector>
      <HowToDeliver/>
      <Sector>Explore The Menu</Sector>
      <ExploreMenu />
      <Sector>What Customers Say About Us</Sector>
      <Review />
    </div>
  );
};

export default Home;
