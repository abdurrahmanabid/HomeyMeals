import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/ConsumerHome/Banner";
import ExploreMenu from "../components/ConsumerHome/ExploreMenu";
import FeaturesCard from "../components/ConsumerHome/FeaturesCard";
import HowToDeliver from "../components/ConsumerHome/HowToDelivery";
import HowToOrder from "../components/ConsumerHome/HowtoOrder";
import HowToSell from "../components/ConsumerHome/HowToSell";
import Review from "../components/ConsumerHome/Review";
import Sector from "../components/Sector";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate(`/${user.role}`);
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <Banner />
      <FeaturesCard />
      {(user?.role === "Student" || !user) && (
        <>
          <Sector>How to Order</Sector>
          <HowToOrder />
        </>
      )}
      {(user?.role === "Seller" || !user) && (
        <>
          <Sector>How To Sell</Sector>
          <HowToSell />
        </>
      )}
      {(user?.role === "Rider" || !user) && (
        <>
          <Sector>How To Delivery</Sector>
          <HowToDeliver />
        </>
      )}
      <Sector>Explore The Menu</Sector>
      <ExploreMenu />
      <Sector>What Customers Say About Us</Sector>
      <Review />
    </div>
  );
};

export default Home;
