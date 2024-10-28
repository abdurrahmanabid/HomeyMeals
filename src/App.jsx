import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Footer from "./layout/Footer";
import Navbar from './layout/Navbar';
import AllMenus from "./Seller/pages/AllMenus";
import Home from "./Seller/pages/Home";
import NotFound from "./Seller/pages/NotFound";
import { TermsAndConditions } from "./Seller/pages/TermsAndConditions";
import { consumer } from './store/navbarObject';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Insert the Navbar component (optional) */}
        <Navbar data={consumer} />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<AllMenus/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />


          <Route path="*" element={<NotFound/>} />



        </Routes>

        {/* Insert the Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
