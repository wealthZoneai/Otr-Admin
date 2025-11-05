import React, { useState } from "react";
import { Calendar, UploadCloud } from "lucide-react";
 
interface ResultFormData {
  jobCategory: string;
  jobTitle: string;
  releaseDate: string;
  websiteUrl: string;
  file?: File | null;
}
 
const Result: React.FC = () => {
  const [formData, setFormData] = useState<ResultFormData>({
    jobCategory: "",
    jobTitle: "",
    releaseDate: "",
    websiteUrl: "",
    file: null,
  });
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Result Form Data:", formData);
    alert("Result Submitted Successfully ✅");
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl w-full max-w-xl p-8 transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 tracking-wide">
          🧾 Upload Result
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
 
          {/* Released Date */}
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
 
          {/* Upload Section */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-xl py-6 hover:border-pink-500 transition-all cursor-pointer bg-white/40">
            <label className="flex flex-col items-center text-gray-700 cursor-pointer">
              <UploadCloud size={40} className="text-pink-500 mb-2" />
              <span className="font-semibold">Upload Result File (PDF)</span>
              <input
                id="fileUpload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                hidden
              />
            </label>
            {formData.file && (
              <p className="mt-3 text-sm text-green-700 font-medium">
                ✅ {formData.file.name}
              </p>
            )}
          </div>
 
          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold px-10 py-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-pink-300"
            >
              Submit Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default Result;