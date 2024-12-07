import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const useAuth = () => {
  const token = Cookies.get("token");
  if (token) return jwtDecode(token);
  return null;
};

export default useAuth;
