import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { Login } from "./components/LogIn";
import ProductDetail from "./components/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the new component
import { Register } from "./components/Register";
import MainLayout from "./layout/MainLayout/MainLayouts";
import AllMenus from "./pages/AllMenus";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import RiderCurrentDElivery from "./pages/rider/RiderCurrentDelivery";
import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderDelivery from "./pages/rider/RiderDelivery";
import RideerNotification from "./pages/rider/RiderNotification";
import AddItem from "./pages/seller/AddItem";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerOrders from "./pages/seller/SellerOrders";
import CashMemo from "./pages/student/CashMemo";
import StudentCart from "./pages/student/StudentCart";
import StudentCheckout from "./pages/student/StudentCheckout";
import StudentMenu from "./pages/student/StudentMenu";
import StudentProfileDetails from "./pages/student/StudentProfileDetails";
import StudentMealDetails from "./pages/student/StudentsMealDetails";
import StudentOrder from "./pages/student/StudentsOrder";
import { consumer, rider, seller } from "./store/navbarObject";
import useAuth from "./utils/useAuth";
import SellerProfileDetails from "./pages/seller/SellerProfileDetails";
import RiderProfileDetails from "./pages/rider/RiderProfileDetails";

function App() {
  const user = useAuth()
  console.log("🚀 ~ App ~ user:", user)

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
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

          {/* Seller Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Seller"]} />}>
            <Route path="/seller" element={<MainLayout data={seller} />}>
              <Route path="" element={<Home />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="order" element={<SellerOrders />} />
              <Route path="addItem" element={<AddItem />} />
              <Route path="profile" element={<SellerProfileDetails />} />
            </Route>
          </Route>

          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
            <Route path="/student" element={<MainLayout data={consumer} />}>
              <Route path="" element={<Home />} />
              <Route path="allMenu" element={<ProductDetail />} />
              <Route path="checkout" element={<StudentCheckout />} />
              <Route path="cash-memo" element={<CashMemo />} />

              <Route path="order" element={<StudentOrder />} />
              <Route path="menu" element={<StudentMenu />} />
              <Route path="profile" element={<StudentProfileDetails />} />
              <Route path="cart" element={<StudentCart />} />
              <Route
                path="/student/meal/:mealId"
                element={<StudentMealDetails />}
              />
            </Route>
          </Route>

          {/* Rider Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Rider"]} />}>
            <Route path="/rider" element={<MainLayout data={rider} />}>
              <Route path="" element={<Home />} />
              <Route path="dashboard" element={<RiderDashboard />} />
              <Route path="delivery" element={<RiderDelivery />} />
              <Route path="notification" element={<RideerNotification />} />
              <Route path="profile" element={<RiderProfileDetails />} />
              <Route path="current-delivery" element={<RiderCurrentDElivery />}/>
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
