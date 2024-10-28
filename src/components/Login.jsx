import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import loginLottie from "../assets/lottie/logIn.json";

export function Login() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:my-20 p-5">
      {/* Lottie Animation */}
      <div className="flex flex-col md:flex-row justify-center items-center p-5 bg-white shadow-lg border border-t-secondary border-b-secondary rounded-lg">
        {/* Registration Form */}
        <form className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl">
          {/* Welcome Message */}
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Log-In
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

          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                to="/terms-and-conditions"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-secondary transition duration-200"
          >
            Log in
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?&nbsp;
            <Link to="/register" className="text-cyan-600 hover:underline">
              Log in here
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
