import { useState } from "react";
import {
  FaUserCircle
} from "react-icons/fa";
import logo from './../assets/imgs/favicon.png';

const Navbar = ({data}) => {
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const [avatarOpen, setAvatarOpen] = useState(false); // For avatar dropdown
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleAvatar = () => {
    setAvatarOpen(!avatarOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-3 items-center"><img src={logo} alt="logo" height={50} width={50}/>
        <h1 className="text-2xl font-bold text-primary">HomeyMeals</h1>
        </div>


        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6">
          {data.map((item,index)=>(<a
            href={item.path}
            key={index}
            className="text-secondary hover:text-primary transition"
          >
            {item.name}
          </a>))}

        </div>

        {/* Avatar Section (Dropdown on Click) */}
        <div className="relative">
          <button
            onClick={toggleAvatar}
            className="flex items-center space-x-2"
          >
            <FaUserCircle className="text-3xl text-primary" />
            <span className="text-primary">Seller</span>
          </button>

          {/* Avatar Dropdown Menu */}
          {avatarOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
              <a
                href="/seller/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/seller/logout"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-secondary focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links (when menu is open) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <a
            href="/seller/dashboard"
            className="block text-secondary hover:text-primary py-2 transition"
          >
            Dashboard
          </a>
          <a
            href="/seller/orders"
            className="block text-secondary hover:text-primary py-2 transition"
          >
            Orders
          </a>
          <a
            href="/seller/menu"
            className="block text-secondary hover:text-primary py-2 transition"
          >
            Menu
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;