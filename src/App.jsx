import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import AllMenus from "./Seller/pages/AllMenus";
import Home from "./Seller/pages/Home";
import NotFound from "./Seller/pages/NotFound";
<<<<<<< HEAD
import { TermsAndConditions } from "./Seller/pages/TermsAndConditions";
import { consumer } from './store/navbarObject';
=======
import { Login } from "./components/LogIn";
import SellerLayout from "./layout/SellerLayout/SellerLayout";
import MainLayout from "./layout/MainLayout/MainLayouts";
>>>>>>> b22edaed8ad2a7661334e1cf6e3c10ed4c2648b9

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
<<<<<<< HEAD
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />


=======
</Route>
>>>>>>> b22edaed8ad2a7661334e1cf6e3c10ed4c2648b9
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
