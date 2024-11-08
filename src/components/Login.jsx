import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import loginLottie from "../assets/lottie/login.json";
import { loginValidationSchema } from "../validation/loginValidation";

export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      agreeToTerms: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:my-20 p-5 bg-accent5">
      {/* Lottie Animation */}
      <div className="flex flex-col md:flex-row justify-center items-center p-5 bg-white shadow-lg border border-t-secondary border-b-secondary rounded-lg">
        {/* Login Form */}
        <form
          className="flex flex-col gap-4 w-96 max-w-md lg:border rounded-lg lg:p-6 lg:shadow-xl"
          onSubmit={formik.handleSubmit}
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
              shadow
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
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
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="agreeToTerms"
              checked={formik.values.agreeToTerms}
              onChange={formik.handleChange}
            />
            <Label htmlFor="agreeToTerms" className="flex">
              I agree with the&nbsp;
              <Link
                to="/terms"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
            <div className="text-red-500 text-sm">
              {formik.errors.agreeToTerms}
            </div>
          ) : null}

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
