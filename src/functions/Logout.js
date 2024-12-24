import Cookies from "js-cookie";

const Logout = () => {
  Cookies.remove("token");
  window.location.reload()
};

export default Logout;
