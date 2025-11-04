import React, { useState } from "react";
import {  Upload } from "lucide-react";
import Syllabus from "./Syllabus";
import PQP from "./PQP";
import Answers from "./Answers";
import Result from "./Result";
import Cutoff from "./NotificationCutOff";

// -------------------------------
// ✅ Types
// -------------------------------
interface JobFormData {
  jobCategory: string;
  jobTitle: string;
  totalVacancy: string;
  description: string;
  postDate: string;
  lastDate: string;
  qualification: string;
  image?: File | null;
}

interface LongJobFormData extends JobFormData {
  religion?: string;
  gender?: string;
  fee?: string;
  importantDate?: string;
  interviewDate?: string;
  ageLimit?: string;
  vacancyDetails?: string;
}

// -------------------------------
// ✅ Main Component
// -------------------------------
const JobNotification: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<"short" | "long">("short");
  const [activeSubTab, setActiveSubTab] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const tabs = ["Syllabus", "PQP", "Answer Key", "Results", "Cut-off"];

  // Short Form State
  const [shortForm, setShortForm] = useState<JobFormData>({
    jobCategory: "",
    jobTitle: "",
    totalVacancy: "",
    description: "",
    postDate: "",
    lastDate: "",
    qualification: "",
    image: null,
  });

  // Long Form State
  const [longForm, setLongForm] = useState<LongJobFormData>({
    jobCategory: "",
    jobTitle: "",
    totalVacancy: "",
    description: "",
    postDate: "",
    lastDate: "",
    qualification: "",
    religion: "",
    gender: "",
    fee: "",
    importantDate: "",
    interviewDate: "",
    ageLimit: "",
    vacancyDetails: "",
    image: null,
  });

  // -------------------------------
  // ✅ Handlers
  // -------------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    formType: "short" | "long"
  ) => {
    if (formType === "short") {
      setShortForm({ ...shortForm, [e.target.name]: e.target.value });
    } else {
      setLongForm({ ...longForm, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formType: "short" | "long"
  ) => {
    const file = e.target.files?.[0] || null;
    if (formType === "short") setShortForm({ ...shortForm, image: file });
    else setLongForm({ ...longForm, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent, formType: "short" | "long") => {
    e.preventDefault();
    if (formType === "short") {
      console.log("Short Job Notification Submitted:", shortForm);
    } else {
      console.log("Long Job Notification Submitted:", longForm);
    }
    alert(`${formType === "short" ? "Short" : "Long"} Job Notification submitted successfully!`);
  };

  // -------------------------------
  // ✅ Sub Tab Rendering
  // -------------------------------
  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "Syllabus":
        return <Syllabus />;
      case "PQP":
        return <PQP />;
      case "Answer Key":
        return <Answers />;
      case "Results":
        return <Result />;
      case "Cut-off":
        return <Cutoff />;
      default:
        return null;
    }
  };

  // -------------------------------
  // ✅ Form Layouts
  // -------------------------------
  const renderShortForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "short")} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Job Category :</label>
        <input
          type="text"
          name="jobCategory"
          value={shortForm.jobCategory}
          onChange={(e) => handleChange(e, "short")}
          placeholder="Enter Job Category"
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Job Title :</label>
        <input
          type="text"
          name="jobTitle"
          value={shortForm.jobTitle}
          onChange={(e) => handleChange(e, "short")}
          placeholder="Enter Job Title"
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Total Vacancy :</label>
        <input
          type="number"
          name="totalVacancy"
          value={shortForm.totalVacancy}
          onChange={(e) => handleChange(e, "short")}
          placeholder="Enter Total Vacancy"
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Description :</label>
        <textarea
          name="description"
          value={shortForm.description}
          onChange={(e) => handleChange(e, "short")}
          placeholder="Enter Job Description"
          rows={3}
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Post Date :</label>
        <input
          type="date"
          name="postDate"
          value={shortForm.postDate}
          onChange={(e) => handleChange(e, "short")}
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Last Date :</label>
        <input
          type="date"
          name="lastDate"
          value={shortForm.lastDate}
          onChange={(e) => handleChange(e, "short")}
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Qualification :</label>
        <input
          type="text"
          name="qualification"
          value={shortForm.qualification}
          onChange={(e) => handleChange(e, "short")}
          placeholder="Enter Qualification"
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Upload Image :</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "short")}
          className="border rounded-md p-2"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          <Upload size={18} /> Upload
        </button>
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600"
        >
          Submit
        </button>
      </div>
    </form>
  );

  const renderLongForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "long")} className="space-y-3">
      {/* Basic Fields */}
      {[
        "jobCategory",
        "jobTitle",
        "totalVacancy",
        "description",
        "postDate",
        "lastDate",
        "qualification",
        "religion",
        "gender",
        "fee",
        "importantDate",
        "interviewDate",
        "ageLimit",
        "vacancyDetails",
      ].map((field) => (
        <div className="flex flex-col" key={field}>
          <label className="font-semibold mb-1 capitalize">
            {field.replace(/([A-Z])/g, " $1")} :
          </label>
          <input
            type={field.includes("Date") ? "date" : "text"}
            name={field}
            value={(longForm as any)[field]}
            onChange={(e) => handleChange(e, "long")}
            placeholder={`Enter ${field}`}
            className="border rounded-md p-2"
          />
        </div>
      ))}

      {/* Upload */}
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Upload PDF :</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleImageChange(e, "long")}
          className="border rounded-md p-2"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          <Upload size={18} /> Upload PDF
        </button>
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600"
        >
          Submit
        </button>
      </div>
    </form>
  );

  // -------------------------------
  // ✅ Render Main Layout
  // -------------------------------
  return (
    <div className="flex flex-col items-center w-full mt-5 px-2 sm:px-4">
     

      {/* Sub Tabs */}
      <nav className="flex justify-center items-center gap-3 bg-white rounded-xl shadow-md border border-gray-200 px-3 py-3 w-full max-w-5xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab((prev) => (prev === tab ? "" : tab))}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeSubTab === tab
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-teal-400 hover:bg-teal-500 text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Conditional Content */}
       {/* Main Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveMainTab("short")}
          className={`px-6 py-2 rounded-md font-semibold shadow-sm ${
            activeMainTab === "short"
              ? "bg-blue-100 border-b-4 border-blue-500 text-blue-700"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Short Job Notifications
        </button>

        <button
          onClick={() => setActiveMainTab("long")}
          className={`px-6 py-2 rounded-md font-semibold shadow-sm ${
            activeMainTab === "long"
              ? "bg-blue-100 border-b-4 border-blue-500 text-blue-700"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Long Job Notifications
        </button>
      </div>
      {activeSubTab ? (
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-6">
          {renderSubTabContent()}
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 w-full">
          {activeMainTab === "short" ? renderShortForm() : renderLongForm()}
        </div>
      )}
    </div>
  );
};

export default JobNotification;
