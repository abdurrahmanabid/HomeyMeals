import { useState } from "react";
import { BiLogInCircle, BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from "./../../assets/imgs/favicon.png";

const Navbar = ({ data }) => {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For mobile menu toggle

  const toggleAvatar = () => setAvatarOpen(!avatarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-3 items-center">
          <img src={logo} alt="logo" height={50} width={50} />
          <h1 className="text-2xl font-bold text-primary">HomeyMeals</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {data &&
            data.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-700 hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* Avatar Section */}
        <div className="relative hidden md:flex items-center">
          <button
            onMouseEnter={toggleAvatar}
            className="flex items-center space-x-2"
          >
            {data ? (
              <div className="flex justify-center items-center gap-3">
                <h1>User Name</h1>
                <CgProfile className="text-3xl text-primary" />
              </div>
            ) : (
              <BiLogInCircle className="text-3xl text-primary" />
            )}
          </button>
          {avatarOpen && (
            <div>
              {data ? (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  {/* Profile Info */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                    <img
                      src="https://picsum.photos/200/300" // Dummy avatar image
                      alt="Profile Avatar"
                      className="w-10 h-10 rounded-full shadow-xl"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">John Doe</p>{" "}
                      {/* Dummy name */}
                      <p className="text-gray-500 text-sm">
                        johndoe@example.com
                      </p>{" "}
                      {/* Dummy email */}
                    </div>
                  </div>

                  {/* Profile and Logout Links */}
                  <Link
                    to={"./#"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50"
                  onMouseLeave={toggleAvatar}
                >
                  <Link
                    to={"./login"}
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
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-primary"
          onClick={toggleMobileMenu}
        >
          <BiMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col space-y-2 py-2 px-4">
            {data &&
              data.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-gray-700 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              ))}
            {/* Avatar Section in Mobile Menu */}
            {!data && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log-in
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registration
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
