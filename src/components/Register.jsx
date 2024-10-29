import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerLottie from "../assets/lottie/registration.json";

export function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    role: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("User registered:", user);
    localStorage.setItem("user",JSON.stringify(user));
    if(user.role==='Student'){
      navigate("/student");
    }else if(user.role==='Seller'){
      navigate("/seller");
    }else{
      navigate("/rider");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:my-20 p-5">
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
          onSubmit={handleRegister}
          className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl"
        >
          {/* Welcome Message */}
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Create Your Account
          </h2>

          <div>
            <Label htmlFor="fullName" value="Full Name" className="mb-2" />
            <TextInput
              id="fullName"
              type="text"
              placeholder="Your full name"
              required
              shadow
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="email" value="Your email" className="mb-2" />
            <TextInput
              id="email"
              type="email"
              placeholder="name@email.com"
              required
              shadow
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
              onChange={handleChange}
            />
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
              required
              shadow
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="phone" value="Phone Number" className="mb-2" />
            <TextInput
              id="phone"
              type="number"
              required
              shadow
              placeholder="+88 01787765129"
              onChange={handleChange}
            />
          </div>

          <div className="max-w-md">
            <Label htmlFor="role" value="Select your role" className="mb-2" />
            <Select id="role" required onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Seller">Seller</option>
              <option value="Rider">Rider</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="agree" onChange={handleChange} />
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
