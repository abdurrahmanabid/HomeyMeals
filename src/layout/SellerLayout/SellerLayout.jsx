import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";


const links = [ 
  { to: "/homeyMeals/seller/home",        label: "Home",        icon: <FaHome /> },
  { to: "/homeyMeals/seller/dashboard",   label: "Dashboard",   icon: < MdDashboard/> },
  { to: "/homeyMeals/seller/allMenu",     label: "All Menu",    icon: <MdRestaurantMenu /> },
  { to: "/homeyMeals/seller/orders",      label: "Orders",      icon: <FaChartLine /> },
  { to: "/logout",                        label: "Logout",      icon: <FaSignOutAlt /> },
];

export default function SellerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-cyan-800 text-white ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className={`${isSidebarOpen ? "text-lg font-semibold" : "hidden"}`}>Seller Dashboard</h2>
          <button className="text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
        </div>
        <nav className="mt-4">
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="flex items-center p-3 hover:bg-cyan-700">
              {link.icon}
              {isSidebarOpen && <span className="ml-3">{link.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-60 ">
        

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
