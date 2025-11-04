import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaLock, FaChevronDown
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import signupIllustration from "../../assets/signup-vector-img.png";

interface SignUpFormValues {
  name: string;
  email: string;
  emailOtp: string;
  mobile: string;
  mobileOtp: string;
  password: string;
  confirmPassword: string;
  state: string;
  role: string;
  agreement: boolean;
}

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .min(10, "Enter valid mobile number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    state: Yup.string().required("State is required"),
    agreement: Yup.boolean().oneOf([true], "You must agree to continue"),
  });

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      emailOtp: "",
      mobile: "",
      mobileOtp: "",
      password: "",
      confirmPassword: "",
      state: "",
      role: "Admin",
      agreement: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Sign Up Data:", values);
      alert("Signed Up Successfully!");
    },
  });

  return (
    <div className="h-screen grid md:grid-cols-2 rounded-3xl overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col bg-gradient-to-b from-sky-100 to-yellow-200 px-8 md:px-20 relative">
        {/* Top Header Section */}
        <div className="pt-6 text-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">SIGN UP</h2>
          <div className="flex justify-center mb-4">
            <div className="relative w-48">
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="w-full appearance-none px-3 py-2 pr-10 border border-gray-300 rounded-md bg-[#010E3A] text-white text-center cursor-pointer"
              >
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
              </select>

              {/* React Icon — Chevron Down */}
              <FaChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Input Section */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 overflow-y-auto no-scrollbar"
        >
          <div className="flex flex-col items-center space-y-4 pb-6 h-[390px] overflow-y-auto no-scrollbar">
            {/* Name */}
            <div className="w-80 relative">
              <FaUser className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Enter Your Name"
                {...formik.getFieldProps("name")}
                className="w-full h-12 pl-10 pr-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Email */}
            <div className="w-80 relative flex">
              <FaEnvelope className="absolute left-3 top-3 text-gray-600" />
              <input
                type="email"
                placeholder="Enter Your Email"
                {...formik.getFieldProps("email")}
                className="w-full h-12 pl-10 pr-[5.5rem] border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-[#010E3A] text-white text-sm px-3 rounded-r-md"
              >
                Send OTP
              </button>
            </div>

            {/* Email OTP */}
            <div className="w-80 relative flex">
              <input
                type="text"
                placeholder="Enter Your Email OTP"
                {...formik.getFieldProps("emailOtp")}
                className="w-full h-12 pr-[5.5rem] pl-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-[#010E3A] text-white text-sm px-3 rounded-r-md"
              >
                Verify
              </button>
            </div>

            {/* Mobile */}
            <div className="w-80 relative flex">
              <FaPhoneAlt className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Enter Your Mobile Number"
                {...formik.getFieldProps("mobile")}
                className="w-full h-12 pl-10 pr-[5.5rem] border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-[#010E3A] text-white text-sm px-3 rounded-r-md"
              >
                Send OTP
              </button>
            </div>

            {/* Mobile OTP */}
            <div className="w-80 relative flex">
              <input
                type="text"
                placeholder="Enter Your Mobile OTP"
                {...formik.getFieldProps("mobileOtp")}
                className="w-full h-12 pr-[5.5rem] pl-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-[#010E3A] text-white text-sm px-3 rounded-r-md"
              >
                Verify
              </button>
            </div>

            {/* Password */}
            <div className="w-80 relative">
              <FaLock className="absolute left-3 top-3 text-gray-600" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Your Password"
                {...formik.getFieldProps("password")}
                className="w-full h-12 pl-10 pr-10 border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="w-80 relative">
              <FaLock className="absolute left-3 top-3 text-gray-600" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Your Password"
                {...formik.getFieldProps("confirmPassword")}
                className="w-full h-12 pl-10 pr-10 border border-gray-400 rounded-md focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* State */}
            {/* <div className="w-80">
              <label className="block text-left font-medium text-gray-700 mb-1">
                Select State:
              </label>

              <div className="relative">
                <select
                  {...formik.getFieldProps("state")}
                  className="w-full h-12 appearance-none px-3 pr-10 border border-gray-400 rounded-md bg-white text-gray-800 cursor-pointer focus:ring-2 focus:ring-teal-400"
                >
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Karnataka">Karnataka</option>
                </select>

                <FaChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-sm"
                />
              </div>
            </div> */}

            {/* Agreement */}
            <div className="flex items-center w-80 text-left">
              <input
                type="checkbox"
                {...formik.getFieldProps("agreement")}
                className="mr-2 accent-[#12C298] scale-125 cursor-pointer"
              />
              <label className="text-sm text-gray-700">
                I Agree To The{" "}
                <span className="font-medium">User Agreement</span> And{" "}
                <span className="font-medium">Privacy Policy</span>
              </label>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex-shrink-0 py-4 flex flex-col items-center space-y-2">
            <button
              type="submit"
              className="w-80 py-2 bg-[#12C298] hover:bg-[#0fa57f] text-white font-medium rounded-lg transition"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-700">
              Already have an Account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-pink-600 font-medium hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex justify-center items-center bg-gradient-to-b from-yellow-300 to-sky-100 h-screen">
        <img
          src={signupIllustration}
          alt="Sign Up Illustration"
          className="max-h-screen object-contain"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
