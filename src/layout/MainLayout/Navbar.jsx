import axios from "axios";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLogInCircle, BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../../functions/Logout";
import useAuth from "../../utils/useAuth";
import logo from "./../../assets/imgs/favicon.png";

const Navbar = ({ data }) => {
  const user = useAuth();
  const navigate = useNavigate();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // Track navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const defaultPP =
    "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png";

  const toggleAvatar = () => setAvatarOpen(!avatarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getProfileDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/profile/get/${user.id}`
      );
      console.log("🚀 ~ getProfileDetails ~ data:", data.profile);
      setProfileDetails(data.profile);
    } catch (error) {
      console.error("Failed to fetch details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleLogout = () => {
    Logout();
  };
  return (
    <>
      <div className="pt-[80px]"></div>
      <nav
        className={`fixed top-0 left-0 w-full bg-primary py-4 shadow-xl z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to={user ? `/${user?.role}` : "/"}
            className="flex gap-3 items-center hover:scale-105 hover:text-accent3 transition-all"
          >
            <img src={logo} alt="logo" height={50} width={50} />
            <h1 className="text-2xl font-bold text-white">HomeyMeals</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {data &&
              data.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white font-bold hover:scale-105 hover:text-accent3 transition-all"
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
                <div className="flex justify-center text-white items-center gap-3 hover:scale-105 hover:text-accent3 transition-all">
                  <h1>{user.fullName}</h1>
                  {profileDetails?.profilePicture ? (
                    <img
                      src={profileDetails?.profilePicture || defaultPP} // Profile Image
                      alt="Profile Avatar"
                      className="w-10 h-10 rounded-full shadow"
                    />
                  ) : (
                    <CgProfile className="text-3xl text-white" />
                  )}
                </div>
              ) : (
                <BiLogInCircle className="text-3xl text-white hover:scale-105 hover:text-accent3 transition-all" />
              )}
            </button>
            {avatarOpen && (
              <div className="relative">
                {data ? (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50 transition ease-in-out duration-300"
                    onMouseLeave={toggleAvatar}
                  >
                    {/* User Profile Section */}
                    <div className="p-4 border-b border-gray-200 flex items-center gap-4">
                      <img
                        src={profileDetails?.profilePicture || defaultPP}
                        alt="Profile Avatar"
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-bold truncate">
                          {user.fullName}
                        </p>
                        <p className="text-gray-500 text-sm truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Profile and Logout Links */}
                    <Link
                      to={
                        user?.role === "Student"
                          ? "/student/profile"
                          : user?.role === "Seller"
                          ? "/Seller/profile"
                          : "/rider/profile"
                      }
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-500" />
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-5 h-5 text-gray-500" />
                        Logout
                      </div>
                    </button>
                  </div>
                ) : (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50 transition ease-in-out duration-300"
                    onMouseLeave={toggleAvatar}
                  >
                    {/* Log-in and Registration Links */}
                    <Link
                      to="./login"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <LogIn className="w-5 h-5 text-gray-500" />
                        Log-in
                      </div>
                    </Link>
                    <Link
                      to="/register"
                      className="block px-5 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-gray-500" />
                        Registration
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-white"
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
    </>
  );
};

export default Navbar;
