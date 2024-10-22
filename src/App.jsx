import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./layout/Footer";
import SellerNavbar from "./layout/SellerNavbar";
import Home from "./Seller/pages/Home";
import NotFound from "./Seller/pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Insert the Navbar component (optional) */}
        <SellerNavbar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home/>} />


          <Route path="*" element={<NotFound/>} />



        </Routes>

        {/* Insert the Footer component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
