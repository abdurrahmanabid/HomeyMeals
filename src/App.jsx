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
import AboutUs from "./pages/AboutUs";
import AddCategory from "./pages/Admin/AddCategory";
import AllItems from "./pages/Admin/AllItems";
import AllUser from "./pages/Admin/AllUser";
import AssignRider from "./pages/Admin/AssignRider";
import CategoryList from "./pages/Admin/CategoryList";
import Dashboard from "./pages/Admin/Dashboard";
import ItemTable from "./pages/Admin/ItemTable";
import PendingOrderDetails from "./pages/Admin/PendingOrderDetail";
import UserTable from "./pages/Admin/UserTable";
import UserDetails from "./pages/Admin/userDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import RiderCurrentDElivery from "./pages/rider/RiderCurrentDelivery";
import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderDelivery from "./pages/rider/RiderDelivery";
import RiderProfileDetails from "./pages/rider/RiderProfileDetails";
import AddItem from "./pages/seller/AddItem";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerItems from "./pages/seller/SellerItems";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerProfileDetails from "./pages/seller/SellerProfileDetails";
import CashMemo from "./pages/student/CashMemo";
import MeAsARider from "./pages/student/MeAsARider";
import StudentCart from "./pages/student/StudentCart";
import StudentCheckout from "./pages/student/StudentCheckout";
import StudentMenu from "./pages/student/StudentMenu";
import StudentProfileDetails from "./pages/student/StudentProfileDetails";
import StudentMealDetails from "./pages/student/StudentsMealDetails";
import StudentOrder from "./pages/student/StudentsOrder";
import { admin, consumer, rider, seller } from "./store/navbarObject";
import useAuth from "./utils/useAuth";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const user = useAuth()
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<StudentMenu />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="meal/:mealId" element={<StudentMealDetails />} />
            <Route path="about-us" element={<AboutUs />} />
          </Route>

          {/* Seller Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Seller"]} />}>
            <Route path="/seller" element={<MainLayout data={seller} />}>
              <Route path="menu" element={<StudentMenu />} />
              <Route path="meal/:mealId" element={<StudentMealDetails />} />
              <Route path="" element={<Home />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="order" element={<SellerOrders />} />
              <Route path="addItem" element={<AddItem />} />
              <Route path="profile" element={<SellerProfileDetails />} />
              <Route path="my-items" element={<SellerItems />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="notification" element={<Notification />} />
            </Route>
          </Route>

          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
            <Route path="/student" element={<MainLayout data={consumer} />}>
              <Route path="meal/:mealId" element={<StudentMealDetails />} />
              <Route path="" element={<Home />} />
              <Route path="allMenu" element={<ProductDetail />} />
              <Route path="checkout" element={<StudentCheckout />} />
              <Route path="cash-memo" element={<CashMemo />} />
              <Route path="me-as-a-rider/:orderId" element={<MeAsARider />} />
              <Route
                path="current-delivery/:orderId"
                element={<RiderCurrentDElivery />}
              />
              <Route path="order" element={<StudentOrder />} />
              <Route path="menu" element={<StudentMenu />} />
              <Route path="profile" element={<StudentProfileDetails />} />
              <Route path="cart" element={<StudentCart />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="notification" element={<Notification />} />
            </Route>
          </Route>

          {/* Rider Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Rider"]} />}>
            <Route path="/rider" element={<MainLayout data={rider} />}>
              <Route path="menu" element={<StudentMenu />} />
              <Route path="" element={<Home />} />
              <Route path="dashboard" element={<RiderDashboard />} />
              <Route path="delivery" element={<RiderDelivery />} />
              <Route path="notification" element={<Notification />} />
              <Route path="meal/:mealId" element={<StudentMealDetails />} />
              <Route path="profile" element={<RiderProfileDetails />} />
              <Route
                path="current-delivery/:orderId"
                element={<RiderCurrentDElivery />}
              />
              <Route path="about-us" element={<AboutUs />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<MainLayout data={admin} />}>
              <Route path="" element={<Dashboard />} />
              <Route path="all-user" element={<AllUser />} />
              <Route path="user-table/:role" element={<UserTable />} />
              <Route path="user-details/:id" element={<UserDetails />} />
              <Route path="all-items" element={<AllItems />} />
              <Route path="item-table/:category" element={<ItemTable />} />
              <Route path="category" element={<CategoryList />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="assign-rider" element={<AssignRider />} />
              <Route
                path="assign-rider/:id"
                element={<PendingOrderDetails />}
              />
              <Route path="profile" element={<SellerProfileDetails />} />
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
