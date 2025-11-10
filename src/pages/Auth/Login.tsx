import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import signupIllustration from "../../assets/signup-vector-img.png";
import { loginUser } from "../../services/apiHelpers";
import { setUserData } from "../../store/slice/userData";


interface LoginFormValues {
  email: string;
  password: string;
  role: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "", role: "Admin" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        });

        if (response?.data?.jwtToken) {
          localStorage.setItem("token", response.data.jwtToken);

          dispatch(
            setUserData({
              token: response.data.jwtToken,
              userId: response.data.userId,
              userName: response.data.userName,
            })
          );

          toast.success("Login successful!");
          navigate("/dashboard/home");
        } else {
          toast.error("Login failed. Token not received.");
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen grid md:grid-cols-2 rounded-3xl overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center px-8 md:px-20 bg-gradient-to-b from-sky-100 to-yellow-200 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">SIGN IN</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Role Select */}
          <div className="w-48 mb-6 relative">
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full appearance-none px-3 py-2 pr-10 border border-gray-300 rounded-md bg-[#010E3A] text-white text-center cursor-pointer"
            >
              <option value="Admin">Admin</option>
              <option value="Government Admin">Government Admin</option>
            </select>

            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none" />

            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm mt-1 text-center">
                {formik.errors.role}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="w-80 mb-2">
            <input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="relative w-80 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Forgot Password */}
          <div className="w-80 text-right mb-4">
            <a href="#" className="text-sm text-pink-600 font-medium hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-80 py-2 text-white font-medium rounded-lg transition ${
              formik.isSubmitting
                ? "bg-[#12C298]/70"
                : "bg-[#12C298] hover:bg-[#0fa57f]"
            }`}
          >
            {formik.isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign Up */}
          <p className="mt-4 text-sm text-gray-700">
            Don’t have an Account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-pink-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex justify-center items-center bg-gradient-to-b from-yellow-300 to-sky-100 h-screen">
        <img
          src={signupIllustration}
          alt="Login Illustration"
          className="max-h-screen object-contain"
        />
      </div>
    </div>
  );
};

export default LoginPage;
