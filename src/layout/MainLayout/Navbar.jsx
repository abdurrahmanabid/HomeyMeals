import { useEffect, useState } from "react";
import { BiLogInCircle, BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import logo from "./../../assets/imgs/favicon.png";

const Navbar = ({ data }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // Track navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

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
  
  const handleLogout=()=>{
    localStorage.removeItem("user");
  }

  return (
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
                <CgProfile className="text-3xl text-white" />
              </div>
            ) : (
              <BiLogInCircle className="text-3xl text-white hover:scale-105 hover:text-accent3 transition-all" />
            )}
          </button>
          {avatarOpen && (
            <div>
              {data ? (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50"
                onMouseLeave={toggleAvatar}
                >
                  {/* Profile Info */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                    <img
                      src="https://picsum.photos/200/300" // Dummy avatar image
                      alt="Profile Avatar"
                      className="min-w-10 h-10 rounded-full shadow-xl"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">{user.fullName}</p>{" "}
                      {/* Dummy name */}
                      <p className="text-gray-500 text-sm">
                        {user.email}
                      </p>{" "}
                      {/* Dummy email */}
                    </div>
                  </div>

                  {/* Profile and Logout Links */}
                  <Link
                    to={user?.role === "Student" ? "/student/profile" : user?.role==='Consumer'?'/consumer/profile':"/rider/profile"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
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
  );
};

export default Navbar;
