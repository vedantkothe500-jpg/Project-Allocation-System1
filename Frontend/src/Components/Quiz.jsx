import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../Security/AxiosIntant";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
    

  useEffect(() => {
    axiosInstance
      .get(`/user/get/${id}`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("❌ Failed to load quiz. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  
  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleSubmit(); // Auto-submit when time is up
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleOptionSelect = (qId, selectedOption) => {
    setAnswers({ ...answers, [qId]: selectedOption });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({
      id: parseInt(questionId),
      response: selectedOption,
    }));

    axiosInstance
      .post(`/user/submit/${id}`, payload)
      .then((res) => {
        navigate("/result", { state: { result: res.data } });
      })
      .catch((err) => {
        console.error("Error submitting quiz:", err);
        alert("⚠️ Failed to submit quiz. Please try again.");
        setSubmitted(false); // Allow retry
      });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-700">📝 Quiz</h1>
          <span className="text-red-600 font-bold text-lg">
            ⏰ {formatTime(timeLeft)}
          </span>
        </div>

        {/* Loading & Error */}
        {loading && <p className="text-center text-gray-600">Loading questions...</p>}
        {error && (
          <div className="text-red-600 text-center mb-4 font-semibold">
            {error}
          </div>
        )}

        {/* Questions */}
        {!loading && !error && questions.map((q, idx) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-1xl font-semibold mb-3">              {idx + 1}. {q.questionTitle}
            </h2>

            <div className="grid gap-2">
              {["option1", "option2", "option3", "option4"].map((optKey, i) => {
                const optionLabel = String.fromCharCode(65 + i);
                const isSelected = answers[q.id] === q[optKey];
                return (
                  <label
                    key={optKey}
                    className={`flex items-center text-1xl p-3 rounded border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-100 border-blue-500"
                        : "bg-white border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={q[optKey]}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(q.id, q[optKey])}
                      className="mr-3"
                    />
                    <span className="font-medium">
                      {optionLabel}. {q[optKey]}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        {!loading && !error && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={`mt-4 px-8 py-3 rounded text-white font-semibold transition duration-300 cursor-pointer ${
                submitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitted ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
