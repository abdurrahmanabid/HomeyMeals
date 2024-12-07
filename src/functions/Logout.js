import Cookies from "js-cookie";

const Logout = () => {
  Cookies.remove("token");
};

export default Logout;
