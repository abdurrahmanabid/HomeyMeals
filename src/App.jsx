
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from './components/LogIn';
import ProductDetail from './components/ProductDetails';
import { Register } from './components/Register';
import MainLayout from './layout/MainLayout/MainLayouts';
import SellerLayout from './layout/SellerLayout/SellerLayout';
import AllMenus from './pages/AllMenus';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { TermsAndConditions } from './pages/TermsAndConditions';
function App() {
  return (
    <Router>
      <div className="App">
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

          <Route path="/seller" element={<SellerLayout />}>
            <Route path="allMenu" element={<ProductDetail />} />
            <Route path="home" element={<Home />} />
          </Route>

          <Route path="/student" element={<SellerLayout />}>
            <Route path="allMenu" element={<ProductDetail />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
