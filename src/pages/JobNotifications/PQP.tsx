import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadPQP } from "../../services/apiHelpers";
import { toast } from "react-toastify";

const PQP: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "",
    jobTitle: "",
    language: "",
    qualification: "Degree",
    pqpYear: "",
    pqpFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, pqpFile: e.target.files[0] });
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.pqpFile) {
      toast.error("Please upload a PQP PDF file!");
      return;
    }

    setLoading(true);
    try {
      const response = await uploadPQP({
        jobCategory: formData.jobCategory,
        jobTitle: formData.jobTitle,
        languages: formData.language,
        qualifications: formData.qualification,
        pqp: formData.pqpYear,
        file: formData.pqpFile,
      });

      toast.success("PQP uploaded successfully!");
      console.log("Response:", response.data);

      // Reset form
      setFormData({
        jobCategory: "",
        jobTitle: "",
        language: "",
        qualification: "Degree",
        pqpYear: "",
        pqpFile: null,
      });
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "Failed to upload PQP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl w-full max-w-xl p-8 transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 tracking-wide">
          📘 Upload PQP Paper
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

          {/* Language */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
            </select>
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            >
              <option value="Degree">Degree</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Diploma">Diploma</option>
              <option value="Matriculation">Matriculation</option>
            </select>
          </div>

          {/* PQP Year */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              PQP Year
            </label>
            <input
              type="text"
              name="pqpYear"
              value={formData.pqpYear}
              onChange={handleChange}
              placeholder="Enter PQP Year (e.g., 2024)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl py-6 hover:border-pink-500 transition-all cursor-pointer bg-white/40">
            <label className="flex flex-col items-center text-gray-700 cursor-pointer">
              <UploadCloud size={40} className="text-pink-500 mb-2" />
              <span className="font-semibold">Upload PQP (PDF)</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                hidden
              />
            </label>
            {formData.pqpFile && (
              <p className="mt-3 text-sm text-green-700 font-medium">
                ✅ {formData.pqpFile.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-pink-300 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Uploading..." : "Submit PQP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PQP;
