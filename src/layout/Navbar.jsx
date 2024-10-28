import { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from './../assets/imgs/favicon.png';

const Navbar = () => {
  const [avatarOpen, setAvatarOpen] = useState(false); // For avatar dropdown
  const toggleAvatar = () => setAvatarOpen(!avatarOpen);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-3 items-center">
          <img src={logo} alt="logo" height={50} width={50} />
          <h1 className="text-2xl font-bold text-primary">HomeyMeals</h1>
        </div>

        {/* Avatar Section */}
        <div className="relative">
          <button
            onMouseEnter={toggleAvatar}
            className="flex items-center space-x-2"
          >
            <BiLogInCircle className="text-3xl text-primary" />
          </button>
          {avatarOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50"
              onMouseLeave={toggleAvatar}
            >
              <Link
              to={'./login'}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Log-in
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
