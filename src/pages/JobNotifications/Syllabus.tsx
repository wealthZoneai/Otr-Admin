import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadSyllabus } from "../../services/apiHelpers"; // ✅ import API function
import { toast } from "react-toastify";

const Syllabus: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "",
    jobTitle: "",
    qualification: "",
    syllabusFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, syllabusFile: file }));
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.syllabusFile) {
      toast.error("Please upload a PDF syllabus file!");
      return;
    }

    setLoading(true);
    try {
      const response = await uploadSyllabus({
        jobCategory: formData.jobCategory,
        jobTitle: formData.jobTitle,
        qualifications: formData.qualification,
        file: formData.syllabusFile,
      });


      toast.success("Syllabus uploaded successfully!");
      console.log("Response:", response.data);

      // ✅ Reset form
      setFormData({
        jobCategory: "",
        jobTitle: "",
        qualification: "",
        syllabusFile: null,
      });
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "Failed to upload syllabus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl w-full max-w-xl p-8 transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 tracking-wide">
          📘 Upload Job Syllabus
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
              placeholder="Enter job category"
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

          {/* Qualification */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter qualification"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl py-6 hover:border-pink-500 transition-all cursor-pointer bg-white/50">
            <label className="flex flex-col items-center text-gray-700 cursor-pointer">
              <UploadCloud size={40} className="text-pink-500 mb-2" />
              <span className="font-semibold">Upload Syllabus (PDF)</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                hidden
              />
            </label>
            {formData.syllabusFile && (
              <p className="mt-3 text-sm text-green-700 font-medium">
                ✅ {formData.syllabusFile.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-pink-300 ${loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Uploading..." : "Submit Syllabus"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Syllabus;
