import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaLock,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupIllustration from "../../assets/signup-vector-img.png";

// ✅ Replace these imports with your actual API helpers
import {
  registerUser,
  sendEmailOtpApi,
  verifyEmailOtpApi,
  sendMobileOtpApi,
  verifyMobileOtpApi,
} from "../../services/apiHelpers";

interface SignUpFormValues {
  username: string,
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
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedMobileOtp, setGeneratedMobileOtp] = useState<string | null>(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    agreement: Yup.boolean().oneOf([true], "You must agree to continue"),
  });

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      username: "",
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
    onSubmit: async (values) => {
      if (!emailVerified || !mobileVerified) {
        toast.warn("Please verify your Email and Mobile before signing up!");
        return;
      }
      try {
        setLoading(true);
        const res = await registerUser(values);
        if (res?.status === 200) {
          toast.success("Registered successfully!");
          navigate("/", { state: { email: values.email } });
        } else {
          toast.error(res?.data?.message || "Signup failed");
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Error during signup");
      } finally {
        setLoading(false);
      }
    },
  });

  // ===== EMAIL OTP =====
  const handleSendEmailOtp = async () => {
    if (!formik.values.email) return toast.warn("Enter email first!");
    try {
      setLoading(true);
      const res = await sendEmailOtpApi({ email: formik.values.email });
      if (res?.status === 200) {
        setEmailOtpSent(true);
        toast.success("Email OTP sent!");
      }
    } catch {
      toast.error("Failed to send Email OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!formik.values.emailOtp) return toast.warn("Enter Email OTP!");
    try {
      setLoading(true);
      const res = await verifyEmailOtpApi({
        email: formik.values.email,
        otp: formik.values.emailOtp,
      });
      if (res?.status === 200) {
        setEmailVerified(true);
        toast.success("Email verified successfully!");
      } else toast.error("Invalid Email OTP");
    } catch {
      toast.error("Failed to verify Email OTP");
    } finally {
      setLoading(false);
    }
  };

  // ===== MOBILE OTP =====
  const handleSendMobileOtp = async () => {
    if (!formik.values.mobile) return toast.warn("Enter mobile number first!");
    try {
      setLoading(true);
      const res = await sendMobileOtpApi({ mobile: formik.values.mobile });

      if (res?.status === 200) {
        setMobileOtpSent(true);

        // ✅ Extract OTP number from message like "Your mobile OTP is: 511860"
        const message = res?.data || "";
        const match = message.match(/\d{4,6}/); // extracts any 4–6 digit number
        if (match) {
          setGeneratedMobileOtp(match[0]);
          toast.success(`OTP sent successfully! (OTP: ${match[0]})`);
        } else {
          toast.success("OTP sent successfully!");
        }
      } else {
        toast.error(res?.data?.message || "Failed to send OTP");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send Mobile OTP");
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyMobileOtp = async () => {
    if (!formik.values.mobileOtp) return toast.warn("Enter Mobile OTP!");
    try {
      setLoading(true);
      const res = await verifyMobileOtpApi({
        mobile: formik.values.mobile,
        otp: formik.values.mobileOtp,
      });

      if (res?.data?.message === 'MOBILE OTP verified successfully!') {
        setMobileVerified(true);
        toast.success("Mobi verified successfully!");
      } else {
        toast.error(res?.data?.message || "Invalid Mobile OTP");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to verify Mobile OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid md:grid-cols-2 overflow-hidden rounded-3xl">
      {/* LEFT SECTION */}
      <div className="flex flex-col bg-gradient-to-b from-sky-100 to-yellow-200 px-8 md:px-20">
        <div className="pt-6 text-center">
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
                <option value="Government Admin">Government Admin</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm" />
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-4 pb-6 overflow-y-auto">
          {/* NAME */}
          <div className="w-80 relative">
            <FaUser className="absolute left-3 top-3 text-gray-600" />
            <input
              type="text"
              placeholder="Enter Your Name"
              {...formik.getFieldProps("name")}
              className="w-full h-12 pl-10 pr-3 border border-gray-400 rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* EMAIL */}
          <div className="w-80 relative flex">
            <FaEnvelope className="absolute left-3 top-3 text-gray-600" />
            <input
              type="email"
              placeholder="Enter Your Email"
              {...formik.getFieldProps("email")}
              className="w-full h-12 pl-10 pr-[6rem] border border-gray-400 rounded-md"
              disabled={emailVerified}
            />
            <button
              type="button"
              onClick={handleSendEmailOtp}
              className={`absolute right-0 top-0 bottom-0 text-white text-sm px-3 rounded-r-md ${emailVerified ? "bg-green-600" : "bg-[#010E3A]"
                }`}
            >
              {emailVerified ? "Verified" : emailOtpSent ? "Resend" : "Send OTP"}
            </button>
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}

          {/* EMAIL OTP */}
          {emailOtpSent && !emailVerified && (
            <div className="w-80 relative flex">
              <input
                type="text"
                placeholder="Enter Email OTP"
                {...formik.getFieldProps("emailOtp")}
                className="w-full h-12 pr-[6rem] pl-3 border border-gray-400 rounded-md"
              />
              <button
                type="button"
                onClick={handleVerifyEmailOtp}
                className="absolute right-0 top-0 bottom-0 bg-[#010E3A] text-white text-sm px-6 rounded-r-md"
              >
                Verify
              </button>
            </div>
          )}

          {/* MOBILE */}
          <div className="w-80 relative flex">
            <FaPhoneAlt className="absolute left-3 top-3 text-gray-600" />
            <input
              type="text"
              placeholder="Enter Mobile Number"
              {...formik.getFieldProps("mobile")}
              className="w-full h-12 pl-10 pr-[6rem] border border-gray-400 rounded-md"
              disabled={mobileVerified}
            />
            <button
              type="button"
              onClick={handleSendMobileOtp}
              className={`absolute right-0 top-0 bottom-0 text-white text-sm px-3 rounded-r-md ${mobileVerified ? "bg-green-600" : "bg-[#010E3A]"
                }`}
            >
              {mobileVerified ? "Verified" : mobileOtpSent ? "Resend" : "Send OTP"}
            </button>
          </div>
          {formik.touched.mobile && formik.errors.mobile && (
            <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
          )}

          {/* MOBILE OTP */}
          {mobileOtpSent && !mobileVerified && (
            <div className="w-80 relative flex flex-col gap-1">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Enter Mobile OTP"
                  {...formik.getFieldProps("mobileOtp")}
                  className="w-full h-12 pr-[6rem] pl-3 border border-gray-400 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleVerifyMobileOtp}
                  className="absolute right-0 top-0 bottom-0 bg-[#010E3A] text-white text-sm px-6 rounded-r-md"
                >
                  Verify
                </button>
              </div>

              {/* ✅ Show OTP from backend for testing */}
              {generatedMobileOtp && (
                <p className="text-xs text-gray-600 text-center">
                  Your OTP is <span className="font-semibold text-green-700">{generatedMobileOtp}</span>.
                  Please enter this code and click on the Verify button to confirm your mobile number.
                </p>

              )}
            </div>
          )}



          {/* PASSWORD */}
          <div className="w-80 relative">
            <FaLock className="absolute left-3 top-3 text-gray-600" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              {...formik.getFieldProps("password")}
              className="w-full h-12 pl-10 pr-10 border border-gray-400 rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="w-80 relative">
            <FaLock className="absolute left-3 top-3 text-gray-600" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full h-12 pl-10 pr-10 border border-gray-400 rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* AGREEMENT */}
          <div className="flex items-center w-80 text-left">
            <input
              type="checkbox"
              {...formik.getFieldProps("agreement")}
              className="mr-2 accent-[#12C298] scale-125 cursor-pointer"
            />
            <label className="text-sm text-gray-700">
              I Agree To The <span className="font-medium">User Agreement</span> And{" "}
              <span className="font-medium">Privacy Policy</span>
            </label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-80 py-2 bg-[#12C298] hover:bg-[#0fa57f] text-white font-medium rounded-lg transition"
          >
            {loading ? "Processing..." : "Sign Up"}
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
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:flex justify-center items-center bg-gradient-to-b from-yellow-300 to-sky-100 h-screen">
        <img src={signupIllustration} alt="Sign Up" className="max-h-screen object-contain" />
      </div>
    </div>
  );
};

export default SignUpPage;
