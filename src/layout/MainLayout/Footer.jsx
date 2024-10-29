import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-300 py-10">
      <div className="container mx-auto px-4">
        {/* Top section: Links and Branding */}
        <div className="flex flex-wrap justify-between items-start">
          {/* Branding */}
          <div className="w-full md:w-1/3 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">HomeyMeals</h2>
            <p className="text-gray-400">
              Delivering homemade meals to students, while supporting local
              households.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-accent3">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-accent3">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-accent3">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-accent3">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent3">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent3">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent3">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent3">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Bottom section: Copyright */}
        <div className="text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} HomeyMeals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer