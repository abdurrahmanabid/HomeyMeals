import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/LogIn";
import ProductDetail from "./components/ProductDetails";
import { Register } from "./components/Register";
import MainLayout from "./layout/MainLayout/MainLayouts";
import AllMenus from "./pages/AllMenus";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerOrders from "./pages/seller/SellerOrders";
import StudentCart from "./pages/student/StudentCart";
import StudentCheckout from "./pages/student/StudentCheckout";
import StudentMenu from "./pages/student/StudentMenu";
import StudentProfileDetails from "./pages/student/StudentProfileDetails";
import StudentMealDetails from "./pages/student/StudentsMealDetails";
import StudentOrder from "./pages/student/StudentsOrder";
import { consumer, seller } from './store/navbarObject';
import StudentMealDetails from "./pages/student/StudentsMealDetails";
import { consumer, rider, seller } from "./store/navbarObject";
function App() {
  return (
    <Router>
      <div className="App pt-[80px]">
        {/* Insert the Navbar component (optional) */}

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<AllMenus />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />

          <Route path="/seller" element={<MainLayout data={seller} />}>
            <Route path="" element={<Home />} />
            <Route path="dashboard" element={<SellerDashboard />}/>
            <Route path="order" element={<SellerOrders />}/> 
          </Route>

          <Route path="/student" element={<MainLayout data={consumer} />}>
            <Route path="" element={<Home />} />
            <Route path="allMenu" element={<ProductDetail />} />
            <Route path="checkout" element={<StudentCheckout />} />
            <Route path="order" element={<StudentOrder />} />
            <Route path="menu" element={<StudentMenu />} />
            <Route path="profile" element={<StudentProfileDetails />} />
            <Route path="cart" element={<StudentCart />} />
            <Route path="/student/meal/:mealId" element={<StudentMealDetails />} />
          </Route>
          <Route path="/rider" element={<MainLayout data={rider} />}>
            <Route path="" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
