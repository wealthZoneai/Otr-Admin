import React, { useState } from "react";
import { Calendar, UploadCloud } from "lucide-react";
import { toast } from "react-toastify"; // ✅ For notifications
import { uploadCutoff } from "../../services/apiHelpers";

const Cutoff: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "",
    jobTitle: "",
    releaseDate: "",
    qualification: "Degree",
    cutoffFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cutoffFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cutoffFile) {
      toast.error("Please upload a PDF file 📄");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadCutoff({
        jobCategory: formData.jobCategory,
        jobTitle: formData.jobTitle,
        releasedDate: formData.releaseDate,
        file: formData.cutoffFile,
      });

      toast.success("Cutoff uploaded successfully ✅");
      console.log("Server Response:", response.data);

      // Reset form
      setFormData({
        jobCategory: "",
        jobTitle: "",
        releaseDate: "",
        qualification: "Degree",
        cutoffFile: null,
      });
    } catch (error: any) {
      console.error("Upload Error:", error);
      toast.error(
        `Upload failed ❌ ${
          error.response?.data?.message || error.message || "Server error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl w-full max-w-xl p-8 transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 tracking-wide">
          🎯 Upload Cutoff Details
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

          {/* Release Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Released Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
                required
              />
              <Calendar
                size={20}
                className="absolute right-3 top-2.5 text-gray-400"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl py-6 hover:border-pink-500 transition-all cursor-pointer bg-white/40">
            <label className="flex flex-col items-center text-gray-700 cursor-pointer">
              <UploadCloud size={40} className="text-pink-500 mb-2" />
              <span className="font-semibold">Upload Cutoff (PDF)</span>
              <input type="file" accept=".pdf" onChange={handleFileChange} hidden />
            </label>
            {formData.cutoffFile && (
              <p className="mt-3 text-sm text-green-700 font-medium">
                ✅ {formData.cutoffFile.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-pink-300"
              }`}
            >
              {loading ? "Uploading..." : "Submit Cutoff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cutoff;
