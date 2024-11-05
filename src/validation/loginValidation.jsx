import * as Yup from "yup";
 export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  });