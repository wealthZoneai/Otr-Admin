import endpoints from "./endpoints";
import server from "./index";


export function loginUser({ email, password }: ILoginUserBody) {
  const body = { email, password };
  return server.post(endpoints.login, body, { requiresAuth: false });
}


// syllabus
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

// PQP

export function uploadPQP({
  jobCategory,
  jobTitle,
  languages,
  qualifications,
  pqp,
  file,
}: {
  jobCategory: string;
  jobTitle: string;
  languages: string;
  qualifications: string;
  pqp: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("jobCategory", jobCategory);
  formData.append("jobTitle", jobTitle);
  formData.append("languages", languages);
  formData.append("qualifications", qualifications);
  formData.append("pqp", pqp);
  formData.append("file", file);

  return server.post(endpoints.uploadPQP, formData, { requiresAuth: false });
}


// Answers 

export function uploadAnswer({
  jobCategory,
  jobTitle,
  description,
  qualifications,
  websiteUrl,
  file,
}: {
  jobCategory: string;
  jobTitle: string;
  description: string;
  qualifications: string;
  websiteUrl: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("jobCategory", jobCategory);
  formData.append("jobTitle", jobTitle);
  formData.append("description", description);
  formData.append("qualifications", qualifications);
  formData.append("websiteUrl", websiteUrl);
  formData.append("file", file);

  return server.post(endpoints.uploadAnswer, formData, {
    requiresAuth: false,
  });
}

// Results

export function uploadResult({
  jobCategory,
  jobTitle,
  releasedDate,
  websiteUrl,
  file,
}: {
  jobCategory: string;
  jobTitle: string;
  releasedDate: string;
  websiteUrl: string;
  file: File;
}) {
  const formData = new FormData();
  formData.append("jobCategory", jobCategory);
  formData.append("jobTitle", jobTitle);
  formData.append("releasedDate", releasedDate);
  formData.append("websiteUrl", websiteUrl);
  formData.append("file", file);

  return server.post(endpoints.uploadResult, formData, {
   
    requiresAuth: false,
  });
}


// cutOff

export function uploadCutoff({
  jobCategory,
  jobTitle,
  releasedDate,
  file,
}: UploadCutoffBody) {
  const formData = new FormData();
  formData.append("jobCategory", jobCategory);
  formData.append("jobTitle", jobTitle);
  formData.append("releasedDate", releasedDate);
  formData.append("file", file);

  return server.post(endpoints.uploadCutoff, formData, { requiresAuth: false });
}

// 

export async function CreateJobpost(formData: FormData) {
  try {
    const response = await server.post(endpoints.createJobpost, formData, {
      requiresAuth: false,
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ CreateJobpost error:", error.response?.data || error);
    throw error;
  }
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

export async function uploadAdmitCard({
  jobCategoryId,
}: {
  jobCategoryId: number;
 
}) {
  try {

    return server.post(endpoints.adminCard, jobCategoryId, { requiresAuth: false })

  } catch (error: any) {
    console.error("❌ Error uploading Admit Card:", error);
    throw error;
  }
}


// ✅ Get all categories
export function GetCategories() {
  return server.get("/api/category/getAll", { requiresAuth: false });
}

// ✅ Get all questions by category
export function GetQuestions(category: string) {
  return server.get(`/api/questions?category=${category}`, { requiresAuth: false });
}

// ✅ Upload PDF and extract questions
export function UploadQuestionPDF(formData: FormData) {
  return server.post("/api/questions/upload-pdf", formData, {
    requiresAuth: false,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// ✅ Add a single question manually
export function CreateQuestionPaper(data: any) {
  return server.post(endpoints.createQuestionpapers, data, { requiresAuth: false });
}

// ✅ Delete a specific question
export function DeleteQuestion(id: string) {
  return server.delete(`/api/questions/${id}`, { requiresAuth: false });
}

// ✅ Grade all submissions (optional, for admin)
export function GradeSubmissions() {
  return server.post("/api/questions/grade-all", {}, { requiresAuth: false });
}
