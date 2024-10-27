import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import registerLottie from "../assets/lottie/registration.json";

export function Register() {
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
        /></div>

        {/* Registration Form */}
        <form className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl">
          {/* Welcome Message */}
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Create Your Account
          </h2>

          <div>
            <Label htmlFor="email2" value="Your email" className="mb-2" />
            <TextInput
              id="email2"
              type="email"
              placeholder="name@email.com"
              required
              shadow
            />
          </div>

          <div>
            <Label htmlFor="password2" value="Your password" className="mb-2" />
            <TextInput
              id="password2"
              type="password"
              required
              shadow
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label
              htmlFor="repeat-password"
              value="Repeat password"
              className="mb-2"
            />
            <TextInput
              id="repeat-password"
              type="password"
              required
              shadow
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label
              htmlFor="phone number"
              value="Phone Number"
              className="mb-2"
            />
            <TextInput
              id="phone-number"
              type="number"
              required
              shadow
              placeholder="+88 01787765129"
            />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Select your role" />
            </div>
            <Select id="role" required>
              <option>Student</option>
              <option>Seller</option>
              <option>Rider</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
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
