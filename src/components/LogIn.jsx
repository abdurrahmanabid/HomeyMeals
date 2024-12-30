import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import Cookies from 'js-cookie';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import loginLottie from "../assets/lottie/login.json";
import { BASE_URL } from "../utils/ServerBaseURL";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "auth/login", {
        email: email,
        password: password,
      });

      if (res.status === 200 && res.data.token) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to your dashboard...",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          Cookies.set("token", res.data.token, { expires: 1, path: "/" });
          const role = res.data.role;
          navigate(`/${role}`);
        });
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 403:
            Swal.fire({
              icon: "error",
              title: "Email Not Verified",
              text: "Please verify your email before logging in.",
              confirmButtonText: "OK",
            });
            break;
          case 404:
            Swal.fire({
              icon: "error",
              title: "Email Not Found",
              text: "The email you entered is not registered.",
              confirmButtonText: "Try Again",
            });
            break;
          case 401:
            Swal.fire({
              icon: "error",
              title: "Invalid Credentials",
              text: "Incorrect password. Please try again.",
              confirmButtonText: "Retry",
            });
            break;
          case 500:
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Something went wrong. Please try again later.",
              confirmButtonText: "OK",
            });
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "An unexpected error occurred.",
              confirmButtonText: "OK",
            });
        }
      } else if (err.request) {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Unable to connect to the server. Please check your internet connection.",
          confirmButtonText: "Retry",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleChange = (event) => {
    const { type, value, id } = event.target;

    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:my-20 p-5">
      <div className="flex flex-col md:flex-row justify-center items-center p-5 bg-white shadow-lg border border-t-secondary border-b-secondary rounded-lg">
        <form
          className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Log in to Your Account
          </h2>

          <div>
            <Label htmlFor="email" value="Your email" className="mb-2" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@email.com"
              required
              shadow
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Label htmlFor="password" value="Your password" className="mb-2" />
            <TextInput
              id="password"
              type={passwordVisible ? "text" : "password"}
              required
              shadow
              placeholder="••••••••"
              value={password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-2 mt-6 mr-3 flex items-center text-gray-600 hover:text-gray-900"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-cyan-800 transition duration-200"
          >
            Log in
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?&nbsp;
            <Link to="/register" className="text-cyan-600 hover:underline">
              Register here
            </Link>
            <br/>
            <Link to="/forgot-password" className="text-cyan-600 hover:underline">
            Forgot Password
            </Link>
          </p>
        </form>
        <div className="hidden lg:block">
          <Player
            autoplay
            loop
            src={loginLottie}
            style={{ height: "400px", width: "400px" }}
            className="mb-8 md:mb-0"
          />
        </div>
      </div>
    </div>
  );
}
