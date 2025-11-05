// 📁 src/api/services.ts
import endpoints from "./endpoints";
import server from "./index";

// ✅ login API
export function loginUser({ email, password }: ILoginUserBody) {
  const body = { email, password };
  return server.post(endpoints.login, body, { requiresAuth: false });
}

// ✅ syllabus upload API
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
  formData.append("qualification", qualifications);
  formData.append("file", file);

  return server.post(endpoints.Syllabus, formData, {
    requiresAuth: false,
  });
}
