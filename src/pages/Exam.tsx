import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { Plus, Trash2, Zap } from "lucide-react";

// ✅ Fix workerSrc
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  setName: string;
}

interface Submission {
  id: string;
  questionId: string;
  userAnswer: string;
  isGraded: boolean;
  aiFeedback: string;
  isCorrect?: boolean;
  setName: string;
}

interface QuestionSet {
  setName: string;
  file: File | null;
  questions: string[];
}

const getRandomId = () => crypto.randomUUID();

const AdminExam: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem("exam_questions");
    return saved ? JSON.parse(saved) : [];
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem("exam_submissions");
    return saved ? JSON.parse(saved) : [];
  });

  const [sets, setSets] = useState<QuestionSet[]>([
    { setName: "A", file: null, questions: [] },
    { setName: "B", file: null, questions: [] },
    { setName: "C", file: null, questions: [] },
    { setName: "D", file: null, questions: [] },
  ]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    localStorage.setItem("exam_questions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("exam_submissions", JSON.stringify(submissions));
  }, [submissions]);

  // PDF Upload Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const updatedSets = sets.map((s) => (s.setName === setName ? { ...s, file } : s));
    setSets(updatedSets);

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const text = (textContent.items as { str: string }[])
        .map((item) => item.str)
        .join(" ");
      fullText += "\n" + text;
    }

    const questionRegex =
      /Q\d+\.\s*(.*?)A\)\s*(.*?)B\)\s*(.*?)C\)\s*(.*?)D\)\s*(.*?)Answer:\s*([A-D])/g;

    const newQuestions: Question[] = [];
    let match;
    while ((match = questionRegex.exec(fullText)) !== null) {
      const questionText = match[1].trim();
      const options = [match[2].trim(), match[3].trim(), match[4].trim(), match[5].trim()];
      const correctIndex = match[6].charCodeAt(0) - 65;

      newQuestions.push({
        id: getRandomId(),
        questionText,
        options,
        correctAnswer: options[correctIndex],
        setName,
      });
    }

    if (newQuestions.length > 0) {
      setQuestions((prev) => [...prev, ...newQuestions]);
      showToast(`✅ Added ${newQuestions.length} questions from Set ${setName}`, "success");
    } else {
      showToast("⚠️ No questions found in PDF. Check formatting.", "error");
    }
  };

  const handleAddQuestion = (q: Omit<Question, "id">) => {
    const newQ = { ...q, id: getRandomId() };
    setQuestions([...questions, newQ]);
    showToast("Question added successfully!", "success");
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    showToast("Question deleted.", "success");
  };

  const handleGradeAll = () => {
    let graded = 0;
    const updated = submissions.map((sub) => {
      if (!sub.isGraded) {
        const q = questions.find((q) => q.id === sub.questionId && q.setName === sub.setName);
        if (!q) return sub;
        graded++;
        const isCorrect = sub.userAnswer === q.correctAnswer;
        return {
          ...sub,
          isGraded: true,
          isCorrect,
          aiFeedback: isCorrect ? "✅ Correct!" : `❌ Incorrect. Correct: ${q.correctAnswer}`,
        };
      }
      return sub;
    });
    setSubmissions(updated);
    showToast(`Graded ${graded} submissions.`, "success");
  };

  // Question Form Component
  const QuestionForm = () => {
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [setName, setSetName] = useState<"A" | "B" | "C" | "D">("A");

    const addQuestion = () => {
      if (!questionText.trim() || options.some((o) => !o.trim()) || !correctAnswer) {
        showToast("Fill all fields!", "error");
        return;
      }
      handleAddQuestion({ questionText, options, correctAnswer, setName });
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    };

    return (
      <div className="bg-white shadow p-4 rounded-lg border border-indigo-200 mb-8">
        <h3 className="font-bold text-indigo-700 mb-3 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Question
        </h3>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Question text"
          className="w-full border p-2 rounded mb-3"
        />
        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            placeholder={`Option ${i + 1}`}
            className="w-full border p-2 rounded mb-2"
          />
        ))}
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select Correct Answer</option>
          {options.map((opt, i) => opt && <option key={i} value={opt}>{opt}</option>)}
        </select>
        <div className="flex gap-2 mb-3">
          {["A", "B", "C", "D"].map((set) => (
            <button
              key={set}
              onClick={() => setSetName(set as "A" | "B" | "C" | "D")}
              className={`px-3 py-1 rounded ${
                setName === set ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              Set {set}
            </button>
          ))}
        </div>
        <button
          onClick={addQuestion}
          className="w-full py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700"
        >
          Save Question
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Admin Exam Panel</h1>

      {/* PDF Upload */}
      <div className="bg-white p-4 rounded-lg shadow-md border mb-6">
        <h2 className="font-bold mb-3">Upload Question PDFs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sets.map((set) => (
            <div key={set.setName}>
              <h3 className="font-semibold mb-2">Set {set.setName}</h3>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, set.setName)}
                className="border p-2 w-full rounded-md"
              />
              {set.file && <p className="text-sm text-gray-500 mt-1">Uploaded: {set.file.name}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Question Form */}
      <QuestionForm />

      {/* Manage Questions */}
      <div className="bg-white shadow p-4 rounded-lg border border-red-200 mb-6">
        <h3 className="font-bold text-red-700 mb-3 flex items-center">
          <Trash2 className="w-4 h-4 mr-2" /> Manage Questions ({questions.length})
        </h3>
        {questions.map((q) => (
          <div key={q.id} className="flex justify-between items-center border-b py-2">
            <span>[{q.setName}] {q.questionText}</span>
            <button
              onClick={() => handleDeleteQuestion(q.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Submissions */}
      <div className="bg-indigo-50 p-4 rounded-lg flex justify-between items-center">
        <h4 className="font-bold text-indigo-700">Total Submissions: {submissions.length}</h4>
        <button
          onClick={handleGradeAll}
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <Zap className="w-4 h-4 mr-2" /> Grade All
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold transition-transform duration-300 ${
            toast.type === "success" ? "bg-green-500" :
            toast.type === "error" ? "bg-red-500" :
            "bg-blue-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminExam;
