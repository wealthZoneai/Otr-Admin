import React, { useState, type FormEvent } from "react";
import { FileText, List, ClipboardCheck, Award, BarChart } from "lucide-react";
import Syllabus from "./Syllabus";
import PQP from "./PQP";
import Answers from "./Answers";
import Result from "./Result";
import Cutoff from "./NotificationCutOff";
import axios from "axios";
import { CreateJobpost } from "../../services/apiHelpers";
import { toast } from "react-toastify";

interface DynamicField {
  key: string;
  value: string;
}

interface Religion {
  religionName: string;
  seats: string;
}

interface Vacancy {
  postName: string;
  total: string;
  age: string;
  religions: Religion[];
}

interface LongJobFormData {
  jobCategory: string;
  jobTitle: string;
  totalVacancy: string;
  description: string;
  postDate: string;
  lastDate: string;
  qualification: string;
  gender: string;
  fee: string;
  importantDates: string;
  interviewDates: string;
  ageLimit: string;
  additionalDetails: string;
  examCenters: string;
  livePhotoRequired: boolean;
  signatureRequired: boolean;
  declarationRequired: boolean;
  image?: File | null;
}

const JobNotification: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const tabs = [
    { name: "Syllabus", icon: FileText },
    { name: "PQP", icon: List },
    { name: "Answer Key", icon: ClipboardCheck },
    { name: "Results", icon: Award },
    { name: "Cut-off", icon: BarChart },
  ];

  // --- Form States ---
  const [longForm, setLongForm] = useState<LongJobFormData>({
    jobCategory: "",
    jobTitle: "",
    totalVacancy: "",
    description: "",
    postDate: "",
    lastDate: "",
    qualification: "",
    gender: "",
    fee: "",
    importantDates: "",
    interviewDates: "",
    ageLimit: "",
    additionalDetails: "",
    examCenters: "",
    livePhotoRequired: false,
    signatureRequired: false,
    declarationRequired: false,
  });

  const [states, setStates] = useState<string[]>([]);
  const [country, setCountry] = useState<string>("");

  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([
    { key: "", value: "" },
  ]);

  const [vacancies, setVacancies] = useState<Vacancy[]>([
    { postName: "", total: "", age: "", religions: [{ religionName: "", seats: "" }] },
  ]);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setLongForm({ ...longForm, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLongForm({ ...longForm, [e.target.name]: e.target.checked });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLongForm({ ...longForm, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else setPreviewUrl(null);
  };

  const addDynamicField = () =>
    setDynamicFields([...dynamicFields, { key: "", value: "" }]);
  const handleDynamicFieldChange = (i: number, field: "key" | "value", val: string) => {
    const updated = [...dynamicFields];
    updated[i][field] = val;
    setDynamicFields(updated);
  };
  const removeDynamicField = (i: number) =>
    setDynamicFields(dynamicFields.filter((_, index) => index !== i));

  const addVacancy = () =>
    setVacancies([
      ...vacancies,
      { postName: "", total: "", age: "", religions: [{ religionName: "", seats: "" }] },
    ]);
  const removeVacancy = (i: number) =>
    setVacancies(vacancies.filter((_, index) => index !== i));

  const handleVacancyChange = (i: number, field: keyof Vacancy, val: string) => {
    const updated = [...vacancies];
    if (field === "religions") return;
    updated[i][field] = val as any;
    setVacancies(updated);
  };

  const addReligion = (vi: number) => {
    const updated = [...vacancies];
    updated[vi].religions.push({ religionName: "", seats: "" });
    setVacancies(updated);
  };
  const removeReligion = (vi: number, ri: number) => {
    const updated = [...vacancies];
    updated[vi].religions.splice(ri, 1);
    setVacancies(updated);
  };
  const handleReligionChange = (
    vi: number,
    ri: number,
    field: keyof Religion,
    val: string
  ) => {
    const updated = [...vacancies];
    updated[vi].religions[ri][field] = val;
    setVacancies(updated);
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // Append job form fields
    Object.entries(longForm).forEach(([k, v]) => {
      if (k === "image" && v instanceof File) {
        formData.append("uploadFile", v);
      } else if (typeof v === "boolean") {
        formData.append(k, v ? "true" : "false");
      } else if (v !== undefined && v !== null) {
        formData.append(k, String(v));
      }
    });

    // Append states & country
    states.forEach((s) => formData.append("states", s));
    formData.append("country", country);

    // Append dynamic fields as JSON
    const dynamicObj: Record<string, string> = {};
    dynamicFields.forEach(({ key, value }) => {
      if (key.trim()) dynamicObj[key] = value;
    });
    formData.append("dynamicFields", JSON.stringify(dynamicObj));

    // Append vacancies & religions
    vacancies.forEach((v) => {
      formData.append("postName", v.postName);
      formData.append("total", v.total);
      formData.append("age", v.age);
      formData.append("religionName", JSON.stringify(v.religions.map((r) => r.religionName)));
      formData.append("seats", JSON.stringify(v.religions.map((r) => r.seats)));
    });

    try {
      const response = await CreateJobpost(formData);
      toast.success("Job Created Successfully!")
      console.log("✅ Response:", response);
    } catch (error: any) {
      toast.error('Submit error')
      console.error("❌ Submit error:", error.response?.data || error);
    }

  };

  // Sub Tabs rendering
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

  // Render Form UI (kept same new design)
  const renderLongForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Notifications</h2>

      {/* Text fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(longForm) as (keyof LongJobFormData)[])
          .filter(
            (key) =>
              key !== "image" &&
              !["livePhotoRequired", "signatureRequired", "declarationRequired"].includes(key)
          )
          .map((key) => (
            <div key={key}>
              <label className="font-semibold text-sm mb-1 block capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={key.toLowerCase().includes("date") ? "date" : "text"}
                name={key}
                value={longForm[key] as string}
                onChange={handleChange}
                className="border px-3 py-2 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-4 py-2 border-t pt-4">
        {["livePhotoRequired", "signatureRequired", "declarationRequired"].map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={key}
              checked={longForm[key as keyof LongJobFormData] as boolean}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          </label>
        ))}
      </div>

      {/* Country & States */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2">Job Locations</h3>
        <input
          placeholder="Country"
          className="border px-3 py-2 rounded-lg w-full mb-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          placeholder="States (comma separated)"
          className="border px-3 py-2 rounded-lg w-full"
          value={states.join(", ")}
          onChange={(e) =>
            setStates(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            )
          }
        />
      </div>

      {/* Dynamic Fields */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2">Dynamic Fields (Optional)</h3>
        {dynamicFields.map(({ key, value }, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Key"
              value={key}
              onChange={(e) => handleDynamicFieldChange(i, "key", e.target.value)}
              className="border px-3 py-2 flex-1 rounded-lg"
            />
            <input
              placeholder="Value"
              value={value}
              onChange={(e) => handleDynamicFieldChange(i, "value", e.target.value)}
              className="border px-3 py-2 flex-1 rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeDynamicField(i)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDynamicField}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Field
        </button>
      </div>

      {/* Vacancy Section */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-3">Vacancy Details</h3>
        {vacancies.map((v, vi) => (
          <div key={vi} className="border p-4 rounded-lg mb-4 bg-white">
            <input
              placeholder="Post Name"
              value={v.postName}
              onChange={(e) => handleVacancyChange(vi, "postName", e.target.value)}
              className="border px-3 py-2 rounded-lg w-full mb-2"
            />
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="number"
                placeholder="Total"
                value={v.total}
                onChange={(e) => handleVacancyChange(vi, "total", e.target.value)}
                className="border px-3 py-2 rounded-lg w-full"
              />
              <input
                type="number"
                placeholder="Age Limit"
                value={v.age}
                onChange={(e) => handleVacancyChange(vi, "age", e.target.value)}
                className="border px-3 py-2 rounded-lg w-full"
              />
            </div>
            {v.religions.map((r, ri) => (
              <div key={ri} className="flex gap-2 mb-2">
                <input
                  placeholder="Religion"
                  value={r.religionName}
                  onChange={(e) => handleReligionChange(vi, ri, "religionName", e.target.value)}
                  className="border px-3 py-2 flex-1 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Seats"
                  value={r.seats}
                  onChange={(e) => handleReligionChange(vi, ri, "seats", e.target.value)}
                  className="border px-3 py-2 w-24 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeReligion(vi, ri)}
                  className="bg-red-500 text-white px-2 rounded-lg"
                >
                  -
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addReligion(vi)}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg"
              >
                + Add Religion
              </button>
              <button
                type="button"
                onClick={() => removeVacancy(vi)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Remove Post
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addVacancy}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Post
        </button>
      </div>

      {/* Upload File */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <label className="font-semibold block mb-1">Upload Notification PDF/Image</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleImageChange}
          className="border px-3 py-2 w-full rounded-lg"
        />
        {previewUrl && (
          <p className="text-green-600 text-sm mt-1">File selected: {longForm.image?.name}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg w-full font-bold"
      >
        Submit Job Notification
      </button>
    </form>
  );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="mx-auto max-w-7xl bg-white shadow-xl sm:p-10 p-4">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Job Notification Management
        </h1>

        <nav className="flex flex-wrap justify-center gap-3 bg-gray-100 rounded-2xl p-3 mb-6">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveSubTab((prev) => (prev === name ? null : name))}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${activeSubTab === name
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-indigo-100 text-gray-700 border"
                }`}
            >
              <Icon size={18} /> {name}
            </button>
          ))}
        </nav>

        {!activeSubTab ? (
          <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-lg">
            {renderLongForm()}
          </div>
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
