import React, { useState, type FormEvent } from "react";
import { FileText, List, ClipboardCheck, Award, BarChart, X, Plus } from "lucide-react";
import { toast } from "react-toastify";
import Syllabus from "./Syllabus";
import PQP from "./PQP";
import Answers from "./Answers";
import Result from "./Result";
import Cutoff from "./NotificationCutOff";
import { CreateJobpost } from "../../services/apiHelpers"; // Assuming CreateJobpost accepts FormData

// --- INTERFACES ---

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

// --- REQUIRED AND TYPE DEFINITIONS ---

// Define which fields must be present and which must be numeric
const REQUIRED_TEXT_FIELDS: (keyof LongJobFormData)[] = [
  "jobCategory", "jobTitle", "description", "postDate", "lastDate", "qualification",
  "gender", "fee", "ageLimit", "examCenters"
];

const NUMERIC_FIELDS: (keyof LongJobFormData)[] = ["totalVacancy", "fee", "ageLimit"];

// --- JOB NOTIFICATION COMPONENT ---

const JobNotification: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  // --- General Change Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change

    if (type === 'checkbox') {
      setLongForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setLongForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLongForm({ ...longForm, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else setPreviewUrl(null);
  };

  // --- Dynamic Field Handlers ---
  const addDynamicField = () =>
    setDynamicFields([...dynamicFields, { key: "", value: "" }]);

  const handleDynamicFieldChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const updated = [...dynamicFields];
    updated[index][field] = newValue;
    setDynamicFields(updated);
  };

  const removeDynamicField = (index: number) => {
    setDynamicFields(dynamicFields.filter((_, i) => i !== index));
  };

  // --- Vacancy Handlers ---
  const addVacancy = () =>
    setVacancies([
      ...vacancies,
      { postName: "", total: "", age: "", religions: [{ religionName: "", seats: "" }] },
    ]);

  const removeVacancy = (index: number) =>
    setVacancies(vacancies.filter((_, i) => i !== index));

 const handleVacancyChange = (
  index: number,
  field: Exclude<keyof Vacancy, "religions">,
  value: string
) => {
  setVacancies((prevVacancies) =>
    prevVacancies.map((vacancy, i) =>
      i === index ? { ...vacancy, [field]: value } : vacancy
    )
  );
};


  // --- Religion Handlers ---
  const addReligion = (vIndex: number) => {
    const updated = [...vacancies];
    updated[vIndex].religions.push({ religionName: "", seats: "" });
    setVacancies(updated);
  };

  const removeReligion = (vIndex: number, rIndex: number) => {
    const updated = [...vacancies];
    updated[vIndex].religions.splice(rIndex, 1);
    setVacancies(updated);
  };

  const handleReligionChange = (
    vIndex: number,
    rIndex: number,
    field: keyof Religion,
    value: string
  ) => {
    const updated = [...vacancies];
    updated[vIndex].religions[rIndex][field] = value;
    setVacancies(updated);
  };


  // --- VALIDATION LOGIC ---

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // 1. Basic Required Fields Check
    REQUIRED_TEXT_FIELDS.forEach(key => {
      const value = longForm[key];
      if (typeof value === 'string' && !value.trim()) {
        newErrors[key] = `The ${key.replace(/([A-Z])/g, " $1").toLowerCase()} is required.`;
        isValid = false;
      }
    });

    // 2. Numeric Fields Check
    NUMERIC_FIELDS.forEach(key => {
      const value = longForm[key];
      if (value && isNaN(Number(value))) {
        newErrors[key] = `Must be a valid number.`;
        isValid = false;
      }
    });

    // 3. Country/States Check
    if (!country.trim()) {
      newErrors.country = "Country is required.";
      isValid = false;
    }
    if (states.length === 0 || states.every(s => !s.trim())) {
      newErrors.states = "At least one State/Region is required.";
      isValid = false;
    }

    // 4. Vacancy Check: Ensure at least one post name is filled
    const validVacancies = vacancies.filter(v => v.postName.trim() && v.total.trim() && v.age.trim());
    if (validVacancies.length === 0) {
      toast.error("At least one complete Vacancy Post is required.");
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      toast.error("Please fix the validation errors before submitting.");
    }

    return isValid;
  };

  // --- SUBMIT HANDLER ---

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const formData = new FormData();

    // 1. Append longForm fields
    Object.entries(longForm).forEach(([k, v]) => {
      if (k === "image" && v instanceof File) {
        formData.append("uploadFile", v);
      } else if (typeof v === "boolean") {
        formData.append(k, v ? "true" : "false");
      } else if (v !== undefined && v !== null) {
        formData.append(k, String(v));
      }
    });

    // 2. Append states & country
    states.filter(s => s.trim()).forEach((s) => formData.append("states", s));
    formData.append("country", country);

    // 3. Append dynamic fields as JSON
    const dynamicObj: Record<string, string> = {};
    dynamicFields.forEach(({ key, value }) => {
      if (key.trim()) dynamicObj[key] = value;
    });
    formData.append("dynamicFields", JSON.stringify(dynamicObj));

    // 4. Append vacancies & religions (Flattened for server processing)
    vacancies.forEach((v) => {
      // NOTE: If the backend expects an array of objects, you might need to adjust this
      // to JSON.stringify the whole vacancies array. This current structure flattens it.
      formData.append("postName", v.postName);
      formData.append("total", v.total);
      formData.append("age", v.age);
      formData.append("religionName", JSON.stringify(v.religions.map((r) => r.religionName)));
      formData.append("seats", JSON.stringify(v.religions.map((r) => r.seats)));
    });

   try {
  console.log("📦 Sending FormData payload...");
  const response = await CreateJobpost(formData);
  toast.success("Job Created Successfully!");
  console.log("✅ Response:", response);
  // Implement form reset here if needed
} catch (error: unknown) {
  toast.error("Submission failed. Check console for details.");

  if (error instanceof Error) {
    console.error("❌ Submit error:", error.message);
  } else if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: unknown } }).response?.data !== "undefined"
  ) {
    console.error("❌ Submit error:", (error as { response?: { data?: unknown } }).response?.data);
  } else {
    console.error("❌ Unknown error:", error);
  }
}

  };
 
  // --- Sub Tab Content ---
  const renderSubTabContent = () => {
    // ... (Your sub-tab rendering logic remains here)
    switch (activeSubTab) {
      case "Syllabus": return <Syllabus />;
      case "PQP": return <PQP />;
      case "Answer Key": return <Answers />;
      case "Results": return <Result />;
      case "Cut-off": return <Cutoff />;
      default: return null;
    }
  };

  // --- Render Form UI (New Design) ---
  const renderLongForm = () => (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 rounded-2xl bg-white shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 border-b pb-4 mb-4">
        Job Notification Creation
      </h2>

      {/* --- Section 1: Core Job Details --- */}
      <div className="p-6 border border-indigo-200 rounded-xl bg-indigo-50/50 shadow-inner">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">1. General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.keys(longForm)
            .filter((key) =>
              !(longForm[key as keyof LongJobFormData] instanceof File) &&
              typeof longForm[key as keyof LongJobFormData] !== 'boolean' &&
              key !== 'description' && key !== 'additionalDetails'
            )
            .map((key) => {
              const name = key as keyof LongJobFormData;
              const isRequired = REQUIRED_TEXT_FIELDS.includes(name);
              const isDate = key.toLowerCase().includes("date");
              const isNumber = NUMERIC_FIELDS.includes(name);

              return (
                <div key={key}>
                  <label className="font-semibold text-sm mb-1 block text-gray-700">
                    {key.replace(/([A-Z])/g, " $1")} {isRequired && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={isDate ? "date" : (isNumber ? "number" : "text")}
                    name={name}
                    value={longForm[name] as string}
                    onChange={handleChange}
                    className={`border px-4 py-2.5 rounded-lg w-full transition duration-150 ease-in-out
                      ${errors[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} 
                    `}
                    min={isNumber ? 0 : undefined}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                  />
                  {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
                </div>
              );
            })}
        </div>

        {/* Description/Textarea fields */}
        <div className="mt-5 space-y-5">
          {['description', 'additionalDetails'].map((key) => {
            const name = key as keyof LongJobFormData;
            return (
              <div key={key}>
                <label className="font-semibold text-sm mb-1 block text-gray-700">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <textarea
                  name={name}
                  value={longForm[name] as string}
                  onChange={handleChange}
                  rows={3}
                  className="border border-gray-300 px-4 py-2.5 rounded-lg w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder={`Enter detailed ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Section 2: Locations & Checkboxes --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Locations Input */}
        <div className="p-6 border border-purple-200 rounded-xl bg-purple-50/50 shadow-inner">
          <h3 className="text-xl font-bold text-purple-800 mb-4">2. Locations</h3>
          <div>
            <label className="font-semibold text-sm mb-1 block text-gray-700">Country <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`border px-4 py-2.5 rounded-lg w-full mb-3 ${errors.country ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'}`}
              placeholder="e.g., India"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setErrors(prev => ({ ...prev, country: '' }));
              }}
            />
            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}

            <label className="font-semibold text-sm mb-1 block text-gray-700">States/Regions (comma separated) <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`border px-4 py-2.5 rounded-lg w-full ${errors.states ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'}`}
              placeholder="e.g., Delhi, Maharashtra, UP"
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
            {errors.states && <p className="text-xs text-red-500 mt-1">{errors.states}</p>}
          </div>
        </div>

        {/* Checkbox Fields */}
        <div className="p-6 border border-teal-200 rounded-xl bg-teal-50/50 shadow-inner flex flex-col justify-center">
          <h3 className="text-xl font-bold text-teal-800 mb-4">3. Application Requirements</h3>
          <div className="space-y-3">
            {["livePhotoRequired", "signatureRequired", "declarationRequired"].map((key) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer p-2 bg-white rounded-lg shadow-sm hover:bg-teal-100/50 transition">
                <input
                  type="checkbox"
                  name={key}
                  checked={longForm[key as keyof LongJobFormData] as boolean}
                  onChange={handleChange}
                  className="w-5 h-5 text-teal-600 border-gray-300 rounded-sm focus:ring-teal-500"
                />
                <span className="text-gray-700 font-medium">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section 3: Vacancies (Complex Nested Section) --- */}
      <div className="p-6 border border-green-300 rounded-xl bg-green-50/50 shadow-inner">
        <h3 className="text-xl font-bold text-green-800 mb-4">4. Vacancy Posts & Seat Allocation</h3>
        {vacancies.map((v, vi) => (
          <div key={vi} className="border border-green-100 p-5 rounded-lg mb-4 bg-white shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-lg text-green-700">Post #{vi + 1}</h4>
              <button
                type="button"
                onClick={() => removeVacancy(vi)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            <input
              placeholder="Post Name (e.g., Junior Assistant)"
              value={v.postName}
              onChange={(e) => handleVacancyChange(vi, "postName", e.target.value)}
              className="border px-4 py-2 rounded-lg w-full mb-3 focus:border-green-500"
              required
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Total Vacancies"
                value={v.total}
                onChange={(e) => handleVacancyChange(vi, "total", e.target.value)}
                className="border px-4 py-2 rounded-lg w-full focus:border-green-500"
                min={0}
                required
              />
              <input
                type="number"
                placeholder="Max Age Limit"
                value={v.age}
                onChange={(e) => handleVacancyChange(vi, "age", e.target.value)}
                className="border px-4 py-2 rounded-lg w-full focus:border-green-500"
                min={0}
                required
              />
            </div>

            <p className="font-medium text-sm text-gray-600 mb-2">Category Seat Allocation:</p>
            <div className="space-y-2">
              {v.religions.map((r, ri) => (
                <div key={ri} className="flex gap-2">
                  <input
                    placeholder="Category/Religion (e.g., General, OBC)"
                    value={r.religionName}
                    onChange={(e) => handleReligionChange(vi, ri, "religionName", e.target.value)}
                    className="border px-4 py-2 rounded-lg flex-1 focus:border-green-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Seats"
                    value={r.seats}
                    onChange={(e) => handleReligionChange(vi, ri, "seats", e.target.value)}
                    className="border px-4 py-2 w-24 rounded-lg focus:border-green-500"
                    min={0}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeReligion(vi, ri)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addReligion(vi)}
              className="mt-3 text-sm flex items-center gap-1 text-green-700 hover:text-green-900 transition"
            >
              <Plus size={16} /> Add Category
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addVacancy}
          className="mt-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add New Post
        </button>
      </div>

      {/* --- Section 4: Dynamic Fields and File Upload --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Dynamic Fields */}

        <div className="p-6 border border-yellow-300 rounded-xl bg-yellow-50/50 shadow-inner">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">5. Custom Metadata</h3>

          {dynamicFields.map(({ key, value }, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3"
            >
              <input
                placeholder="Key"
                value={key}
                onChange={(e) => handleDynamicFieldChange(i, "key", e.target.value)}
                className="border px-4 py-2 rounded-lg flex-1 focus:border-yellow-500 w-full"
              />
              <input
                placeholder="Value"
                value={value}
                onChange={(e) => handleDynamicFieldChange(i, "value", e.target.value)}
                className="border px-4 py-2 rounded-lg flex-1 focus:border-yellow-500 w-full"
              />
              <button
                type="button"
                onClick={() => removeDynamicField(i)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addDynamicField}
            className="mt-2 text-sm flex items-center gap-1 text-yellow-700 hover:text-yellow-900 transition"
          >
            <Plus size={16} /> Add Custom Field
          </button>
        </div>


        {/* File Upload */}
        <div className="p-6 border border-blue-300 rounded-xl bg-blue-50/50 shadow-inner">
          <h3 className="font-bold text-xl mb-4 text-blue-800">6. Upload Notification File</h3>
          <label className="block bg-white p-4 rounded-lg shadow-sm border border-dashed border-blue-400 hover:border-blue-600 transition cursor-pointer">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleImageChange}
              className="hidden"
            />
            {longForm.image ? (
              <p className="text-blue-700 font-medium flex items-center gap-2">
                <FileText size={20} /> File Selected: {longForm.image.name}
              </p>
            ) : (
              <p className="text-gray-500 text-center">Click to select PDF or Image file...</p>
            )}
          </label>
          {previewUrl && (
            <p className="text-green-600 text-sm mt-2">File Ready for Upload.</p>
          )}
        </div>
      </div>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-8 py-3 rounded-lg w-full font-bold text-lg hover:from-indigo-700 hover:to-blue-800 transition-all shadow-xl mt-6"
      >
        Submit Job Notification
      </button>
    </form>
  );

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-7xl bg-white shadow-2xl sm:p-10 p-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 pt-4">
          Job Notification Panel
        </h1>
        <nav className="flex flex-wrap justify-center gap-3 bg-white p-4 rounded-xl shadow-lg mb-8">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveSubTab((prev) => (prev === name ? null : name))}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${activeSubTab === name
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white hover:bg-indigo-100 text-gray-700 border border-gray-300"
                }`}
            >
              <Icon size={18} /> {name}
            </button>
          ))}
        </nav>

        {!activeSubTab ? (
          <div className="max-w-4xl mx-auto">
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