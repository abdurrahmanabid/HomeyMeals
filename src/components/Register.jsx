import { Player } from "@lottiefiles/react-lottie-player";
import axios from 'axios';
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import registerLottie from "../assets/lottie/registration.json";
import { BASE_URL } from "../utils/ServerBaseURL";
import { registerValidationSchema } from './../validation/registerValidation';

export function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
      role: "",
      agree: false,
    },
    validationSchema:registerValidationSchema,
    onSubmit: async(values) => {
      try {
        // Show loading indicator
        Swal.fire({
          title: "Registering...",
          text: "Please wait while we process your registration",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Make registration request
        const res = await axios.post(`${BASE_URL}auth/register`, {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phone: values.phone,
          role: values.role,
        });

        // Close loading indicator
        Swal.close();

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: `Welcome, ${values.fullName}!`,
          confirmButtonText: "Continue",
        });

        // Set token in cookies
        Cookies.set("token", res.data.token, { expires: 1, path: "" });

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(values));

        // Navigate based on role
        switch (values.role) {
          case "Student":
            navigate("/student");
            break;
          case "Seller":
            navigate("/seller");
            break;
          case "Rider":
            navigate("/rider");
            break;
          default:
            navigate("/dashboard");
        }
      } catch (err) {
        // Handle registration errors
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            err.response?.data?.message ||
            "An error occurred during registration. Please try again.",
          confirmButtonText: "Try Again",
        });

        // Log the error for debugging
        console.error("Registration error:", err);
      }
      },
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:my-20 p-5 bg-accent5">
      {/* Lottie Animation */}
      <div className="flex flex-col md:flex-row justify-center items-center p-5 bg-white shadow-lg border border-t-secondary border-b-secondary rounded-lg">
        <div className="hidden lg:block">
          <Player
            autoplay
            loop
            src={registerLottie}
            style={{ height: "400px", width: "400px" }}
            className="mb-8 md:mb-0"
          />
        </div>

        {/* Registration Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Create Your Account
          </h2>

          <div>
            <Label htmlFor="fullName" value="Full Name" className="mb-2" />
            <TextInput
              id="fullName"
              type="text"
              placeholder="Your full name"
              
              shadow
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" value="Your email" className="mb-2" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@email.com"
              
              shadow
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" value="Your password" className="mb-2" />
            <TextInput
              id="password"
              type="password"
              
              shadow
              placeholder="••••••••"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="repassword"
              value="Repeat password"
              className="mb-2"
            />
            <TextInput
              id="repassword"
              type="password"
              
              shadow
              placeholder="••••••••"
              {...formik.getFieldProps("repassword")}
            />
            {formik.touched.repassword && formik.errors.repassword && (
              <p className="text-red-500 text-sm">{formik.errors.repassword}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" value="Phone Number" className="mb-2" />
            <TextInput
              id="phone"
              type="text"
              
              shadow
              placeholder="+88 01787765129"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          <div className="max-w-md">
            <Label htmlFor="role" value="Select your role" className="mb-2" />
            <Select id="role"  {...formik.getFieldProps("role")}>
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Seller">Seller</option>
              <option value="Rider">Rider</option>
            </Select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-500 text-sm">{formik.errors.role}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="agree" {...formik.getFieldProps("agree")} />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                to="/terms"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
            {formik.touched.agree && formik.errors.agree && (
              <p className="text-red-500 text-sm">{formik.errors.agree}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-cyan-800 transition duration-200"
          >
            Register new account
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?&nbsp;
            <Link to="/login" className="text-cyan-600 hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
