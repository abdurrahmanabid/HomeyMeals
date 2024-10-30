import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Navbar from './Navbar';

const MainLayout = ({data}) => {

  return (
    <div className="bg-gradient-to-b from-gray-200 to-transparent">
        <Navbar data={data} />
      <div className=" mx-auto ">
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
