import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import { uploadAnswer } from "../../services/apiHelpers"; // ✅ create this function similar to uploadPQP

const Answer: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "",
    jobTitle: "",
    description: "",
    qualification: "Degree",
    websiteUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid PDF file");
    }
  };

  // ✅ Upload handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload the Answer Key file");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadAnswer({
        jobCategory: formData.jobCategory,
        jobTitle: formData.jobTitle,
        description: formData.description,
        qualifications: formData.qualification,
        websiteUrl: formData.websiteUrl,
        file,
      });

      toast.success("Answer Key uploaded successfully ✅");
      console.log("Server Response:", response.data);
      setFormData({
        jobCategory: "",
        jobTitle: "",
        description: "",
        qualification: "Degree",
        websiteUrl: "",
      });
      setFile(null);
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error("Something went wrong while uploading ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl w-full max-w-xl p-8 transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 tracking-wide">
          📝 Upload Answer Key
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Job Category
            </label>
            <input
              type="text"
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              placeholder="Enter job category (e.g., SSC, UPSC...)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Qualification
            </label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
            >
              <option value="Degree">Degree</option>
              <option value="Diploma">Diploma</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Matriculation">Matriculation</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Website URL
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="Enter official website link"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl py-6 hover:border-pink-500 transition-all cursor-pointer bg-white/40">
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center text-gray-700 cursor-pointer"
            >
              <UploadCloud size={40} className="text-pink-500 mb-2" />
              <span className="font-semibold">
                {file ? file.name : "Upload Answer Key (PDF)"}
              </span>
            </label>
            <input
              id="fileInput"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Buttons */}
          <div className="text-center pt-4 flex justify-center gap-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-8 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-pink-300 disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Answer;
