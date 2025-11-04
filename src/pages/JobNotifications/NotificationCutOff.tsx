import React, { useState } from "react";
import { Upload } from "lucide-react";

interface CutoffFormData {
  jobCategory: string;
  jobTitle: string;
  releasedDate: string;
  pdfFile: File | null;
}

const Cutoff: React.FC = () => {
  const [formData, setFormData] = useState<CutoffFormData>({
    jobCategory: "",
    jobTitle: "",
    releasedDate: "",
    pdfFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, pdfFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Job Category :
          </label>
          <select
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            <option value="ssc">SSC</option>
            <option value="upsc">UPSC</option>
            <option value="railway">Railway</option>
          </select>
        </div>

        {/* Job Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Job Title :
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Released Date */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Released Date :
          </label>
          <input
            type="date"
            name="releasedDate"
            value={formData.releasedDate}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-3">
          <label className="flex items-center justify-center gap-2 bg-pink-500 text-white font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-pink-600 transition">
            <Upload size={18} />
            Upload PDF
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-pink-500 text-white font-medium py-2 px-6 rounded-md hover:bg-pink-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cutoff;
