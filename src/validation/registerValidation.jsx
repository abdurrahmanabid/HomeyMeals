import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  phone: Yup.string()
    .matches(/^\+88 \d{11}$/, "Invalid phone number format")
    .required("Phone number is required"),
  role: Yup.string().required("Please select a role"),
  agree: Yup.bool().oneOf([true], "You must agree to the terms and conditions"),
});
