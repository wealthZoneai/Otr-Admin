import endpoints from "./endpoints";
import server from "./index";


export function loginUser({ email, password }: ILoginUserBody) {
  const body = { email, password };
  return server.post(endpoints.login, body, { requiresAuth: false });
}

export function uploadSyllabus({
  jobCategory,
  jobTitle,
  qualifications,
  file,
}: {
  jobCategory: string;
  jobTitle: string;
  qualifications: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("jobCategory", jobCategory);
  formData.append("jobTitle", jobTitle);
  formData.append("qualifications", qualifications);
  formData.append("file", file);

  return server.post(endpoints.Syllabus, formData, {
    requiresAuth: false,
  });

}

// ✅ REGISTER USER
export function registerUser({
  username,
  email,
  emailOtp,
  mobile,
  mobileOtp,
  password,
  confirmPassword,
}: RegisterUserBody) {
  const body = {
    username,
    email,
    emailOtp,
    mobile,
    mobileOtp,
    password,
    confirmPassword,
  };
  return server.post(endpoints.register, body, { requiresAuth: false });
}

// ✅ SEND EMAIL OTP
export function sendEmailOtpApi({ email }: SendEmailOtpBody) {
  const body = { email };
  return server.post(endpoints.sendEmailOtp, body, { requiresAuth: false });
}

// ✅ VERIFY EMAIL OTP
export function verifyEmailOtpApi({ email, otp }: VerifyEmailOtpBody) {
  const body = { email, otp };
  return server.post(endpoints.verifyEmailOtp, body, { requiresAuth: false });
}

// ✅ SEND MOBILE OTP
export function sendMobileOtpApi({ mobile }: SendMobileOtpBody) {
  const body = { mobile };
  return server.post(endpoints.sendMobileOtp, body, { requiresAuth: false });
}

// ✅ VERIFY MOBILE OTP
export function verifyMobileOtpApi({ mobile, otp }: VerifyMobileOtpBody) {
  const body = { mobile, otp };
  return server.post(endpoints.verifyMobileOtp, body, { requiresAuth: false })
}
