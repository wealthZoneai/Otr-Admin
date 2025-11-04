import React, { useState } from "react";
import { Calendar, Upload } from "lucide-react";

interface ResultFormData {
  jobCategory: string;
  jobTitle: string;
  releaseDate: string;
  websiteUrl: string;
  file?: File | null;
}

const Result: React.FC = () => {
  const [formData, setFormData] = useState<ResultFormData>({
    jobCategory: "ssc",
    jobTitle: "",
    releaseDate: "",
    websiteUrl: "",
    file: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    console.log("Form Data Submitted:", formData);
    alert("Result submitted successfully!");
  };

  return (
    <div className="w-full flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-6 rounded-xl shadow-md border border-blue-200"
      >
        <div className="mb-4">
          <label className="font-semibold block mb-1">Job Category :</label>
          <select
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          >
            <option value="ssc">SSC</option>
            <option value="upsc">UPSC</option>
            <option value="bank">Bank</option>
            <option value="railway">Railway</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Job Title :</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Released Date :</label>
          <div className="relative">
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none"
            />
            <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Website URL:</label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="Enter URL"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <label
            htmlFor="fileUpload"
            className="bg-pink-500 text-white px-5 py-2 rounded-md shadow-md flex items-center gap-2 cursor-pointer hover:bg-pink-600"
          >
            <Upload size={16} /> Upload
          </label>
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="bg-pink-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Result;
