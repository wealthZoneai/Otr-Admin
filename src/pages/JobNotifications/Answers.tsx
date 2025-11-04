import React, { useState } from "react";

const Answer: React.FC = () => {
  const [formData, setFormData] = useState({
    jobCategory: "SSC",
    jobTitle: "",
    description: "",
    qualification: "",
    websiteUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    alert("Upload button clicked!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] md:w-[420px] bg-white p-6 rounded-2xl shadow-md border border-blue-200"
      >
        <div className="space-y-4">
          {/* Job Category */}
          <div>
            <label className="font-semibold text-gray-800">Job Category :</label>
            <select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100 focus:outline-none"
            >
              <option value="SSC">SSC</option>
              <option value="UPSC">UPSC</option>
              <option value="Bank">Bank</option>
              <option value="Railway">Railway</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Job Title */}
          <div>
            <label className="font-semibold text-gray-800">Job Title :</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Enter Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-800">Description :</label>
            <textarea
              name="description"
              placeholder="Enter Job Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="font-semibold text-gray-800">Qualifications :</label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-100 focus:outline-none"
            >
              <option value="">Degree</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Diploma">Diploma</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
          </div>

          {/* Website URL */}
          <div>
            <label className="font-semibold text-gray-800">Website URL :</label>
            <input
              type="url"
              name="websiteUrl"
              placeholder="Enter URL"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 pt-4">
            <button
              type="button"
              onClick={handleUpload}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md font-semibold shadow-md"
            >
              Upload
            </button>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md font-semibold shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Answer;
