import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Cookies from 'js-cookie';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginLottie from "../assets/lottie/login.json";
import { BASE_URL } from "../utils/ServerBaseURL";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Hello", {
      email,
      password,
      agreeToTerms,
    });
    try {
      const res = await axios.post(BASE_URL + "auth/login", {
        email: email,
        password: password,
      });

      // Handle successful login
      if (res.status === 200 && res.data.token) {

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to your dashboard...",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          Cookies.set("token", res.data.token, { expires: 1, path: "" });
          const role = res.data.role;
          navigate(`/${role}`);

          console.log("🚀 ~ handleSubmit ~ role:", role)
        });
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        switch (err.response.status) {
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
        // No response received
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Unable to connect to the server. Please check your internet connection.",
          confirmButtonText: "Retry",
        });
      } else {
        // Error setting up the request
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
    const { type, checked, value, id } = event.target;

    if (id === "agree") {
      setAgreeToTerms(checked);
    } else if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:my-20 p-5">
      {/* Lottie Animation */}
      <div className="flex flex-col md:flex-row justify-center items-center p-5 bg-white shadow-lg border border-t-secondary border-b-secondary rounded-lg">
        {/* Login Form */}
        <form
          className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl"
          onSubmit={handleSubmit}
        >
          {/* Welcome Message */}
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

          <div>
            <Label htmlFor="password" value="Your password" className="mb-2" />
            <TextInput
              id="password"
              type="password"
              required
              shadow
              placeholder="••••••••"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="agree"
              checked={agreeToTerms}
              onChange={handleChange}
            />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                to="/terms"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
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
