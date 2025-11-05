import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
 
const Cutoff: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "",
    jobTitle: "",
    cutoffYear: "",
    qualification: "Degree",
    cutoffFile: null as File | null,
  });
 
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
      setFormData({ ...formData, cutoffFile: e.target.files[0] });
    }
  };
 
  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cutoff Form Data:", formData);
    alert("Cutoff Submitted Successfully ✅");
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      {/* Glassmorphism Card */}
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
            >
              <option value="Degree">Degree</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Diploma">Diploma</option>
              <option value="Matriculation">Matriculation</option>
            </select>
          </div>
 
          {/* Cutoff Year */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Cutoff Year
            </label>
            <input
              type="text"
              name="cutoffYear"
              value={formData.cutoffYear}
              onChange={handleChange}
              placeholder="Enter cutoff year (e.g., 2024)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-4 focus:ring-pink-300 focus:border-pink-400 outline-none transition-all duration-200"
              required
            />
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
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-pink-300"
            >
              Submit Cutoff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default Cutoff;
 