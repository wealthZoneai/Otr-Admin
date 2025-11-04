import React, { useState } from "react";
import { Upload } from "lucide-react";

interface PQPFormData {
  jobCategory: string;
  jobTitle: string;
  language: string;
  qualification: string;
  pqpYear: string;
  pdfFile: File | null;
}

const PQP: React.FC = () => {
  const [formData, setFormData] = useState<PQPFormData>({
    jobCategory: "",
    jobTitle: "",
    language: "",
    qualification: "",
    pqpYear: "",
    pdfFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, pdfFile: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("PQP details submitted successfully!");
  };

  return (
    <div className="flex justify-center mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 w-full max-w-md"
      >
        {/* Job Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Category :</label>
          <input
            type="text"
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            placeholder="Enter Job Category"
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Title :</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter Job Title"
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Languages */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Languages :</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Qualification */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Qualifications :</label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Qualification</option>
            <option value="10th">10th</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Degree">Degree</option>
            <option value="PG">PG</option>
          </select>
        </div>

        {/* PQP Year */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">PQP :</label>
          <input
            type="text"
            name="pqpYear"
            value={formData.pqpYear}
            onChange={handleChange}
            placeholder="Enter Year"
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <label className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition">
            <Upload className="w-4 h-4" />
            Upload PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PQP;
