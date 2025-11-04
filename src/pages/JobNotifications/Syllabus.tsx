import React, { useState } from "react";
import { Upload } from "lucide-react";

const Syllabus: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "SSC",
    jobTitle: "",
    qualification: "Degree",
    syllabusFile: null as File | null,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, syllabusFile: e.target.files[0] });
    }
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Syllabus Form Data:", formData);
    alert("Syllabus Submitted Successfully ✅");
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-[#f8faff] p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl border border-gray-200 p-8">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Upload Job Syllabus
        </h2>

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Category */}
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700 w-40 text-right">
              Job Category :
            </label>
            <select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="border rounded-lg w-3/5 p-2 focus:ring-2 focus:ring-teal-400 outline-none"
            >
              <option value="SSC">SSC</option>
              <option value="UPSC">UPSC</option>
              <option value="Bank">Bank</option>
              <option value="Railways">Railways</option>
            </select>
          </div>

          {/* Job Title */}
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700 w-40 text-right">
              Job Title :
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter Job Title"
              className="border rounded-lg w-3/5 p-2 focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {/* Qualification */}
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-700 w-40 text-right">
              Qualifications :
            </label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border rounded-lg w-3/5 p-2 focus:ring-2 focus:ring-teal-400 outline-none"
            >
              <option value="Degree">Degree</option>
              <option value="Diploma">Diploma</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Matriculation">Matriculation</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-8 pt-6">
            <label className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold shadow-md transition">
              <Upload size={18} /> Upload Syllabus
              <input type="file" onChange={handleFileChange} hidden />
            </label>

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-10 py-2 rounded-lg shadow-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Syllabus;
