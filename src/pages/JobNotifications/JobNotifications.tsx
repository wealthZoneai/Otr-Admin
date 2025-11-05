import React, { useState } from "react";
import { Upload, FileText, List, ClipboardCheck, Award, BarChart } from "lucide-react";
import Syllabus from "./Syllabus";
import PQP from "./PQP";
import Answers from "./Answers";
import Result from "./Result";
import Cutoff from "./NotificationCutOff";

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

const JobNotification: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<"short" | "long">("short");
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const tabs = [
    { name: "Syllabus", icon: FileText },
    { name: "PQP", icon: List },
    { name: "Answer Key", icon: ClipboardCheck },
    { name: "Results", icon: Award },
    { name: "Cut-off", icon: BarChart },
  ];

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    formType: "short" | "long"
  ) => {
    if (formType === "short")
      setShortForm({ ...shortForm, [e.target.name]: e.target.value });
    else setLongForm({ ...longForm, [e.target.name]: e.target.value });
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
    } else setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent, formType: "short" | "long") => {
    e.preventDefault();
    alert(`${formType === "short" ? "Short" : "Long"} Job Notification submitted successfully!`);
  };

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

  const renderInput = (
    label: string,
    name: string,
    value: any,
    onChange: (e: any) => void,
    type: string = "text"
  ) => (
    <div className="flex flex-col">
      <label className="font-semibold mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
      />
    </div>
  );

  const renderShortForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "short")} className="space-y-4">
      {renderInput("Job Category", "jobCategory", shortForm.jobCategory, (e) => handleChange(e, "short"))}
      {renderInput("Job Title", "jobTitle", shortForm.jobTitle, (e) => handleChange(e, "short"))}
      {renderInput("Total Vacancy", "totalVacancy", shortForm.totalVacancy, (e) => handleChange(e, "short"), "number")}
      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-700">Description</label>
        <textarea
          name="description"
          value={shortForm.description}
          onChange={(e) => handleChange(e, "short")}
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>
      {renderInput("Post Date", "postDate", shortForm.postDate, (e) => handleChange(e, "short"), "date")}
      {renderInput("Last Date", "lastDate", shortForm.lastDate, (e) => handleChange(e, "short"), "date")}
      {renderInput("Qualification", "qualification", shortForm.qualification, (e) => handleChange(e, "short"))}

      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "short")}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-md"
          />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
        >
          <Upload size={18} /> Upload
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </div>
    </form>
  );

  const renderLongForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "long")} className="space-y-3">
      {Object.keys(longForm).map((key) =>
        key !== "image" ? (
          renderInput(
            key.replace(/([A-Z])/g, " $1"),
            key,
            (longForm as any)[key],
            (e) => handleChange(e, "long"),
            key.includes("Date") ? "date" : "text"
          )
        ) : null
      )}

      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-700">Upload PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleImageChange(e, "long")}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
        >
          <Upload size={18} /> Upload PDF
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className=" w-full bg-gradient-to-br from-gray-50 to-gray-200">
      <div className=" mx-auto bg-white  shadow-xl sm:p-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Job Notification Management
        </h1>

        {/* Sub Tabs */}
        <nav className="flex flex-wrap justify-center gap-3 bg-gray-100 rounded-2xl shadow-inner p-3 mb-6">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveSubTab((prev) => (prev === name ? null : name))}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                activeSubTab === name
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white hover:bg-indigo-100 text-gray-700"
              }`}
            >
              <Icon size={18} /> {name}
            </button>
          ))}
        </nav>

        {/* Conditional Rendering */}
        {!activeSubTab ? (
          <>
            {/* Main Tabs */}
            <div className="flex justify-center gap-4 mb-6">
              {["short", "long"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveMainTab(type as "short" | "long")}
                  className={`px-6 py-2 rounded-full font-semibold shadow-sm ${
                    activeMainTab === type
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 hover:bg-indigo-100 text-gray-700"
                  }`}
                >
                  {type === "short" ? "Short Notifications" : "Long Notifications"}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
              {activeMainTab === "short" ? renderShortForm() : renderLongForm()}
            </div>
          </>
        ) : (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl shadow-inner p-6">
            {renderSubTabContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobNotification;
