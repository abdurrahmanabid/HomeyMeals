import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/ConsumerHome/Banner";
import FeaturesCard from "../components/ConsumerHome/FeaturesCard";
import HowToDeliver from "../components/ConsumerHome/HowToDelivery";
import HowToOrder from "../components/ConsumerHome/HowtoOrder";
import HowToSell from "../components/ConsumerHome/HowToSell";
import Review from "../components/ConsumerHome/Review";
import Sector from "../components/Sector";
import useAuth from "../utils/useAuth";
import Category from "../components/ConsumerHome/Category";

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();
  
  useEffect(() => {
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

{(user?.role === "Admin" || !user) && (

  <>
  <>
  <Sector>How to Order</Sector>
  <HowToOrder />
</>
 <>
 <Sector>How To Sell</Sector>
 <HowToSell />
</>
        <>
          <Sector>How To Delivery</Sector>
          <HowToDeliver />
        </>
        </>
      )}

      <Sector>Explore Category</Sector>
      <Category />
      <Sector>What Customers Say About Us</Sector>
      <Review />
    </div>
  );
};

export default Home;
