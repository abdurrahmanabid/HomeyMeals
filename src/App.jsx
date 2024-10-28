import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import AllMenus from "./Seller/pages/AllMenus";
import Home from "./Seller/pages/Home";
import NotFound from "./Seller/pages/NotFound";
import { Login } from "./components/LogIn";
import SellerLayout from "./layout/SellerLayout/SellerLayout";
import MainLayout from "./layout/MainLayout/MainLayouts";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Insert the Navbar component (optional) */}
      

        {/* Define Routes */}
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<AllMenus/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
</Route>
          <Route path="*" element={<NotFound/>} />


          <Route path="/homeyMeals/seller" element={<SellerLayout />}>
                    <Route path="allMenu" element={<AllMenus />} />
                    <Route path="home" element={<Home />} />
                   
                  </Route>

        </Routes>

       

      </div>
    </Router>
  );
}

export default App;
