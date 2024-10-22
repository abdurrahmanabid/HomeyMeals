import React from "react";
import Banner from "../../components/ConsumerHome/Banner";
import FeaturesCard from "../../components/ConsumerHome/FeaturesCard";
import Sector from "../../components/Sector";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <Banner />
      <FeaturesCard />
      <Sector>About Us</Sector>
    </div>
  );
};

export default Home;
