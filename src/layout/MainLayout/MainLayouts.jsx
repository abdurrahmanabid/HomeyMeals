import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Navbar from "../Navbar";
import { consumer } from '../../store/navbarObject';

const MainLayout = () => {

  return (
    <div className="bg-gradient-to-b from-gray-200 to-transparent">
        <Navbar data={consumer} />
      <div className=" mx-auto ">
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
